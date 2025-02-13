import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faSearch,
  faBell,
  faUser,
  faEnvelope,
  faFilm,
  faPlusCircle,
  faUserPlus,
  faEllipsisH,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import MyProfile from "../Images/MyProfile.jpg";

const cards = [
  { id: 1, icon: faHouse, title: "Home" },
  { id: 2, icon: faSearch, title: "Explore" },
  { id: 3, icon: faBell, title: "Notifications" },
  { id: 4, icon: faUser, title: "Profile" },
  { id: 5, icon: faEnvelope, title: "Messages" },
  { id: 6, icon: faFilm, title: "Reels" },
  { id: 7, icon: faUserPlus, title: "Create " },

  { id: 9, icon: faEllipsisH, title: "More" },
];

function Features({ isCartSideBarVisible, setIsCartSideBarVisible }) {
  return (
    <>
      <div
        className={`modal fullRight fade modal-shopping-cart ${
          isCartSideBarVisible ? "show d-block bg-slate-200 h-[100vh] py-3 fixed" : "d-none"
        }`}
      >
        <div className="h-full flex flex-col justify-between ">
          <div className="px-4">
            <div className="flex justify-between items-center">
              <h1 className="xl:text-3xl md:text-2xl text-md lg:pb-4 pb-2 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-transparent bg-clip-text font-bold">
                Oumphgram
              </h1>
              {isCartSideBarVisible ? (
                <>
                <FontAwesomeIcon
                icon={faBars}
                className="md:text-[17px] text-[12px] cursor-pointer"
                onClick={() => setIsCartSideBarVisible(!isCartSideBarVisible)}
              />
                </>
              ): ( "")}
            </div>
            {cards.map((card) => (
              <div
                key={card.id}
                className="flex w-full bg-white hover:bg-gray-100 justify-start gap-2 border-1 border-gray-50 lg:my-4 my-3 items-center lg:py-3 py-1 rounded-lg cursor-pointer px-3"
              >
                <FontAwesomeIcon icon={card.icon} className="lg:text-2xl md:text-xl text-md" />
                <h1 className="lg:text-xl text-md">{card.title}</h1>
              </div>
            ))}
          </div>

          <div className="flex lg:hidden justify-items-end md:pb-0 pb-4 w-fit px-5 items-start justify-between gap-2 bg-gray-200 rounded-lg p-1 mx-auto">
            <img
              src={MyProfile}
              alt=""
              className=" object-cover md:w-11 md:h-11  w-9 h-9 rounded-full "
            />

            <div className="mg:ms-2 ms-1 lg:text-md text-sm">
              <h1 className="">
                <b>its_me_amisha_m</b>
              </h1>
              <h1>Amisha Motwani</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Features;
