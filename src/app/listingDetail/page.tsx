import Image from "next/image";
import styles from "./listingDetail.module.css";
import Footer from "app/component/footer/Footer";

const propertyMock = {
  id: "1",
  imageUrl: "/listingdetail.png",
  title: "213 NOWHERE, NOPLACE",
  price: "$59,500,000",
  description:
    "A multi-generational compound with a global architectural pedigree is  museums.",
  location: "48100 Pacific Coast Hwy, Malibu, CA 90265",
  status: "For Sale",
  amenities: {
    interior: {
      Kitchen: "Island, Open to Family Room, Stone Countertops",
      Laundryroom: "None",
      Fireplace: "None",
      Appliances: "None",
      Flooring: "None",
      TotalBedrooms: "None",
      Other: "None",
    },
    exterior: {
      Stories: "2",
      Pool: "None",
      Airconditioning: "None",
      Heattype: "None",
      WaterSource: "None",
      GarageSpace: "None",
      SecurityFeatures: "None",
      Sewer: "None",
      Other: "None",
      Parking: "None",
      LotFeatures: "None",
      Roof: "None",
    },
    areaLot: {
      LotArea: "2",
      Livingarea: "None",
      YearBuilt: "None",
      ViewDescription: "None",
      ArchitectureStyles: "None",
      Status: "None",
    },
    finance: {
      SalesPrice: "$59,500,000",
    },
  },
  areaLot: "8280 Acres",
  // mapUrl: "/path-to-map-image.jpg",
};

const ListingDetailPage = () => {
  return (
    <div className={styles.container}>
      <Image
        src={propertyMock.imageUrl}
        alt={propertyMock.title}
        layout="responsive"
        width={1220}
        height={768}
        objectFit="cover"
      />
      <div className={styles.header}>
        <h1 className={styles.title}>{propertyMock.title}</h1>
        <h2 className={styles.price}>{propertyMock.price}</h2>
      </div>
      <div className={styles.content}>
        <div className={styles.leftColumn}>
          <p className={styles.heading}>DESCRIPTION</p>
          <p className={styles.heading}>LOCATION</p>
          <p className={styles.heading}>SHARE PROPERTY</p>
          <p className={styles.heading}>STATUS</p>
        </div>
        <div className={styles.rightColumn}>
          <div className={styles.detailSection}>
            <p className={styles.description}>{propertyMock.description}</p>
          </div>
          <div className={styles.detailSection}>
            <p>{propertyMock.location}</p>
          </div>
          <div className={styles.detailSection}>
            <p>{propertyMock.location}</p>
          </div>
          <div className={styles.detailSection}>
            <p>{propertyMock.status}</p>
          </div>
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
            {Object.entries(propertyMock.amenities.interior).map(
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
            {Object.entries(propertyMock.amenities.exterior).map(
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
          <div className={styles.areaLot}>
            <h4 className={styles.amenitiesSectionTitle}>AREA & LOT</h4>
            {Object.entries(propertyMock.amenities.areaLot).map(
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
          <div className={styles.finance}>
            <h4 className={styles.amenitiesSectionTitle}>FINANCE</h4>
            {Object.entries(propertyMock.amenities.finance).map(
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
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ListingDetailPage;
