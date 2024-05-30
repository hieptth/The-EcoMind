"use client";
import Image from "next/image";
import styles from "./listingDetail.module.css";
import Footer from "app/component/footer/Footer";
import { Navbar } from "@components";
import { HeartAdd, Facebook, Instagram } from "iconsax-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button, Row, Col } from "antd";
import modalStyles from "./Modal.module.css";
import { Property, PropertyService, PropertyStore } from "stores/propertyStore";

import MapComponent from "app/component/map/MapComponent";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useObservable } from "shared/useObservable";
import { useParams } from "next/navigation";

import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";

// install Swiper modules
const propertyImages = [
  "/propertyimage1.jpg",
  "/propertyimage2.jpg",
  "/propertyimage3.jpg",
];

const ListingDetailPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [property, setProperty] = useState<Property | null>(null);

  const { id } = useParams();
  const listings = useObservable(PropertyStore);

  useEffect(() => {
    console.log("Current ID from URL:", id); // Log the ID from URL
    console.log("Listings available:", listings); // Log the available listings

    if (id && listings) {
      const foundProperty = listings.find(
        (p) => p.id.toString() === id.toString()
      );
      console.log("Found property:", foundProperty); // Log the found property

      setProperty(foundProperty || null);
    }
  }, [id, listings]);

  const showModal = () => setIsModalVisible(true);
  const handleOk = () => setIsModalVisible(false);
  const handleCancel = () => setIsModalVisible(false);

  return (
    <>
      {/* <Navbar /> */}
      <div className={styles.container}>
        <div className={styles.slideContainer}>
          <Swiper
            modules={[Navigation, Pagination, Mousewheel, Keyboard]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            mousewheel={true}
            keyboard={true}
            style={{ width: "100%", height: "auto" }}
          >
            {propertyImages.map((imageSrc, index) => (
              <SwiperSlide className={styles.SwiperSlide} key={index}>
                <Image
                  src={imageSrc}
                  alt={`Property Image ${index + 1}`}
                  layout="responsive"
                  width={1220}
                  height={760}
                  objectFit="cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {property && (
          <>
            <div className={styles.header}>
              <h2 className={styles.price}> {property.price}</h2>
              <h1 className={styles.title}>{property?.title}</h1>
              <h2>
                {`${property?.amenities?.interior?.bedrooms} BEDS | ${property?.amenities?.interior?.bathrooms} BATHS | ${property?.amenities?.areaLot?.lotArea} AREA`}
              </h2>
              <div className={styles.belowHeader}>
                <button onClick={showModal} className={styles.buttonInquire}>
                  INQUIRE NOW
                </button>
                <Modal
                  visible={isModalVisible}
                  onOk={handleOk}
                  onCancel={handleCancel}
                  width={1200}
                  footer={null}
                  wrapClassName={modalStyles.modalCustomBody}
                >
                  <div className={modalStyles.modalContainer}>
                    <div className={modalStyles.formSection}>
                      <h1 className={modalStyles.modalTitle}>GET IN TOUCH</h1>
                      <Form layout="vertical">
                        <Row gutter={16}>
                          <Col xs={24} sm={12}>
                            <Form.Item
                              name="firstName"
                              rules={[{ required: true }]}
                            >
                              <Input placeholder="First Name" />
                            </Form.Item>
                          </Col>
                          <Col xs={24} sm={12}>
                            <Form.Item
                              name="lastName"
                              rules={[{ required: true }]}
                            >
                              <Input placeholder="Last Name" />
                            </Form.Item>
                          </Col>
                        </Row>
                        <Row gutter={16}>
                          <Col xs={24} sm={12}>
                            <Form.Item
                              name="email"
                              rules={[{ type: "email", required: true }]}
                            >
                              <Input placeholder="Email" />
                            </Form.Item>
                          </Col>
                          <Col xs={24} sm={12}>
                            <Form.Item name="phone">
                              <Input placeholder="Phone" />
                            </Form.Item>
                          </Col>
                        </Row>
                        <Form.Item name="message">
                          <Input.TextArea placeholder="Message" />
                        </Form.Item>
                        <Form.Item>
                          <button className={modalStyles.buttonSubmit}>
                            Submit
                          </button>
                        </Form.Item>
                      </Form>
                      <p style={{ color: "#aaa" }}>
                        By providing The EcoMind your contact information, you
                        acknowledge and agree to our Privacy Policy and consent
                        to receiving marketing communications...
                      </p>
                    </div>
                    <div className={modalStyles.imageSection}>
                      <div className={modalStyles.contactDetails}>
                        <h2>Contact Details</h2>
                        <p>The EcoMind Team</p>
                        <p>
                          Truong Tan Hao Hiep | hiep.truongtanhaot@gmail.com
                        </p>
                        <p>Le Phuoc Gia Loc | loc.le2502@hcmut.edu.vn</p>
                        <p>(+84) 901 392 331</p>
                        <p>team@ecomind.com</p>
                        <p>268 Ly Thuong Kiet, Ward 14</p>
                        <p>District 10, Ho Chi Minh City</p>
                        <div className={modalStyles.socialIcons}>
                          <Facebook size="24" color="#fff" />
                          <Instagram size="24" color="#fff" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Modal>
                <div className={styles.outHeartIcon}>
                  <div className={styles.heartIcon}>
                    <HeartAdd size="24" color="#8f3524" />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.content}>
              <div className={styles.row}>
                <p className={styles.heading}>DESCRIPTION</p>
                <p className={styles.description}>{property?.description}</p>
              </div>
              <div className={styles.row}>
                <p className={styles.heading}>LOCATION</p>
                <p>{property?.location}</p>
              </div>
              <div className={styles.row}>
                <p className={styles.heading}>SHARE PROPERTY</p>
                <Facebook size="32" color="#FF8A65" />
              </div>
              <div className={styles.row}>
                <p className={styles.heading}>STATUS</p>
                <p>{property?.status}</p>
              </div>
            </div>

            {/* Property amenities section */}
            <div className={styles.amenities}>
              <h3 className={styles.amenitiesTitle}>PROPERTY AMENITIES</h3>
              <p className={styles.amenitiesSubtitle}>
                View additional property information below.
              </p>
              <div className={styles.amenitiesGrid}>
                <div className={styles.interior}>
                  <h4 className={styles.amenitiesSectionTitle}>INTERIOR</h4>
                  {property &&
                    property.amenities &&
                    property.amenities.interior &&
                    Object.entries(property.amenities.interior).map(
                      ([key, value]) => (
                        <div key={key} className={styles.amenityItem}>
                          <span className={styles.amenityKey}>
                            {key.replace(/([A-Z])/g, " $1").toUpperCase()}:
                          </span>
                          <span className={styles.amenityValue}>{value}</span>
                        </div>
                      )
                    )}
                </div>

                <div className={styles.exterior}>
                  <h4 className={styles.amenitiesSectionTitle}>EXTERIOR</h4>
                  {property &&
                    property.amenities &&
                    property.amenities.exterior &&
                    Object.entries(property?.amenities?.exterior).map(
                      ([key, value]) => (
                        <div key={key} className={styles.amenityItem}>
                          <span className={styles.amenityKey}>
                            {key.replace(/([A-Z])/g, " $1").toUpperCase()}:{" "}
                          </span>
                          <span className={styles.amenityValue}>{value}</span>
                        </div>
                      )
                    )}
                </div>
                <div className={styles.areaLot}>
                  <h4 className={styles.amenitiesSectionTitle}>AREA & LOT</h4>
                  {property &&
                    property.amenities &&
                    property.amenities.areaLot &&
                    Object.entries(property?.amenities.areaLot).map(
                      ([key, value]) => (
                        <div key={key} className={styles.amenityItem}>
                          <span className={styles.amenityKey}>
                            {key.replace(/([A-Z])/g, " $1").toUpperCase()}:{" "}
                          </span>
                          <span className={styles.amenityValue}>{value}</span>
                        </div>
                      )
                    )}
                </div>
                <div className={styles.finance}>
                  <h4 className={styles.amenitiesSectionTitle}>FINANCE</h4>
                </div>
              </div>
            </div>
            {/* <MapComponent
          lat={property?.mapPosition.lat}
          lng={property?.mapPosition.lng}
          address={property?.location}
        /> */}
          </>
        )}
        <Footer />
      </div>
    </>
  );
};

export default ListingDetailPage;
