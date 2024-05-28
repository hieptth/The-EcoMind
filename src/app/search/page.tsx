"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./searchPage.module.css";
import { Listing } from "./interface/listing";
import Header from "app/component/header/Header";
import Footer from "app/component/footer/Footer";
import { Pagination } from "antd";
import { Input, Slider, Row, Col, Select } from "antd";
import { Navbar } from "@components";
import listingsData from "./listing.json";

const HomeSearch = () => {
  const PAGE_SIZE = 9;
  const [listings, setListings] = useState<Listing[]>(listingsData);
  const [currentPage, setCurrentPage] = useState(1);

  const [propertyType, setPropertyType] = useState(undefined);
  const [bathrooms, setBathrooms] = useState(undefined);
  const [bedrooms, setBedrooms] = useState(undefined);

  const [price, setPrice] = useState<[number, number]>([1, 5]);
  const [sqft, setSqft] = useState<[number, number]>([500, 10000]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(
  //         "https://65f04039da8c6584131b40de.mockapi.io/listing/v1/realestateapilisting"
  //       );
  //       const data = await response.json();
  //       setListings(data);
  //     } catch (error) {
  //       console.error("Error fetching data: ", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

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
          <Search
            placeholder="Search by Address, City, or Neighborhood"
            size="large"
            onSearch={(value) => console.log(value)}
          />

          {/* ... Other components ... */}
          <div className={styles.roomContainers}>
            <Row gutter={8}>
              <Col span={8}>
                <Select
                  value={propertyType}
                  onChange={setPropertyType}
                  placeholder="Select property type"
                  style={{ width: "100%" }}
                >
                  <Option value="forSale">For Sale</Option>
                  <Option value="forRent">For Rent</Option>
                </Select>
              </Col>
              <Col span={8}>
                <Select
                  value={bathrooms}
                  onChange={setBathrooms}
                  placeholder="Bathrooms"
                  style={{ width: "100%" }}
                >
                  <Option value={1}>1</Option>
                  <Option value={2}>2</Option>
                  <Option value={3}>3</Option>
                </Select>
              </Col>
              <Col span={8}>
                <Select
                  value={bedrooms}
                  onChange={setBedrooms}
                  placeholder="Bedrooms"
                  style={{ width: "100%" }}
                >
                  <Option value={1}>1</Option>
                  <Option value={2}>2</Option>
                  <Option value={3}>3</Option>
                  <Option value={4}>4</Option>
                </Select>
              </Col>
            </Row>
          </div>
          <div className={styles.sliderContainer}>
            <Row gutter={48}>
              <Col span={12}>
                <h1 className={styles.upperSlider}>PRICE</h1>
                <Slider
                  range
                  step={0.1}
                  min={1}
                  max={5}
                  value={price}
                  onChange={onPriceChange}
                  marks={{ 1: "$1M", 5: "$5M+" }}
                />
              </Col>
              <Col span={12}>
                <h1 className={styles.upperSlider}>LIVING AREA</h1>
                <Slider
                  range
                  step={100}
                  min={500}
                  max={10000}
                  value={sqft}
                  onChange={onSqftChange}
                  marks={{ 500: "<500 sqft", 10000: "10K+ sqft" }}
                />
              </Col>
            </Row>
          </div>
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

export default HomeSearch;
