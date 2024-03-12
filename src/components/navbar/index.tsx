"use client";

import "./navbar.scss";
import { Image } from "@constants";
import { useScrollDirection } from "@hooks";
import { useState } from "react";

export const Navbar = () => {
  const [isOnTop, setIsOnTop] = useState(true);
  const scrollDirection = useScrollDirection();

  window.onscroll = () => {
    setIsOnTop(window.scrollY < 50);
  };

  return (
    <nav id={"global-navbar"} className={`${scrollDirection ? "hide" : "show"} ${isOnTop ? "onTop" : ""}`}>
      <div className={"header"}>
        <div className={"header-container"}>
          <div className={"header-container__logo"}>
            <a href={"/"} className={"logo"}>
              <img src={`${Image.LOGO}/ecomind-logo-w-text_zkdzk1.png`} alt={"The EcoMind"}/>
            </a>
          </div>
          <div className={"header-container__nav"}>
            <ul className={"navigation"}>
              <li className={"navigation__item"}>
                <a href={"#"} className={"navigation__link"}>Real Estate</a>
              </li>
              <li className={"navigation__item"}>
                <a href={"/messages"} className={"navigation__link"}>Message</a>
              </li>
              <li className={"navigation__item"}>
                <a href={"/search"} className={"navigation__link"}>Home Search</a>
              </li>
            </ul>
            <button className={"hamburger"}>
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="30" cy="30" r="30"></circle>
                <rect className="line line--top" x="18" y="26" width="24" height="2"></rect>
                <rect className="line line--bottom" x="30" y="32" width="12" height="2"></rect>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
