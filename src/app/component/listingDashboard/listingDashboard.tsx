"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./listingDashboard.module.css";
import { Listing } from "./interface/listing";
import { Pagination } from "antd";
import { MoreOutlined } from "@ant-design/icons";

import {
  Input,
  Slider,
  Row,
  Col,
  Select,
  Button,
  Checkbox,
  Modal,
  Menu,
  Dropdown,
} from "antd";

const ListingDashboard = () => {
  const PAGE_SIZE = 9;
  const [listings, setListings] = useState<Listing[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [propertyType, setPropertyType] = useState(undefined);
  const [bathrooms, setBathrooms] = useState(undefined);
  const [bedrooms, setBedrooms] = useState(undefined);

  const [price, setPrice] = useState<[number, number]>([1, 5]);
  const [sqft, setSqft] = useState<[number, number]>([500, 10000]);

  const [selectMode, setSelectMode] = useState(false);
  const [selectedListings, setSelectedListings] = useState(new Set<number>());

  // ... existing functions

  const toggleSelectMode = () => {
    setSelectMode(!selectMode);
    if (selectMode) {
      setSelectedListings(new Set());
    }
  };

  const handleSelectAll = () => {
    if (selectedListings.size === currentListings.length) {
      setSelectedListings(new Set());
    } else {
      setSelectedListings(
        new Set(currentListings.map((listing) => listing.id))
      );
    }
  };

  const handleDeleteSelected = () => {
    Modal.confirm({
      title: "Are you sure you want to delete these listings?",
      onOk: () => {
        const newListings = listings.filter(
          (listing) => !selectedListings.has(listing.id)
        );
        setListings(newListings);
        setSelectedListings(new Set());
      },
    });
  };

  const handleSelectListing = (id: number) => {
    const newSelection = new Set(selectedListings);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }
    setSelectedListings(newSelection);
  };
  const handleAddProperty = () => {
    console.log("Add Property");
    // Add functionality or Modal to add a new property
  };

  const handleEditListing = (id: number) => {
    console.log("Edit Listing:", id);
    // Add functionality or Modal to edit the listing
  };

  const handleDeleteListing = (id: number) => {
    Modal.confirm({
      title: "Are you sure you want to delete this listing?",
      onOk: () => {
        const newListings = listings.filter((listing) => listing.id !== id);
        setListings(newListings);
      },
    });
  };

  const menu = (id: number) => (
    <Menu>
      <Menu.Item key="1" onClick={() => handleEditListing(id)}>
        Edit
      </Menu.Item>
      <Menu.Item key="2" onClick={() => handleDeleteListing(id)}>
        Delete
      </Menu.Item>
    </Menu>
  );
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
      <div className={styles.listingsContainers}>
        <div className={styles.searchContainers}>
          <Search
            placeholder="Search by Address, City, or Neighborhood"
            size="large"
            onSearch={(value) => console.log(value)}
          />

          <div className={styles.roomContainers}>
            <Row gutter={0}>
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
            <div className={styles.actions}>
              <Button onClick={toggleSelectMode}>
                {selectMode ? "Cancel" : "Select"}
              </Button>
              {selectMode && (
                <>
                  <Button onClick={handleSelectAll}>Select All</Button>
                  <Button onClick={handleDeleteSelected}>
                    Delete Selected
                  </Button>
                </>
              )}
              <Button onClick={handleAddProperty}>Add Property</Button>
            </div>
          </div>
        </div>
        <div className={styles.listings}>
          {currentListings.map((listing) => (
            <div key={listing.id} className={styles.listingItem}>
              {selectMode && (
                <Checkbox
                  checked={selectedListings.has(listing.id)}
                  onChange={() => handleSelectListing(listing.id)}
                  className={styles.checkbox}
                />
              )}
              <Image
                src={"/div.image-wrap.png"}
                width={300}
                height={200}
                alt={"listingimage"}
                layout="responsive"
              />
              <div className={styles.listingDetails}>
                <div className={styles.dropdownContainer}>
                  <Dropdown overlay={menu(listing.id)} trigger={["click"]}>
                    <Button icon={<MoreOutlined />} />
                  </Dropdown>
                </div>
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
    </>
  );
};

export default ListingDashboard;
