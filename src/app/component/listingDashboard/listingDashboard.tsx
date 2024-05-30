"use client";
import { MoreOutlined, PlusOutlined } from "@ant-design/icons";
import { Pagination, Upload } from "antd";
import { UploadChangeParam } from "antd/lib/upload/interface";
import Image from "next/image";
import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "./listingDashboard.module.css";

import {
  Button,
  Checkbox,
  Col,
  Dropdown,
  Form,
  Input,
  Menu,
  message,
  Modal,
  Row,
  Select,
  Slider,
} from "antd";

import { useObservable } from "shared/useObservable";
import { Property, PropertyService, PropertyStore } from "stores/propertyStore";
import { UploadOutlined } from "@mui/icons-material";
interface ModalFormData extends Partial<Property> {
  image?: string;
}
interface ListingDashboardProps {
  onListingClick: (property: Property) => void;
}

const ListingDashboard: React.FC<ListingDashboardProps> = ({
  onListingClick,
}) => {
  const PAGE_SIZE = 9;

  const listings = useObservable(PropertyStore);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectMode, setSelectMode] = useState(false);
  const [selectedListings, setSelectedListings] = useState(new Set<number>());
  const [del, setDel] = useState(true);
  const { Search } = Input;
  const { Option } = Select;

  const [bathrooms, setBathrooms] = useState<number | undefined>();
  const [bedrooms, setBedrooms] = useState<number | undefined>();
  const [priceRange, setPriceRange] = useState<[number, number]>([1, 5]);
  const [sqftRange, setSqftRange] = useState<[number, number]>([500, 10000]);
  const [propertyStatus, setPropertyStatus] = useState("");
  const [searchAddress, setSearchAddress] = useState("");

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    // const allProperties = await PropertyService.getProperties();
    // setListings(allProperties);
  };

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
      return (
        (!searchAddress ||
          listing.location
            .toLowerCase()
            .includes(searchAddress.toLowerCase())) &&
        (!propertyStatus || listing.status === propertyStatus) &&
        (!bathrooms || listing?.amenities?.interior?.bathrooms === bathrooms) &&
        (!bedrooms || listing?.amenities?.interior?.bedrooms === bedrooms) &&
        price >= priceRange[0] * 1000000 &&
        price <= priceRange[1] * 1000000 &&
        parseInt(listing.sqft) >= sqftRange[0] &&
        parseInt(listing.sqft) <= sqftRange[1]
      );
    })
    .slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handleAddressSearch = (value: string) => {
    setSearchAddress(value);
  };

  const handleBedroomsChange = (value: any) => {
    setBedrooms(value === "none" ? 0 : value);
  };
  const handleBathroomsChange = (value: any) => {
    setBathrooms(value === "none" ? 0 : value);
  };
  const handleStatusChange = (value: string) => {
    if (value === "none") {
      setPropertyStatus(""); // Reset or set to an initial state that means no filter
    } else {
      setPropertyStatus(value);
    }
  };

  const handleListingSelect = (id: number) => {
    const property = listings.find((p) => p.id === id);
    if (property) {
      onListingClick(property);
    }
  };

  const toggleSelectMode = () => {
    setSelectMode(!selectMode);
    if (selectMode) {
      setSelectedListings(new Set());
    }
  };

  const handleSelectAll = () => {
    if (selectedListings.size === listings.length) {
      setSelectedListings(new Set());
    } else {
      setSelectedListings(new Set(listings.map((listing) => listing.id)));
    }
  };

  const handleDeleteSelected = () => {
    Modal.confirm({
      title: "Are you sure you want to delete these listings?",
      onOk: () => {
        selectedListings.forEach((id) => PropertyService.deleteProperty(id));
        setDel(!del);
      },
    });
  };

  const handleDeleteListing = (id: number) => {
    Modal.confirm({
      title: "Are you sure you want to delete this listing?",
      onOk: () => {
        PropertyService.deleteProperty(id);
        setDel(!del);
      },
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalFormData, setModalFormData] = useState<ModalFormData>({});
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editListingData, setEditListingData] = useState<Property>({
    id: 0,
    imageUrl: "",
    title: "",
    price: "",
    description: "",
    sqft: "",
    status: "",
    location: "",
    mapPosition: {
      lat: 0,
      lng: 0,
    },
    amenities: {
      interior: {
        kitchen: "",
        laundry: "",
        fireplace: "",
        appliances: "",
        flooring: "",
        bedrooms: 0,
        bathrooms: 0,
      },
      exterior: {
        stories: "",
        pool: "",
        heat: "",
        garage: "",
        security: "",
        sewer: "",
        other: "",
        parking: "",
        lotFeatures: "",
        roof: "",
      },
      areaLot: {
        lotArea: 0,
        livingArea: "",
        yearBuilt: "",
        viewDescription: "",
        architecturalStyle: "",
        status: "",
      },
    },
  });

  // Other state and functions...

  const handleSaveChanges = () => {
    PropertyService.updateProperty(editListingData);
    setIsEditModalVisible(false);
  };

  const showModal = () => setIsModalVisible(true);
  const handleModalCancel = () => setIsModalVisible(false);
  const handleModalSubmit = () => {
    if (!modalFormData.price) {
      message.error("Please fill in all required fields.");
      return;
    }

    const newProperty: Property = {
      id: Math.max(...listings.map((l) => l.id), 0) + 1, // Generate ID
      imageUrl: modalFormData.image || "",
      title: modalFormData.title || "",
      price: modalFormData.price,
      mapPosition: {
        lat: 0,
        lng: 0,
      },
      description: modalFormData.description || "", // Default to empty string if undefined
      sqft: modalFormData.sqft || "",
      status: modalFormData.status || "",
      location: modalFormData.location || "",
      amenities: modalFormData.amenities || {
        interior: {},
        exterior: {},
        areaLot: {},
      }, // Provide defaults for complex nested structures
    };

    PropertyService.createProperty(newProperty);
    setIsModalVisible(false);
  };

  const onModalFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setModalFormData((prev) => ({ ...prev, [name.toLowerCase()]: value }));
  };

  const onUploadChange = (info: UploadChangeParam) => {
    if (info.file.status === "done") {
      if (info.file.originFileObj) {
        const imageUrl = URL.createObjectURL(info.file.originFileObj);
        setModalFormData((prev) => ({ ...prev, image: imageUrl }));
        message.success(`${info.file.name} file uploaded successfully`);
      } else {
        message.error("File upload failed: No file data available.");
      }
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
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
  const handleSelectListing = (id: number) => {
    const newSelection = new Set(selectedListings);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }
    setSelectedListings(newSelection);
  };
  const handleEditListing = (id: number) => {
    const listing = listings.find((listing) => listing.id === id);
    if (listing) {
      const {
        id,
        imageUrl,
        title,
        price,
        description,
        sqft,
        status,
        location,
        amenities,
      } = listing;
      const { interior, exterior, areaLot } = amenities || {};
      setEditListingData({
        id: listing.id,
        imageUrl: listing.imageUrl,
        title: listing.title,
        price: listing.price,
        description: listing.description,
        sqft: listing.sqft,
        status: listing.status,
        location: listing.location,
        mapPosition: {
          lat: listing.mapPosition.lat,
          lng: listing.mapPosition.lng,
        },
        amenities: {
          interior: interior || {
            kitchen: "",
            laundry: "",
            fireplace: "",
            appliances: "",
            flooring: "",
            bedrooms: 0,
            bathrooms: 0,
          },
          exterior: exterior || {
            stories: "",
            pool: "",
            heat: "",
            garage: "",
            security: "",
            sewer: "",
            other: "",
            parking: "",
            lotFeatures: "",
            roof: "",
          },
          areaLot: areaLot || {
            lotArea: 0,
            livingArea: "",
            yearBuilt: "",
            viewDescription: "",
            architecturalStyle: "",
            status: "",
          },
        },
      });
      setIsEditModalVisible(true);
    }
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
  if (!Array.isArray(listings)) {
    return <div>Loading...</div>; // Or some error handling
  }
  const handleListingClick = (id: number) => {
    window.location.href = `${window.location.origin}/dashboard/properties/${id}`;
  };

  return (
    <>
      <div className={styles.listingsContainers}>
        <div className={styles.searchContainers}>
          <Row gutter={16} align="middle">
            {" "}
            {/* Added align="middle" to vertically center align items */}
            <Col span={19}>
              <Search
                placeholder="Search by Address, City, or Neighborhood"
                size="large"
                onSearch={handleAddressSearch}
              />
            </Col>
            <Col>
              <Button onClick={toggleSelectMode}>
                {selectMode ? "Cancel" : "Select"}
              </Button>
            </Col>
            <Col>
              <Button className={styles.addButton} onClick={showModal}>
                Add Property
              </Button>
            </Col>
          </Row>
          <div className={styles.roomContainers}>
            <Row gutter={8}>
              <Col span={8}>
                <Select
                  value={propertyStatus}
                  onChange={handleStatusChange}
                  placeholder="Select property type"
                  style={{ width: "100%" }}
                >
                  <Option value="none">None</Option>
                  <Option value="For Sale">For Sale</Option>
                  <Option value="For Rent">For Rent</Option>
                </Select>
              </Col>
              <Col span={8}>
                <Select
                  value={bathrooms}
                  onChange={handleBathroomsChange}
                  placeholder="Bathrooms"
                  style={{ width: "100%" }}
                >
                  <Option value="none">None</Option>
                  <Option value={1}>1</Option>
                  <Option value={2}>2</Option>
                  <Option value={3}>3</Option>
                </Select>
              </Col>
              <Col span={8}>
                <Select
                  value={bedrooms}
                  onChange={handleBedroomsChange}
                  placeholder="Bedrooms"
                  style={{ width: "100%" }}
                >
                  <Option value="none">None</Option>
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
            <div className={styles.actions}>
              {selectMode && (
                <>
                  <Button onClick={handleSelectAll}>Select All</Button>
                  <Button
                    className={styles.buttonDelete}
                    onClick={handleDeleteSelected}
                  >
                    Delete Selected
                  </Button>
                </>
              )}
              <Modal
                title="Add New Property"
                visible={isModalVisible}
                onCancel={handleModalCancel}
                onOk={handleModalSubmit}
                okText="Add Property"
                cancelText="Cancel"
              >
                <Form layout="vertical">
                  <Form.Item label="Status">
                    <Input
                      name="status"
                      value={modalFormData.status}
                      onChange={onModalFormChange}
                    />
                  </Form.Item>
                  <Form.Item label="Price">
                    <Input
                      onChange={onModalFormChange}
                      name="price"
                      value={modalFormData.price}
                    />
                  </Form.Item>
                  <Form.Item label="Description">
                    <Input
                      onChange={onModalFormChange}
                      name="description"
                      value={modalFormData.description}
                    />
                  </Form.Item>
                  <Form.Item label="Address">
                    <Input
                      onChange={onModalFormChange}
                      name="address"
                      value={modalFormData.location}
                    />
                  </Form.Item>
                  <Form.Item label="Beds">
                    <Input
                      onChange={onModalFormChange}
                      name="beds"
                      value={modalFormData.amenities?.interior?.bedrooms}
                    />
                  </Form.Item>
                  <Form.Item label="Baths">
                    <Input
                      onChange={onModalFormChange}
                      name="baths"
                      value={modalFormData.amenities?.interior?.bathrooms}
                    />
                  </Form.Item>
                  <Form.Item label="Sqft">
                    <Input
                      onChange={onModalFormChange}
                      name="sqft"
                      value={modalFormData.sqft}
                    />
                  </Form.Item>
                  <Form.Item label="Property image">
                    <Upload
                      name="logo"
                      listType="picture-card"
                      className="avatar-uploader"
                      showUploadList={false}
                      beforeUpload={() => false}
                      onChange={onUploadChange}
                    >
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </Upload>
                  </Form.Item>
                </Form>
              </Modal>
            </div>
          </div>
        </div>
        <Modal
          title="Edit Property"
          visible={isEditModalVisible}
          onCancel={() => setIsEditModalVisible(false)}
          onOk={handleSaveChanges}
          okText="Save Changes"
          cancelText="Cancel"
        >
          <Form layout="vertical">
            <Form.Item label="Status">
              <Input
                name="status"
                value={editListingData?.status}
                onChange={(e) =>
                  setEditListingData({
                    ...editListingData,
                    status: e.target.value,
                  })
                }
              />
            </Form.Item>
            <Form.Item label="Price">
              <Input
                name="price"
                value={editListingData?.price}
                onChange={(e) =>
                  setEditListingData({
                    ...editListingData,
                    price: e.target.value,
                  })
                }
              />
            </Form.Item>
            <Form.Item label="Address">
              <Input
                name="address"
                value={editListingData?.location}
                onChange={(e) =>
                  setEditListingData({
                    ...editListingData,
                    location: e.target.value,
                  })
                }
              />
            </Form.Item>
            <Form.Item label="Beds">
              <Input
                name="beds"
                value={
                  editListingData?.amenities?.interior?.bedrooms?.toString() ||
                  ""
                }
                onChange={(e) => {
                  setEditListingData((prevState) => {
                    const newBedrooms = Number(e.target.value);
                    return {
                      ...prevState,
                      amenities: {
                        ...prevState.amenities,
                        interior: {
                          ...prevState.amenities?.interior,
                          bedrooms: newBedrooms,
                        },
                      },
                    };
                  });
                }}
              />
            </Form.Item>

            <Form.Item label="Baths">
              <Input
                name="baths"
                value={
                  editListingData?.amenities?.interior?.bathrooms?.toString() ||
                  ""
                }
                onChange={(e) => {
                  const newBathrooms = Number(e.target.value);
                  setEditListingData((prevState) => ({
                    ...prevState,
                    amenities: {
                      ...prevState.amenities,
                      interior: {
                        ...prevState.amenities?.interior,
                        bathrooms: newBathrooms,
                      },
                    },
                  }));
                }}
              />
            </Form.Item>

            <Form.Item label="Sqft">
              <Input
                name="sqft"
                value={editListingData?.sqft}
                onChange={(e) =>
                  setEditListingData({
                    ...editListingData,
                    sqft: e.target.value,
                  })
                }
              />
            </Form.Item>
            {/* <Form.Item label="Image">
              <Upload
                name="image"
                listType="picture-card"
                showUploadList={false}
                beforeUpload={() => false}
                onChange={onUploadChange}
              >
                {editListingData?.imageUrl ? (
                  <Image
                    src={""}
                    alt="avatar"
                    width={300}
                    height={200}
                    style={{ width: "100%" }}
                  />
                ) : (
                  <UploadOutlined />
                )}
              </Upload>
            </Form.Item> */}
          </Form>
        </Modal>

        <div className={styles.listings}>
          {filteredListings.map((listing) => (
            <div key={listing.id} className={styles.listingItem}>
              {selectMode && (
                <Checkbox
                  checked={selectedListings.has(listing.id)}
                  onChange={() => handleSelectListing(listing.id)}
                  className={styles.checkbox}
                />
              )}
              <Image
                onClick={() => handleListingSelect(listing.id)}
                src={"/div.image-wrap.png"}
                width={300}
                height={200}
                alt={"listingimage"}
                layout="responsive"
              />
              <div className={styles.listingDetails}>
                <div
                  className={styles.dropdownContainer}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Dropdown overlay={menu(listing.id)} trigger={["click"]}>
                    <Button icon={<MoreOutlined />} />
                  </Dropdown>
                </div>
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
    </>
  );
};

export default ListingDashboard;
