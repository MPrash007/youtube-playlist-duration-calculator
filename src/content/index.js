// src/content/index.js

/**
 * Parses time strings like "1:20:05", "5:10" into total seconds.
 */
function parseTimeToSeconds(timeStr) {
  const parts = timeStr.split(':').map(Number);
  if (parts.length === 3) {
    // HH:MM:SS
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  } else if (parts.length === 2) {
    // MM:SS
    return parts[0] * 60 + parts[1];
  } else if (parts.length === 1) {
    // SS
    return parts[0];
  }
  return 0;
}

/**
 * Scrapes the page for video duration labels, sums them up, and returns data.
 */
function calculatePlaylistDuration() {
  // Select all duration badges in the standard playlist DOM or Watch later playlist
  // This querySelector captures the standard small duration text in thumbnails
  const durationElements = document.querySelectorAll("ytd-thumbnail-overlay-time-status-renderer span#text");
  
  if (!durationElements || durationElements.length === 0) {
    return { error: 'No videos found. Ensure you are on a playlist page.' };
  }

  let totalSeconds = 0;
  let videoCount = 0;

  durationElements.forEach((el) => {
    let timeText = el.innerText.trim();
    // Sometimes there are invisible characters or newline
    timeText = timeText.replace(/[^0-9:]/g, ''); 
    if (timeText) {
      totalSeconds += parseTimeToSeconds(timeText);
      videoCount++;
    }
  });

  return { totalSeconds, videoCount };
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'SCAN_PLAYLIST') {
    const data = calculatePlaylistDuration();
    sendResponse(data);
  }
  return true; // Keep the message channel open for async response if needed
});
