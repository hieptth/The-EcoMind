"use client";

import { Navbar } from "@components";
import { CldVideoPlayer } from "next-cloudinary";
import "./home.scss";


export default function HomePage() {

  return (
    <>
      <Navbar/>
      <section className={"hero"}>
        <CldVideoPlayer
          id={"intro-video"}
          src={"/EcoMind/Logo/intro-video.mp4"}
          width={"100%"}
          height={"100%"}
          controls={false}
          loop={true}
          autoplay={"true"}
          muted={true}
          hideContextMenu={true}
        />
      </section>
    </>
  );
};

