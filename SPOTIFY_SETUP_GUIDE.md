# Spotify Developer Setup Guide

Complete guide to set up the Spotify integration for this portfolio.

---

## 1. Create a Spotify Developer Account

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Log in with your **regular Spotify account** (free or premium both work)
3. Accept the Developer Terms of Service

## 2. Create a Spotify App

1. Click **"Create App"** in the dashboard
2. Fill in:
   - **App name**: `My Portfolio` (or anything you like)
   - **App description**: `Portfolio Spotify Widget`
   - **Redirect URI**: `http://127.0.0.1:3000/callback`
   - **Which APIs do you plan to use?**: Select **Web API**
3. Click **"Save"**
4. On the app page, click **"Settings"**
5. Note down your:
   - **Client ID** → this is `SPOTIFY_CLIENT_ID`
   - **Client Secret** (click "View client secret") → this is `SPOTIFY_CLIENT_SECRET`

## 3. Get a Refresh Token (Authorization Code Flow)

This is a one-time process. The refresh token doesn't expire (unless you revoke access).

### Step 3a: Get an Authorization Code

Open this URL in your browser (replace `YOUR_CLIENT_ID`):

```
https://accounts.spotify.com/authorize?client_id=YOUR_CLIENT_ID&response_type=code&redirect_uri=http://127.0.0.1:3000/callback&scope=user-read-currently-playing%20user-read-recently-played
```

> **Important:** The scopes `user-read-currently-playing` and `user-read-recently-played` are **required**.

1. Click **"Agree"** to authorize
2. You'll be redirected to something like:
   ```
   http://127.0.0.1:3000/callback?code=AQD...very-long-string...
   ```
3. Copy the **code** parameter from the URL (everything after `?code=`)

### Step 3b: Exchange Code for Tokens

Run this `curl` command in your terminal (replace the placeholders):

**PowerShell (Windows):**
```powershell
$body = @{
    grant_type = "authorization_code"
    code = "YOUR_AUTHORIZATION_CODE"
    redirect_uri = "http://127.0.0.1:3000/callback"
}
$headers = @{
    Authorization = "Basic " + [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes("YOUR_CLIENT_ID:YOUR_CLIENT_SECRET"))
    "Content-Type" = "application/x-www-form-urlencoded"
}
Invoke-RestMethod -Uri "https://accounts.spotify.com/api/token" -Method Post -Body $body -Headers $headers | ConvertTo-Json
```

**macOS/Linux (curl):**
```bash
curl -d grant_type=authorization_code \
  -d code=YOUR_AUTHORIZATION_CODE \
  -d redirect_uri=http://127.0.0.1:3000/callback \
  -H "Authorization: Basic $(echo -n 'YOUR_CLIENT_ID:YOUR_CLIENT_SECRET' | base64)" \
  https://accounts.spotify.com/api/token
```

The response will include:
```json
{
  "access_token": "...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "refresh_token": "AQC...your-refresh-token...",
  "scope": "user-read-currently-playing user-read-recently-played"
}
```

4. Copy the **`refresh_token`** value → this is `SPOTIFY_REFRESH_TOKEN`

> ⚠️ **Save this refresh token securely!** You'll only see it once. If you lose it, repeat Step 3.

## 4. Set Up Environment Variables

Create a file called `.env.local` in the project root:

```env
SPOTIFY_CLIENT_ID=your_client_id_here
SPOTIFY_CLIENT_SECRET=your_client_secret_here
SPOTIFY_REFRESH_TOKEN=your_refresh_token_here
```

> This file is git-ignored (matched by `*.local` in `.gitignore`). **Never commit secrets.**

## 5. Run Locally

1. Install the Vercel CLI if you don't have it:
   ```bash
   npm install -g vercel
   ```

2. Run the dev server:
   ```bash
   vercel dev
   ```
   This serves both the Vite frontend AND the serverless API routes.

3. Test the API:
   - Open `http://localhost:3000/api/spotify`
   - You should see JSON with `song`, `artist`, `albumImage`, `isPlaying`, and `songUrl`

4. Test the frontend:
   - Open `http://localhost:3000`
   - Scroll to the **About Me** section at the bottom
   - You should see the Spotify widget with your current/recent track

## Troubleshooting

| Issue | Solution |
|-------|----------|
| API returns `{ "isPlaying": false }` with no song | Make sure you've played something on Spotify recently |
| Token refresh fails (500 error) | Double-check Client ID, Secret, and Refresh Token in `.env.local` |
| `vercel dev` doesn't work | Run `vercel` first to link the project, then `vercel dev` |
| CORS errors in browser | API should be same-origin via `vercel dev`; don't use `vite dev` for API testing |
