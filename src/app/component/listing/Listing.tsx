import Image from "next/image";
import styles from "./Listing.module.css";
import { Listing } from "./interface/listing";
import listingsData from "./listing.json";

const ListingComponent: React.FC = () => {
  const listings: Listing[] = listingsData as Listing[];

  return (
    <div className={styles.listingsContainer}>
      <h2 className={styles.title}>EXPLORE EXCLUSIVE LISTINGS</h2>
      <div className={styles.listings}>
        {listings.map((listing) => (
          <div key={listing.id} className={styles.listing}>
            <Image
              src={listing.image}
              alt={listing.description}
              width={300}
              height={200}
              layout="responsive"
            />
            <div className={styles.listingDetails}>
              <span className={styles.status}>{listing.status}</span>
              <span className={styles.price}>{listing.price}</span>
              <span className={styles.description}>{listing.description}</span>
              <span className={styles.address}>{listing.address}</span>
              <span
                className={styles.meta}
              >{`${listing.beds} BEDS | ${listing.baths} BATHS | ${listing.sqft} SQ.FT.`}</span>
            </div>
          </div>
        ))}
      </div>
      <button className={styles.viewAllButton}>VIEW ALL</button>
    </div>
  );
};

export default ListingComponent;
