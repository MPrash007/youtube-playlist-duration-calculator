# YouTube Playlist Duration Calculator Extension

A sleek and minimalistic Chrome Extension built with **React**, **Tailwind CSS v4**, and **Manifest V3** that calculates the exact total duration of any YouTube playlist.

## 🚀 Features

- **DOM Scraper:** Automatically scans a YouTube playlist page and parses all video duration timestamps.
- **Vast Mathematical Support:** Easily interprets different duration formats ("5:35", "1:20:05") and computes the correct total sum.
- **Dynamic Playback Speed Adjustment:** Calculate how long it will take to watch the playlist on different speeds out-of-the-box (1x, 1.25x, 1.5x, 1.75x, and 2x).
- **Infinite Lazy Loading Handling:** Supports YouTube's infinite scrolling seamlessly! Added a "Scan Playlist Again" button within the UI to forcefully re-fetch the DOM if the user scrolls to load 100+ more videos.
- **Clean Aesthetic UI:** A beautifully designed dark-mode user interface powered by Tailwind CSS and Lucide React.
- **Performance Optimized:** Uses Vite to bundle assets intelligently without unnecessary inline scripts to align perfectly with Manifest V3 restrictions.

## 🛠️ Tech Stack

- **Framework:** React + Vite
- **Styling:** Tailwind CSS v4
- **Manifest:** Chrome Extension V3
- **Icons:** `lucide-react`

## 📦 Installation & Usage (Developer Mode)

To use this extension directly on your browser without fetching it from the Chrome Web Store:

1. Clone or download this project to your local machine.
2. Ensure you have Node.js installed, then navigate into the project directory.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Build the extension bundle:
   ```bash
   npm run build
   ```
5. Open your Chrome browser and type `chrome://extensions/` into the URL bar.
6. Enable **Developer Mode** by toggling the switch in the top right corner.
7. Click the **Load unpacked** button and select the `dist` folder generated inside this directory.
8. Navigate to any YouTube playlist (e.g. your Watch Later playlist) and click the extension icon to see your analytics!

## 💻 Local Development

If you'd like to tweak the UI, you can develop directly in your browser:

```bash
npm run dev
```

Remember: if you tweak the extension logic, you need to run `npm run build` again and hit the "Refresh" icon on the extension card inside `chrome://extensions/` to update it.
