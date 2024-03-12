"use client";
import Image from "next/image";
import { useState } from "react";
import styles from "./salePage.module.css";
import ListingComponent from "app/component/listing/Listing";
import Footer from "app/component/footer/Footer";

const Page = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <div className={styles.banner}>
        <Image
          src="/path-to-banner-image.jpg"
          alt="Banner"
          layout="responsive"
          width={1920}
          height={400}
          objectFit="cover"
        />
      </div>

      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <ListingComponent />

      <Footer />
    </>
  );
};

export default Page;
