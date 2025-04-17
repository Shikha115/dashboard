import React, { useState } from "react";

const SmallVideoFrame = ({ videoId, width = "200", height = "120" }) => {
  const [showVideo, setShowVideo] = useState(false);
  const videoUrl = `https://www.youtube.com/embed/${videoId}`;
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`; // Default YouTube thumbnail

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        overflow: "hidden",
        width: `${width}px`,
        // cursor: "pointer",
      }}
      onClick={() => setShowVideo(true)} // Show video on click
    >
      {showVideo ? (
        <iframe
          width={width}
          height={height}
          src={videoUrl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ display: "block", borderRadius: "8px" }}
        ></iframe>
      ) : (
        <img
          src={thumbnailUrl}
          alt="Video Thumbnail"
          width={width}
          height={height}
          style={{ display: "block", borderRadius: "8px" }}
        />
      )}
    </div>
  );
};

export default SmallVideoFrame;
