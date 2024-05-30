// ListingDetailDashboard.tsx
import React from "react";
import Image from "next/image";
import styles from "./ListingDetailDashboard.module.css";
import MapComponent from "../map/MapComponent";

// Assuming Property type is defined in your store
import { Property } from "stores/propertyStore";

interface ListingDetailDashboardProps {
  property: Property;
}

const ListingDetailDashboard: React.FC<ListingDetailDashboardProps> = ({
  property,
}) => {
  return (
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
        <h1 className={styles.header}>{property.title}</h1>
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
            onClick={() => console.log("Generate Ads Clicked")}
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
  );
};

export default ListingDetailDashboard;
