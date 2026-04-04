# Minimalist Developer Portfolio

A clean, modern, and highly responsive personal portfolio website designed for developers. Built with a focus on typography, subtle micro-interactions, and high performance.

## Features

- **Component-Driven UI**: Built with React and structured for extensibility.
- **Styling**: Tailwind CSS for rapid UI development and fully customizable dark mode.
- **Animations**: Framer Motion powers smooth page transitions and clean micro-interactions.
- **Serverless Backend**: Utilizes Vercel Serverless Functions (`/api`).
  - **Spotify Integration** (`/api/spotify`): Displays your "Now Playing" or "Recently Played" tracks using the Spotify Web API.
  - **Contact System** (`/api/contact`): A secure, custom contact modal powered by [Resend](https://resend.com/) for email delivery without revealing credentials on the client.

##  Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS, Framer Motion
- **Routing**: React Router DOM
- **Backend Environment**: Vercel Node.js Serverless Functions
- **Deployment**: Vercel

## Setup & Installation

### 1. Clone & Install
```bash
git clone https://github.com/Arnab-iitkgp/minimalist-portfolio.git
cd minimalist-portfolio
npm install
```

### 2. Environment Variables
Create a `.env.local` file in the root of the project to enable the serverless functions securely:

```ini
# --- Spotify Widget ---
SPOTIFY_CLIENT_ID=your_client_id
SPOTIFY_CLIENT_SECRET=your_client_secret
SPOTIFY_REFRESH_TOKEN=your_refresh_token

# --- Resend Contact Form ---
RESEND_API_KEY=re_your_resend_api_key
CONTACT_EMAIL=your_email@example.com
```

> **Note:** Learn how to configure your Spotify tokens in `SPOTIFY_SETUP_GUIDE.md`. For Resend, simply register on [Resend.com](https://resend.com) to grab an API key.

### 3. Local Development
For the best experience, run the development environment using the Vercel CLI so that the `/api` serverless endpoints are correctly emulated alongside the Vite frontend:

```bash
npm i -g vercel
vercel dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

##  Deployment

This project is configured out-of-the-box for minimal-hassle deployments on [Vercel](https://vercel.com).
1. Push your repository to GitHub.
2. Import the project in your Vercel Dashboard.
3. Under **Settings > Environment Variables**, add your Spotify and Resend keys. 
4. Deploy!
