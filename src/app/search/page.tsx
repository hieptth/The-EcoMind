"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./searchPage.module.css";
import { Pagination } from "antd";
import { useRouter } from "next/navigation";

import { Navbar } from "@components";
import { Input, Slider, Row, Col, Select } from "antd";

import { Property, PropertyService, PropertyStore } from "stores/propertyStore";
import { useObservable } from "shared/useObservable";

interface ModalFormData extends Partial<Property> {
  image?: string;
}

const HomeSearch = () => {
  const PAGE_SIZE = 9;
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const listings = useObservable(PropertyStore);

  const { Search } = Input;
  const { Option } = Select;

  const [bathrooms, setBathrooms] = useState<number | null>(null);
  const [bedrooms, setBedrooms] = useState<number | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([1, 5]);
  const [sqftRange, setSqftRange] = useState<[number, number]>([500, 10000]);
  const [propertyStatus, setPropertyStatus] = useState("");
  const [searchAddress, setSearchAddress] = useState("");

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {};

  useEffect(() => {
    fetchListings();
  }, [
    bathrooms,
    bedrooms,
    priceRange,
    sqftRange,
    searchAddress,
    propertyStatus,
  ]);
  const filteredListings = listings
    ?.filter((listing) => {
      const price = parseInt(listing.price.replace(/[\D]/g, "")); // Remove non-digit characters for price comparison
      const addressCondition =
        !searchAddress ||
        listing.location.toLowerCase().includes(searchAddress.toLowerCase());
      const statusCondition =
        !propertyStatus || listing.status === propertyStatus;
      const bathroomsCondition =
        !bathrooms ||
        (listing?.amenities?.interior?.bathrooms ?? 0) >= bathrooms;
      const bedroomsCondition =
        !bedrooms || (listing?.amenities?.interior?.bedrooms ?? 0) >= bedrooms;
      const priceCondition =
        price >= priceRange[0] * 1000000 && price <= priceRange[1] * 1000000;
      const sqftCondition =
        parseInt(listing.sqft) >= sqftRange[0] &&
        parseInt(listing.sqft) <= sqftRange[1];

      return (
        addressCondition &&
        statusCondition &&
        bathroomsCondition &&
        bedroomsCondition &&
        priceCondition &&
        sqftCondition
      );
    })
    .slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handleAddressSearch = (value: string) => {
    setSearchAddress(value);
  };

  const handleBedroomsChange = (value: any) => {
    setBedrooms(value === "none" ? null : parseInt(value));
  };
  const handleBathroomsChange = (value: any) => {
    setBathrooms(value === "none" ? null : parseInt(value));
  };
  const handleStatusChange = (value: string) => {
    setPropertyStatus(value === "none" ? "" : value);
  };

  const handlePriceChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setPriceRange(value as [number, number]);
    }
  };

  const handleSqftChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setSqftRange(value as [number, number]);
    }
  };

  const currentListings = listings.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleListingSelect = (id: number) => {
    router.push(`/listingDetail/${id}`);
  };

  return (
    <>
      <Navbar />
      <div className={styles.listingsContainers}>
        <div className={styles.searchContainers}>
          <Row gutter={16} align="middle">
            {" "}
            {/* Added align="middle" to vertically center align items */}
            <Col span={24}>
              <Search
                placeholder="Search by Address, City, or Neighborhood"
                size="large"
                onSearch={handleAddressSearch}
              />
            </Col>
          </Row>
          <div className={styles.roomContainers}>
            <Row gutter={8}>
              <Col span={8}>
                <Select
                  placeholder="Select property type"
                  value={propertyStatus || undefined}
                  onChange={handleStatusChange}
                  style={{ width: "100%" }}
                >
                  <Option value="none">None</Option>
                  <Option value="For Sale">For Sale</Option>
                  <Option value="For Rent">For Rent</Option>
                </Select>
              </Col>
              <Col span={8}>
                <Select
                  value={bathrooms?.toString() || undefined}
                  onChange={handleBathroomsChange}
                  placeholder="Bathrooms"
                  style={{ width: "100%" }}
                >
                  <Option value="none">None</Option>
                  <Option value="1">1+</Option>
                  <Option value="2">2+</Option>
                  <Option value="3">3+</Option>
                </Select>
              </Col>
              <Col span={8}>
                <Select
                  value={bedrooms?.toString() || undefined}
                  onChange={handleBedroomsChange}
                  placeholder="Bedrooms"
                  style={{ width: "100%" }}
                >
                  <Option value="none">None</Option>
                  <Option value="1">1+</Option>
                  <Option value="2">2+</Option>
                  <Option value="3">3+</Option>
                  <Option value="4">4+</Option>
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
                  value={priceRange}
                  onChange={handlePriceChange}
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
                  value={sqftRange}
                  onChange={handleSqftChange}
                  marks={{ 500: "<500 sqft", 10000: "10K+ sqft" }}
                />
              </Col>
            </Row>
            <div className={styles.actions}></div>
          </div>
        </div>

        <div className={styles.listings}>
          {filteredListings.map((listing) => (
            <div key={listing.id} className={styles.listingItem}>
              <Image
                src={"/div.image-wrap.png"}
                width={300}
                height={200}
                alt={"listingimage"}
                layout="responsive"
                onClick={() => handleListingSelect(listing.id)}
              />
              <div className={styles.listingDetails}>
                <span
                  className={styles.status}
                  style={{
                    color:
                      listing.status === "For Rent" ? "#8f3524" : "#fbee24",
                  }}
                >
                  {listing.status}
                </span>
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
    </>
  );
};

export default HomeSearch;
