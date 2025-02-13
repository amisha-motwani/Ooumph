import React, { useState } from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import Comments from "./Comments.js";
import MyProfile from "../Images/MyProfile.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

function CommentModal({ closeModal, postDetails }) {
  const [commentliked, setCommentLiked] = useState(false);
  const [comments, setComments] = useState(Comments);
  const [commentText, setCommentText] = useState("");
  const [commentSaved, setCommentSaved] = useState("true");
  const [myCommentLiked, setMyCommentLiked] = useState(false);

  const handleLike = (index) => {
    setComments((prev) => {
      return prev.map((comment, i) => {
        if (i !== index) return comment; // Keep other comments unchanged

        // Toggle like state and update likes count
        return {
          ...comment,
          liked: !comment.liked,
          likes: comment.liked ? comment.likes - 1 : comment.likes + 1,
        };
      });
    });
  };

  // Function to handle posting the comment
  const handlePostComment = () => {
    if (!commentText.trim()) return; // Stop if input is empty

    const newComment = {
      username: "its_me_amisha",
      comment: commentText,
      likes: 0,
      liked: false,
    };

    setComments([...comments, newComment]); // Add new comment to the list
    setCommentText(""); // Clear input field
  };

  console.log("Comments data", Comments);
  console.log("Post Data", postDetails);

  return (
    <>
      <Modal
        isOpen={true}
        onRequestClose={closeModal}
        className="fixed inset-0 flex items-center justify-center p-4 "
        overlayClassName="fixed inset-0 bg-opacity-10 backdrop-blur-[5px]"
        
      >
        <div className="bg-white rounded-lg sm:w-[60%] w-[70%] lg:max-w-[70%] md:w-[75%] transform transition-all md:mt-0 my-5 overflow-y-scroll"
        >
          <div className=" md:hidden md:px-0 px-2 flex justify-between items-center md:mt-3 mt-1">
            <div className="w-full flex justify-start items-center gap-2">
              <img
                src={postDetails?.profile_picture}
                alt=""
                className="md:w-14 md:h-14 w-10 h-10 rounded-full object-cover"
              />
              <h1>
                <b>{postDetails?.username}</b>
              </h1>
            </div>
            <button
              onClick={closeModal}
              className="md:w-9 md:h-8 w-7 h-7 rounded-lg flex justify-center items-center md:text-2xl text-lg text-white bg-red-600"
            >
              <b>X</b>
            </button>
          </div>
          <div className="md:flex block justify-evenly p-2 border border-gray-300">
            <div className="md:w-[55%] w-[100%]  h-fit ">
              <img
                src={postDetails?.post_image}
                alt=""
                className="w-full md:min-h-[500px]"
              />
            </div>
            <div className="md:w-[45%] w-[100%] px-3">
              <div className=" md:flex hidden justify-between  items-center md:mt-3 mt-1">
                <div className="w-full flex justify-start items-center gap-2">
                  <img
                    src={postDetails?.profile_picture}
                    alt=""
                    className="md:w-14 md:h-14 w-10 h-10 rounded-full object-cover"
                  />
                  <h1>
                    <b>{postDetails?.username}</b>
                  </h1>
                </div>
                <button
                  onClick={closeModal}
                  className="md:w-9 md:h-8 w-7 h-7 border rounded-lg flex justify-center items-center md:text-2xl text-lg text-white bg-red-600"
                >
                  <b>X</b>
                </button>
              </div>
              <h1 className="text-gray-800 md:my-2 my-1">
                {" "}
                {postDetails?.caption}
              </h1>
              <hr className="w-full text-gray-300`md:my-2 my-1" />

              <div className="flex flex-col justify-between md:min-h-[390px] md:max-h-fit">
                <div>
                  {/* Comment section */}
                  {comments.map((comment, index) => (
                    <div key={index} className="mt-4">
                      <div className="flex gap-2">
                        <div>
                          <img
                            src={comment.img || MyProfile}
                            alt="img"
                            className="md:w-13 md:h-12 w-8 h-8 border border-gray-300 rounded-full"
                          />
                        </div>
                        <div>
                          <b className="md:text-xl text-md">
                            {comment.username}:
                          </b>{" "}
                          {comment.comment}
                          <div className="flex items-center gap-2">
                            <span className="md:text-xl text-sm text-gray-800 ">
                              {comment.likes} likes
                            </span>
                            <FontAwesomeIcon
                              icon={faHeart}
                              className={
                                comment.liked
                                  ? "text-red-500 cursor-pointer"
                                  : "text-gray-500 cursor-pointer"
                              }
                              onClick={() => handleLike(index)}
                            />
                            <span className="md:text-xl text-sm text-gray-800 mb-[1px]">
                              {" "}
                              Reply{" "}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {commentSaved && commentSaved !== "true" && (
                    <>
                      <div className="mt-4">
                        <div className="flex gap-2">
                          <div>
                            <img
                              src={MyProfile}
                              alt="img"
                              className="w-13 h-12 border border-gray-300  rounded-full"
                            />
                          </div>
                          <div>
                            <b>its_me_amisha:</b> {commentSaved}
                            <div className="flex items-center gap-2">
                              <h1 className="text-[16px] text-gray-800">
                                {myCommentLiked ? `${1} likes` : `${0} likes`}
                              </h1>
                              <FontAwesomeIcon
                                icon={faHeart}
                                className={`cursor-pointer text-xl transition-colors duration-300 rounded-full
          ${myCommentLiked ? "text-red-500" : "text-gray-500"}  `}
                                onClick={() =>
                                  setMyCommentLiked(!myCommentLiked)
                                } // Toggle the like state
                              />
                              <span className="text-md text-gray-800 mb-[1px]">
                                {" "}
                                Reply{" "}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <div>
                  
                  {/* Post Comment */}
                  <div className="w-full flex justify-center items-center gap-4 my-3">
                    <input
                      type="text"
                      className="w-full border-1 py-3 rounded-lg px-2"
                      placeholder="Add a commnent"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                    />
                    <button
                      className="w-fit h-fit rounded-lg bg-blue-900 text-white px-3 py-1 text-center "
                      onClick={handlePostComment}
                    >
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default CommentModal;
