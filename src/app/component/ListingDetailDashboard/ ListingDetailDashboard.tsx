// ListingDetailDashboard.tsx
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./ListingDetailDashboard.module.css";
import MapComponent from "../map/MapComponent";

// Assuming Property type is defined in your store
import { Property } from "stores/propertyStore";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Button, Modal, Spin, Tooltip } from "antd";
import { Back } from "iconsax-react";
import Link from "next/link";

interface ListingDetailDashboardProps {
  property: Property;
  goBack: () => void;
}

const ListingDetailDashboard: React.FC<ListingDetailDashboardProps> = ({
  property,
  goBack,
}) => {
  const geminiRef = useRef<GoogleGenerativeAI | null>(null);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [ads, setAds] = React.useState<string | null>(null);
  const [showTooltip, setShowTooltip] = React.useState(false);

  useEffect(() => {
    if (!geminiRef.current) {
      const apiKey: string = "AIzaSyALck7ko4DXXWwQFj7lRHDKIa0H84SB3Vk";
      geminiRef.current = new GoogleGenerativeAI(apiKey);
    }
  }, []);

  useEffect(() => {
    console.log("Generated Ads:", ads);
  }, [ads]);

  const generateAds = async () => {
    if (!geminiRef.current) {
      console.error("Gemini model not initialized.");
      return;
    }

    setModalOpen(true);

    try {
      const model = geminiRef.current.getGenerativeModel({
        model: "gemini-pro",
      });
      console.log("property", property);

      const result = await model.generateContent(
        "hello, I have this property for sale. Please help me generate a good advertisement for it. Here is my property details: " +
          JSON.stringify(property)
      );
      setAds(result.response.text());
    } catch (error) {
      console.error("Error while generating ads:", error);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <Image
            src={"/propertyimage1.jpg"}
            alt={property.title}
            width={600}
            height={400}
            layout="responsive"
          />
          <MapComponent
            lat={property.mapPosition?.lat}
            lng={property.mapPosition?.lng}
            address={property.location}
          />
        </div>
        <div className={styles.rightSection}>
          <div className={styles.header}>
            <h1 className={styles.title}>{property.title}</h1>
            <div onClick={() => goBack()} style={{ cursor: "pointer" }}>
              <Back size="32" color="#FF8A65" />
            </div>
          </div>
          <p className={styles.description}>{property.description}</p>
          <div className={styles.propertyInfo}>
            <h2>PROPERTY INFORMATION</h2>
            <ul>
              <li>Price: ${property.price}</li>
              <li>Status: {property.status}</li>
              <li>Location: {property.location}</li>
              <li>Area: {property.sqft} sqft</li>
              <li>Bedrooms: {property.amenities?.interior?.bedrooms}</li>
              <li>Bathrooms: {property.amenities?.interior?.bathrooms}</li>
              <li>Year Built: {property.amenities?.areaLot?.yearBuilt}</li>
              <li>Living Area: {property?.amenities?.areaLot?.livingArea}</li>
              <li>Lot Area: {property?.amenities?.areaLot?.lotArea} acres</li>
            </ul>
          </div>
          <div className={styles.feature}>
            <div className={styles.interiorFeature}>
              <h2 className={styles.subheader}>Interior Features</h2>
              <ul className={styles.featuresList}>
                <li>Kitchen: {property?.amenities?.interior?.kitchen}</li>
                <li>Laundry: {property?.amenities?.interior?.laundry}</li>
                <li>Fireplace: {property?.amenities?.interior?.fireplace}</li>
                <li>Appliances: {property?.amenities?.interior?.appliances}</li>
                <li>Flooring: {property?.amenities?.interior?.flooring}</li>
              </ul>
            </div>
            <div className={styles.exteriorFeature}>
              <h2 className={styles.subheader}>Exterior Features</h2>
              <ul className={styles.featuresList}>
                <li>Stories: {property?.amenities?.exterior?.stories}</li>
                <li>Pool: {property?.amenities?.exterior?.pool}</li>
                <li>Heat: {property?.amenities?.exterior?.heat}</li>
                <li>Garage: {property?.amenities?.exterior?.garage}</li>
                <li>Security: {property?.amenities?.exterior?.security}</li>
                <li>Sewer: {property?.amenities?.exterior?.sewer}</li>
                <li>Parking: {property?.amenities?.exterior?.parking}</li>
                <li>Roof: {property?.amenities?.exterior?.roof}</li>
              </ul>
            </div>
          </div>

          <div className={styles.buttonContainer}>
            <button
              className={styles.generateButton}
              onClick={() => generateAds()}
            >
              Generate Ads
            </button>
            <button
              className={styles.editButton}
              onClick={() => console.log("Edit Clicked")}
            >
              Edit
            </button>
          </div>
        </div>
      </div>

      <Modal
        title="Generated Ads Content"
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={[
          <Tooltip
            key="tooltip_key"
            open={showTooltip}
            arrow={false}
            title="Copied to clipboard!"
            style={{ marginBottom: "4px" }}
          >
            <Button
              key="submit"
              type="primary"
              onClick={() => {
                setShowTooltip(true);
                navigator.clipboard.writeText(ads || "").then(
                  function () {
                    console.log("Async: Copying to clipboard was successful!");
                  },
                  function (err) {
                    console.error("Async: Could not copy text: ", err);
                  }
                );

                setTimeout(() => {
                  setShowTooltip(false);
                }, 1000);
              }}
            >
              Copy to Clipboard
            </Button>
            ,
          </Tooltip>,
        ]}
      >
        <div className={styles.modalContent}>
          {ads ? (
            ads?.split("\n").map((line, index) => (
              <p key={index}>
                {line}
                <br />
              </p>
            ))
          ) : (
            <div className="spinner-container">
              <Spin />
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default ListingDetailDashboard;
