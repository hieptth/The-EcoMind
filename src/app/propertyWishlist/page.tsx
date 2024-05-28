"use client";
import { Navbar } from "@components";
import { Input, Pagination, Select } from "antd";
import Footer from "app/component/footer/Footer";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Listing } from "./interface/listing";
import styles from "./propertyWishlist.module.css";

const PropertyWishlist = () => {
  const PAGE_SIZE = 9;
  const [listings, setListings] = useState<Listing[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [propertyType, setPropertyType] = useState(undefined);
  const [bathrooms, setBathrooms] = useState(undefined);
  const [bedrooms, setBedrooms] = useState(undefined);

  const [price, setPrice] = useState<[number, number]>([1, 5]);
  const [sqft, setSqft] = useState<[number, number]>([500, 10000]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://65f04039da8c6584131b40de.mockapi.io/listing/v1/realestateapilisting"
        );
        const data = await response.json();
        setListings(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

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
                src={"/div.image-wrap.png"}
                width={300}
                height={200}
                alt={"listingimage"}
                layout="responsive"
              />
              <div className={styles.listingDetails}>
                <span className={styles.status}>{listing.status}</span>
                <span className={styles.price}>{listing.price}</span>
                <span className={styles.description}>
                  {listing.description}
                </span>
                <span className={styles.address}>{listing.address}</span>
                <span
                  className={styles.meta}
                >{`${listing.beds} BEDS | ${listing.baths} BATHS | ${listing.sqft} SQ.FT.`}</span>
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
