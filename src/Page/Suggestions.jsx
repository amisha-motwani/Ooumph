import React from "react";
import SuggestionCard from "../Component/SuggestionCard.js";
import MyProfile from "../Images/MyProfile.jpg";
// import MyProfile from "../Images/"

function Suggestions() {
  console.log("data  for cards", SuggestionCard);

  return (
    <>
      <div className="h-full flex flex-col justify-between">
        <div className="px-3">
          <div className="w-full flex items-start bg-gray-100 rounded-lg p-1">
            <img
              src={MyProfile}
              alt=""
              className=" object-cover w-14 h-14  rounded-full "
            />
            <div className="ms-2 text-lg">
              <h1 className="">
                <b>its_me_amisha_m</b>
              </h1>
              <h1>Amisha Motwani</h1>
            </div>
          </div>
          <hr className="w-full my-2" />
          <h1 className="text-gray-800 text-lg">Suggestions for you</h1>

          {SuggestionCard.map((user) => (
            <div
              key={user.id}
              className="w-full flex justify-between items-start hover:bg-gray-100 rounded-lg py-1 px-3 my-2 "
            >
              <div className="flex">
                <img
                  src={user.profile_picture}
                  alt={user.username}
                  className="object-cover w-11 h-11 border-1 border-gray-500 rounded-full"
                />
                <div className="ms-2 text-md">
                  <h1>
                    <b>{user.username}</b>
                  </h1>
                  <h1>{user.name}</h1>
                </div>
              </div>
              <div className="place-self-start">
                <h1 className="text-blue-800 text-md hover:text-blue-900 cursor-pointer">
                  Follow
                </h1>
              </div>
            </div>
          ))}
        </div>
        <div className="pb-3 px-3">
          <h1 className="text-md text-gray-400">
            About
            <span className="">. </span>
            Help
            <span>. </span>Press
            <span>. </span>
            API
            <span>. </span>
            Jobs <span>. </span>
            Privacy <span>. </span>
            Terms <span>. </span>
            Locations<span>. </span>
            Language <span>. </span>
            Meta Verified
          </h1>
          <h1 className="text-md text-gray-400 mt-4">
            {" "}
            © 2025 Ooumph from Meta
          </h1>
        </div>
      </div>
    </>
  );
}

export default Suggestions;
