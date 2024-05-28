"use client";
import { useEffect, useState, ChangeEvent } from "react";
import Image from "next/image";
import styles from "./listingDashboard.module.css";
import { Listing } from "./interface/listing";
import { Pagination } from "antd";
import { MoreOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { UploadChangeParam } from "antd/lib/upload/interface";
import listingsData from "./listing.json";

import {
  Input,
  Slider,
  Row,
  Col,
  Select,
  Button,
  Checkbox,
  Modal,
  Upload,
  Menu,
  Form,
  message,
  Dropdown,
} from "antd";

interface ModalFormData {
  status: string;
  price: string;
  description: string;
  address: string;
  beds: number;
  baths: number;
  sqft: string;
  image?: string;
}

const ListingDashboard = () => {
  const PAGE_SIZE = 9;
  const [listings, setListings] = useState<Listing[]>(listingsData);

  // const [listings, setListings] = useState<Listing[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [propertyType, setPropertyType] = useState(undefined);
  const [bathrooms, setBathrooms] = useState(undefined);
  const [bedrooms, setBedrooms] = useState(undefined);

  const [price, setPrice] = useState<[number, number]>([1, 5]);
  const [sqft, setSqft] = useState<[number, number]>([500, 10000]);

  const [selectMode, setSelectMode] = useState(false);
  const [selectedListings, setSelectedListings] = useState(new Set<number>());

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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalFormData, setModalFormData] = useState<ModalFormData>({
    status: "",
    price: "",
    description: "",
    address: "",
    beds: 0,
    baths: 0,
    sqft: "",
  });

  const [editListingData, setEditListingData] = useState<ModalFormData>({
    status: "",
    price: "",
    description: "",
    address: "",
    beds: 0,
    baths: 0,
    sqft: "",
  });

  const [editListingId, setEditListingId] = useState<number | null>(null);

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const showModal = () => setIsModalVisible(true);
  const handleModalCancel = () => setIsModalVisible(false);
  const handleModalSubmit = () => {
    setIsModalVisible(false);
  };

  const onModalFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setModalFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onUploadChange = (info: UploadChangeParam) => {
    if (info.file.status === "done") {
      // Ensure originFileObj is not undefined before using it
      if (info.file.originFileObj) {
        console.log("File uploaded successfully:", info.file.name);
        // Create object URL only if the file object is available
        const imageUrl = URL.createObjectURL(info.file.originFileObj);
        // Example: setting imageUrl in state (adjust according to your state management)
        setEditListingData((prev) => ({ ...prev, image: imageUrl }));
        message.success(`${info.file.name} file uploaded successfully`);
      } else {
        // Handle the case where file object is undefined
        message.error("File upload failed: No file data available.");
      }
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };
  const handleEditListing = (id: number) => {
    const listingToEdit = listings.find((listing) => listing.id === id);
    if (listingToEdit) {
      setEditListingData({
        status: listingToEdit.status || "",
        price: listingToEdit.price || "",
        description: listingToEdit.description || "",
        address: listingToEdit.address || "",
        beds: listingToEdit.beds || 0,
        baths: listingToEdit.baths || 0,
        sqft: listingToEdit.sqft || "",
      });
      setEditListingId(id); // Set the current editing listing's ID
      setIsEditModalVisible(true);
    }
  };

  const handleSaveChanges = () => {
    if (editListingId == null) return;

    const updatedListings = listings.map((listing) => {
      if (listing.id === editListingId) {
        return { ...listing, ...editListingData };
      }
      return listing;
    });
    setListings(updatedListings);
    setIsEditModalVisible(false);
    setEditListingId(null);
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
                onSearch={(value) => console.log(value)}
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
              {selectMode && (
                <>
                  <Button onClick={handleSelectAll}>Select All</Button>
                  <Button onClick={handleDeleteSelected}>
                    Delete Selected
                  </Button>
                </>
              )}
              <Modal
                title="Add New Property"
                visible={isModalVisible}
                onCancel={handleModalCancel}
                onOk={handleModalSubmit}
                okText="Add Business"
                cancelText="Cancel"
              >
                <Form layout="vertical">
                  <Form.Item label="Status">
                    <Input
                      name="Status"
                      value={modalFormData.status}
                      onChange={onModalFormChange}
                    />
                  </Form.Item>
                  <Form.Item label="Price">
                    <Input
                      onChange={onModalFormChange}
                      name="Price"
                      value={modalFormData.price}
                    />
                  </Form.Item>
                  <Form.Item label="Description">
                    <Input
                      onChange={onModalFormChange}
                      name="Description"
                      value={modalFormData.description}
                    />
                  </Form.Item>
                  <Form.Item label="Address">
                    <Input
                      onChange={onModalFormChange}
                      name="address"
                      value={modalFormData.address}
                    />
                  </Form.Item>
                  <Form.Item label="Beds">
                    <Input
                      onChange={onModalFormChange}
                      name="beds"
                      value={modalFormData.beds}
                    />
                  </Form.Item>
                  <Form.Item label="Baths">
                    <Input
                      onChange={onModalFormChange}
                      name="baths"
                      value={modalFormData.baths}
                    />
                  </Form.Item>
                  <Form.Item label="Sqft">
                    <Input
                      onChange={onModalFormChange}
                      name="sqft"
                      value={modalFormData.sqft}
                    />
                  </Form.Item>
                  <Form.Item label="Logo">
                    <Upload
                      name="logo"
                      listType="picture-card"
                      className="avatar-uploader"
                      showUploadList={false}
                      beforeUpload={() => false}
                      onChange={onUploadChange}
                    >
                      {<PlusOutlined />}
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
                value={editListingData?.address}
                onChange={(e) =>
                  setEditListingData({
                    ...editListingData,
                    address: e.target.value,
                  })
                }
              />
            </Form.Item>
            <Form.Item label="Beds">
              <Input
                name="beds"
                value={editListingData?.beds}
                onChange={(e) =>
                  setEditListingData({
                    ...editListingData,
                    beds: Number(e.target.value),
                  })
                }
              />
            </Form.Item>
            <Form.Item label="Baths">
              <Input
                name="baths"
                value={editListingData?.baths}
                onChange={(e) =>
                  setEditListingData({
                    ...editListingData,
                    baths: Number(e.target.value),
                  })
                }
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
            <Form.Item label="Image">
              <Upload
                name="image"
                listType="picture-card"
                showUploadList={false}
                beforeUpload={() => false}
                onChange={onUploadChange}
              >
                {editListingData?.image ? (
                  <Image
                    src={editListingData?.image}
                    alt="avatar"
                    style={{ width: "100%" }}
                  />
                ) : (
                  <UploadOutlined />
                )}
              </Upload>
            </Form.Item>
          </Form>
        </Modal>

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
