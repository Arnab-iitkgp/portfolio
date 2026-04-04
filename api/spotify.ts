import type { VercelRequest, VercelResponse } from '@vercel/node';
import { config } from 'dotenv';
import { resolve } from 'path';


if (process.env.NODE_ENV !== 'production') {
  config({ path: resolve(process.cwd(), '.env.local') });
}

const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';
const CURRENTLY_PLAYING_URL = 'https://api.spotify.com/v1/me/player/currently-playing';
const RECENTLY_PLAYED_URL = 'https://api.spotify.com/v1/me/player/recently-played?limit=1';

const getAccessToken = async () => {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const response = await fetch(SPOTIFY_TOKEN_URL, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken!,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error('Token refresh error body:', errorBody);
    console.error('Using client_id:', clientId?.substring(0, 8) + '...');
    console.error('Refresh token starts with:', refreshToken?.substring(0, 10) + '...');
    throw new Error(`Token refresh failed: ${response.status} - ${errorBody}`);
  }

  return response.json();
};

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  try {
    const { access_token } = await getAccessToken();

    //  currently playing first
    const currentlyPlayingRes = await fetch(CURRENTLY_PLAYING_URL, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    // 200 = something is playing, 204 = nothing playing
    if (currentlyPlayingRes.status === 200) {
      const data = await currentlyPlayingRes.json();

      if (data?.item) {
        res.setHeader('Cache-Control', 'public, s-maxage=15, stale-while-revalidate=30');
        return res.status(200).json({
          song: data.item.name,
          artist: data.item.artists.map((a: any) => a.name).join(', '),
          albumImage: data.item.album.images[0]?.url ?? '',
          isPlaying: data.is_playing,
          songUrl: data.item.external_urls.spotify,
        });
      }
    }

    // Fallback: recently played
    const recentRes = await fetch(RECENTLY_PLAYED_URL, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    if (!recentRes.ok) {
      res.setHeader('Cache-Control', 'no-store, max-age=0');
      return res.status(200).json({ isPlaying: false });
    }

    const recentData = await recentRes.json();
    const track = recentData.items?.[0]?.track;

    if (!track) {
      res.setHeader('Cache-Control', 'no-store, max-age=0');
      return res.status(200).json({ isPlaying: false });
    }

    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=120');
    return res.status(200).json({
      song: track.name,
      artist: track.artists.map((a: any) => a.name).join(', '),
      albumImage: track.album.images[0]?.url ?? '',
      isPlaying: false,
      songUrl: track.external_urls.spotify,
    });
  } catch (error) {
    console.error('Spotify API error:', error);
    res.setHeader('Cache-Control', 'no-store, max-age=0');
    return res.status(200).json({ isPlaying: false });
  }
}
