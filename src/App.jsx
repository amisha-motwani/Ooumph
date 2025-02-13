import React from "react";
import PostFeed from "./Page/PostFeed";
import Suggestions from "./Page/Suggestions";
import Features from "./Page/Features";
import HeartButton from "./Component/HeartButton";

function App() {

  
  return (
    <>
    {/* <HeartButton /> */}
     <div className="w-full flex">
        {/* Left Sidebar */}
        <div className="xl:w-[20%] lg:w-[15%] sm:w-[30%] sm:block hidden border border-gray-200 py-3 px-3 sticky top-0 h-[100vh]">
          <Features
          
            />
        </div>

        {/* Middle Content */}
        <div className=" lg:w-[60%] sm:w-[70%] w-[100%] border-gray-100 py-3 px-3">
          <PostFeed />
        </div>

        {/* Right Sidebar */}
        <div className="xl:w-[20%] lg:block w-[25%] hidden border border-gray-200 py-3  px-3  sticky top-0 h-[100vh] ">
          <Suggestions />{" "}
        </div>
      </div>
    </>
  )
}

export default App;
