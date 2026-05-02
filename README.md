# GentyPlayer (was Spotify-Player)

**GentyPlayer** is a minimalist, typography-focused Spotify controller built with **Next.js**[cite: 2]. It provides a clean, aesthetic interface for managing your music playback, integrated directly with your Spotify account[cite: 2].

**Live Demo:** [GentyPlayer.vercel.app](https://GentyPlayer.vercel.app)

## ✨ Aesthetic Features
*   **Custom Typography**: Features the unique visual identity of the *Genty* and *GentySans* font families[cite: 2].
*   **Dashboard Elements**: Includes integrated localized clock and date components for a workspace-ready feel[cite: 2].
*   **Aesthetic UI**: Optimized for a sleek, modern web experience using Tailwind CSS[cite: 2].

## 🚀 Core Features
*   **Playback Control**: Play, pause, skip forward, and skip backward through your Spotify queue[cite: 2].
*   **Real-time Info**: Displays current track information and playback status[cite: 2].
*   **Spotify Integration**: Secure OAuth flow for Spotify account connection via dedicated API routes[cite: 2].

## 🛠️ Requirements
*   **Spotify Premium**: Required by the Spotify Web API for playback control[cite: 2].
*   **Spotify Developer Account**: Required to obtain your own `Client ID` and `Client Secret`[cite: 2].

## 📦 Setup & Installation

1.  **Clone the repository**:
    ```bash
    git clone [https://github.com/yusufriduan/GentyPlayer.git](https://github.com/yusufriduan/GentyPlayer.git) && cd GentyPlayer-nextjs-migration
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**:
    Create a `.env.local` file in the root directory and add your Spotify credentials:
    ```env
    SPOTIFY_CLIENT_ID=your_client_id
    SPOTIFY_CLIENT_SECRET=your_client_secret
    SPOTIFY_REDIRECT_URI=http://localhost:3000/api/spotify/callback
    ```

4.  **Run the development server**:
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) to view the application[cite: 2].

## 🌐 Deployment
This project is optimized for deployment on **Vercel**[cite: 2]. Remember to add your production redirect URIs to the Spotify Developer Dashboard to enable authentication in the live environment.
