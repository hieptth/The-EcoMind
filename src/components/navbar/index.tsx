"use client";

import "./navbar.scss";
import { Image as ImageConstants } from "@constants";
import Image from "next/image";
import { useScrollDirection } from "@hooks";
import { useEffect, useState } from "react";
import Link from "next/link";
import { AccountService } from "stores";

export const Navbar = () => {
  const [isOnTop, setIsOnTop] = useState(true);
  const scrollDirection = useScrollDirection();
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    window.onscroll = () => {
      setIsOnTop(window.scrollY < 50);
    };

    const accountInfo = localStorage.getItem("accountInfo");
    if (accountInfo) {
      setRole(JSON.parse(accountInfo).role);
      setUsername(JSON.parse(accountInfo).username);
    }
  }, []);

  return (
    <nav
      id={"global-navbar"}
      className={`${scrollDirection ? "hide" : "show"} ${
        isOnTop ? "onTop" : ""
      }`}
    >
      <div className={"header"}>
        <div className={"header-container"}>
          <div className={"header-container__logo"}>
            <Link href={"/"} className={"logo"}>
              <Image
                src={`${ImageConstants.LOGO}/ecomind-logo-w-text.png`}
                alt={"The EcoMind"}
                width={280}
                height={100}
              />
            </Link>
          </div>
          <div className={"header-container__nav"}>
            <ul className={"navigation"}>
              {role === "agent" && (
                <li className={"navigation__item"}>
                  <Link href={"/dashboard"} className={"navigation__link"}>
                    Dashboard
                  </Link>
                </li>
              )}
              <li className={"navigation__item"}>
                <Link href={"/messages"} className={"navigation__link"}>
                  Message
                </Link>
              </li>
              <li className={"navigation__item"}>
                <Link href={"/search"} className={"navigation__link"}>
                  Home Search
                </Link>
              </li>
              {username ? (
                <li
                  className={"navigation__item"}
                  onMouseEnter={() => setShowDropdown(true)}
                  onMouseLeave={() => setShowDropdown(false)}
                >
                  <Link href={"/profile"} className={"navigation__link"}>
                    {username}
                  </Link>
                  {showDropdown && (
                    <ul className={"dropdown-menu"}>
                      <li>
                        <Link href={"/propertyWishlist"}>Wishlist</Link>
                      </li>
                      <li
                        onClick={() => {
                          AccountService.logout();
                          window.location.href = "/";
                        }}
                      >
                        Log out
                      </li>
                    </ul>
                  )}
                </li>
              ) : (
                <li className={"navigation__item"}>
                  <Link href={"/login"} className={"navigation__link"}>
                    Login
                  </Link>
                </li>
              )}
            </ul>
            <button className={"hamburger"}>
              <svg
                width="60"
                height="60"
                viewBox="0 0 60 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="30" cy="30" r="30"></circle>
                <rect
                  className="line line--top"
                  x="18"
                  y="26"
                  width="24"
                  height="2"
                ></rect>
                <rect
                  className="line line--bottom"
                  x="30"
                  y="32"
                  width="12"
                  height="2"
                ></rect>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
