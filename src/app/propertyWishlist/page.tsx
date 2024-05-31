"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./propertyWishlist.module.css";
import { Listing } from "./interface/listing";
import Header from "app/component/header/Header";
import Footer from "app/component/footer/Footer";
import { Pagination } from "antd";
import { Input, Slider, Row, Col, Select } from "antd";
import { Navbar } from "@components";
import { useObservable } from "shared/useObservable";
import { WishlistStore } from "stores/wishlistStore/wishlist.store";

const PropertyWishlist = () => {
  const PAGE_SIZE = 9;
  const [currentPage, setCurrentPage] = useState(1);

  // Using useObservable to subscribe to WishlistStore
  const listings = useObservable(WishlistStore);

  const [propertyType, setPropertyType] = useState(undefined);
  const [bathrooms, setBathrooms] = useState(undefined);
  const [bedrooms, setBedrooms] = useState(undefined);
  const [price, setPrice] = useState<[number, number]>([1, 5]);
  const [sqft, setSqft] = useState<[number, number]>([500, 10000]);

  const currentListings = listings.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const { Search } = Input;
  const { Option } = Select;

  const onPriceChange = (value: number | number[]) => {
    if (Array.isArray(value) && value.length === 2) {
      setPrice(value as [number, number]);
    }
  };

  const onSqftChange = (value: number | number[]) => {
    if (Array.isArray(value) && value.length === 2) {
      setSqft(value as [number, number]);
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.listingsContainers}>
        <div className={styles.searchContainers}>
          <h1>Your Property Wishlist</h1>
        </div>
        <div className={styles.listings}>
          {currentListings.map((listing) => (
            <div key={listing.id} className={styles.listingItem}>
              <Image
                src={"/div.image-wrap.png"} // Assume imageUrl might be part of your data
                width={300}
                height={200}
                alt={"listing image"}
                layout="responsive"
              />
              <div className={styles.listingDetails}>
                <span className={styles.status}>{listing.status}</span>
                <span className={styles.price}>{listing.price}</span>
                <span className={styles.description}>
                  {listing.description}
                </span>
                <span className={styles.address}>{listing.location}</span>
                <span
                  className={styles.meta}
                >{`${listing.amenities?.interior?.bedrooms} BEDS | ${listing.amenities?.interior?.bathrooms} BATHS | ${listing.sqft} SQ.FT.`}</span>
              </div>
            </div>
          ))}
        </div>
        <Pagination
          current={currentPage}
          pageSize={PAGE_SIZE}
          total={listings.length}
          onChange={handlePageChange}
        />
      </div>
      <Footer />
    </>
  );
};

export default PropertyWishlist;
