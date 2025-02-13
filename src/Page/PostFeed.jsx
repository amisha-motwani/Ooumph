import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faComment,
  faPaperPlane,
  faBookmark,
  faEllipsis,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import Features from "./Features.jsx";
import API from "../API.js";
import Story from "../Component/Story.js";
import CommentModal from "../Component/CommentModal.jsx";
import HeartButton from "../Component/HeartButton.jsx";

function PostFeed() {
  const [isCartSideBarVisible, setIsCartSideBarVisible] = useState(false);
  const [likedPosts, setLikedPosts] = useState({});
  const [savedPosts, setSavedPosts] = useState({});
  const [selectedPost, setSelectedPost] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(3); // Show 3 posts initially
  const [clickedIndexes, setClickedIndexes] = useState([]);

  const openModal = (post) => {
    setSelectedPost(post); // Store selected post details
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedPost(null);
  };

  // Toggle like for a specific post
  const handleLike = (postId) => {
    setLikedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  // Toggle save for a specific post
  const handleSave = (postId) => {
    setSavedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const handleLoadMore = (index) => {
    setVisibleCount((prev) => prev + 3);
    setClickedIndexes([...clickedIndexes, index]);
  };

  useEffect(() => {
    if (API?.length > 0) {
      setLoading(false);
    }
  }, [API]);

  console.log("API data", API);
  console.log("Story data", Story);

  return (
    <>
      {modalIsOpen && (
        <CommentModal closeModal={closeModal} postDetails={selectedPost} />
      )}

      <div className="h-fit relative">
        {isCartSideBarVisible ? (
          <>
            <div className="w-[50%] absolute z-10 h-[100vh] w-blue-400 ">
              <Features
                isCartSideBarVisible={isCartSideBarVisible}
                setIsCartSideBarVisible={setIsCartSideBarVisible}
              />
            </div>
          </>
        ) : (
          ""
        )}
        <div className="w-full flex gap-4 h-fit bg-white mb-2 overflow-x-auto whitespace-nowrap scrollbar-hide cursor-pointer">
          <div className="flex justify-center items-center sm:hidden">
            <FontAwesomeIcon
              icon={faBars}
              className="text-[20px]"
              onClick={() => setIsCartSideBarVisible(!isCartSideBarVisible)}
            />
          </div>

          {Story.map((story) => (
            <Circle key={story.id} imgSrc={story.imgSrc} role={story.role} name={story.name} />
          ))}
        </div>
        {/* Show Loader While Data is Fetching */}
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        ) : (
          API.slice(0, visibleCount).map((post, index) => (
            <>
              <div
                key={post.id}
                className="w-[95%] place-self-center mt-5 p-4  shadow-md"
              >
                {/* User Info */}
                <div className="flex w-full justify-between ">
                  <div className="flex items-center gap-2 ">
                    <div className="w-12 h-12 rounded-full border border-gray-300 overflow-hidden">
                      <img
                        src={post.profile_picture}
                        alt={post.username}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h1 className="cursor-pointer font-semibold">
                      {post.username}
                    </h1>
                  </div>
                  <div className="flex justify-end items-start sm:p-2 pt-3">
                    <FontAwesomeIcon
                      icon={faEllipsis}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
                {/* Post Image */}
                <div className="sm:h-[400px] h-[260px] w-full border border-gray-200 mt-2">
                  <img
                    src={post.post_image}
                    alt="post"
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Caption */}
                <div className="flex items-center mt-2">
                  <h1 className="text-black font-bold">{post.username}</h1>
                  <span className="text-gray-600 mx-1">-</span>
                  <h1 className="text-black">{post.caption}</h1>
                </div>

                {/* Likes & Comments */}
                <div className="flex w-full justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex justify-center items-center gap-1 ">
                      <HeartButton likes={post.likes} />

                      
                   
                    </div>
                    <div className="flex justify-center items-center gap-1 ">
                      <FontAwesomeIcon
                        icon={faComment}
                        onClick={() => openModal(post)}
                        className="cursor-pointer  sm:text-xl text-md transition-colors duration-300 text-[#9b9b9b] active:text-blue-500 rounded-full"
                      />
                      <h1
                        className="sm:text-[16px] text-[14px] sm:mt-0 mt-0.5 text-gray-800"
                        onClick={() => openModal(post)}
                      >
                        {post.comments} Comments
                      </h1>
                    </div>

                    <FontAwesomeIcon
                      icon={faPaperPlane}
                      className="cursor-pointersm:text-xl text-md transition-colors duration-300 text-[#9b9b9b] active:text-blue-500 p-2 rounded-full"
                    />
                  </div>
                  <FontAwesomeIcon
                    icon={faBookmark}
                    className={`cursor-pointer sm:text-xl text-md p-2 rounded-full 
                  ${savedPosts[post.id] ? "text-blue-500" : "text-[#9b9b9b]"}`}
                    onClick={() => handleSave(post.id)}
                  />
                </div>
                <h1
                  className="sm:text-[16px] text-[14px] text-gray-800"
                  onClick={() => openModal(post)}
                >
                  Add a Comment
                </h1>
              </div>
              {/* Load More Button After Every 3 Posts */}
              {(index + 1) % 3 === 0 &&
                index + 1 !== API.length &&
                visibleCount < API.length &&
                !clickedIndexes.includes(index) && (
                  <div className="flex justify-center mt-4">
                    <button
                      onClick={() => handleLoadMore(index)}
                      className="px-4 py-2  text-black text-xl place-self-center rounded"
                    >
                      Load More...
                    </button>
                  </div>
                )}
            </>
          ))
        )}
      </div>
    </>
  );
}

// Story Component
function Circle({ imgSrc, role, name }) {
  return (
    <>
      <div>
        <div
          className="relative lg:w-16 lg:h-16 md:w-14 md:h-14 w-12 h-12 rounded-full flex items-center justify-center bg-amber-600 p-[3px]"
          style={{
            background:
              "conic-gradient(from 0deg, pink, #ff69b4, #dd3cd2, #ffa857, #ffd841, #ffd700, pink)",
          }}
        >
          {/* Inner White Circle */}
          <div className="w-full h-full rounded-full border border-gray-200 bg-white flex items-center justify-center overflow-hidden p-[1px]">
            {/* Profile Picture */}
            <img
              src={imgSrc}
              alt={role}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        </div>
        <h1 className="text-[10px] text-center">{name}</h1>
      </div>
    </>
  );
}

export default PostFeed;
