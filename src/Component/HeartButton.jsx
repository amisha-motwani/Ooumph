import React, { useState } from "react";
import { motion } from "framer-motion";
import "./HeartButton.scss";

const HeartButton = ({ likes }) => {
  const [likedPosts, setLikedPosts] = useState(false);

  return (
    <div className="heart-container" onClick={() => setLikedPosts(!likedPosts)}>
      {/* Expanding Background Burst on Like */}
      {likedPosts && (
        <motion.div
          className="burst"
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: [0, 1.5, 1], opacity: [0.5, 0.2, 0] }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      )}

      {/* Heart Animation */}
      <motion.div
        className="heart"
        initial={{ scale: 1 }}
        animate={{
          scale: likedPosts ? [1, 1.6, 1.2, 1] : [1, 0.9, 1], // Pop effect when liked, wobble on unlike
          rotate: likedPosts ? [0, -10, 10, -5, 5, 0] : [0, -5, 5, 0], // Shake effect
          color: likedPosts ? "#ff4d6d" : "#888", // Change color
          textShadow: likedPosts
            ? "0px 0px 15px rgba(255, 77, 109, 0.8)"
            : "none", // Glow effect
        }}
        transition={{ duration: 0.4 }}
      >
        {likedPosts ? "❤️" : "🩶"}
      </motion.div>
      <h1 className="sm:text-[16px] text-[14px] sm:mt-0 mt-0.5 text-gray-800">
        {likedPosts ? `${likes + 1} likes` : `${likes} likes`}
      </h1>

      {/* Floating Sparkles Effect */}
      {likedPosts && (
        <>
          <motion.div
            className="sparkle sparkle-1"
            initial={{ opacity: 0, y: 0, scale: 0.8 }}
            animate={{ opacity: 1, y: -40, scale: [1, 1.5, 1] }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          <motion.div
            className="sparkle sparkle-2"
            initial={{ opacity: 0, y: 0, scale: 0.8 }}
            animate={{ opacity: 1, y: -50, scale: [1, 1.5, 1] }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          />
          <motion.div
            className="sparkle sparkle-3"
            initial={{ opacity: 0, y: 0, scale: 0.8 }}
            animate={{ opacity: 1, y: -45, scale: [1, 1.5, 1] }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          />
        </>
      )}
    </div>
  );
};

export default HeartButton;
