import Image from "next/image";
import styles from "./page.module.css";
import Header from "./component/header/Header";
import Footer from "./component/footer/Footer";
import ListingComponent from "./component/listing/Listing";
import React from "react";

export default function Home() {
  return (
    <>
      <Header />
      <ListingComponent />
      <section className={styles.featuredNeighborhoodsContainer}>
        <h2 className={styles.featuredNeighborhoodsTitle}>
          FEATURED NEIGHBORHOODS
        </h2>
        <div className={styles.featuredNeighborhoods}>
          <div className={styles.neighborhoodImageContainer}>
            <Image
              src="/district/district1.png"
              alt="District 1"
              layout="fill"
            />
            <div className={styles.neighborhoodOverlay}>DISTRICT 1</div>
          </div>
          <div className={styles.neighborhoodImageContainer}>
            <Image
              src="/district/district2.png"
              alt="District 2"
              layout="fill"
            />
            <div className={styles.neighborhoodOverlay}>DISTRICT 2</div>
          </div>
          <div className={styles.neighborhoodImageContainer}>
            <Image
              src="/district/district4.png"
              alt="District 3"
              layout="fill"
            />
            <div className={styles.neighborhoodOverlay}>DISTRICT 3</div>
          </div>

          <div className={styles.neighborhoodImageContainer}>
            <Image
              src="/district/district5.png"
              alt="District 4"
              layout="fill"
            />
            <div className={styles.neighborhoodOverlay}>DISTRICT 4</div>
          </div>
          <div className={styles.neighborhoodImageContainer}>
            <Image
              src="/district/district6.png"
              alt="District 5"
              layout="fill"
            />
            <div className={styles.neighborhoodOverlay}>DISTRICT 5</div>
          </div>
          <div className={styles.neighborhoodImageContainer}>
            <Image
              src="/district/district9.png"
              alt="District 6"
              layout="fill"
            />
            <div className={styles.neighborhoodOverlay}>DISTRICT 6</div>
          </div>
        </div>
      </section>

      <div className={styles.flexContainer}>
        <div className={styles.leftColumn}>
          <div className={styles.image}>
            <Image
              src="/aboutImage.png"
              alt="Key Image"
              width={700}
              height={500}
            />
          </div>
          <div className={styles.textSection}>
            <h1>THE ECOMIND</h1>
            <p>
              Founded by Hiep Truong, one of the most recognizable faces in the
              world of real estate, The EcoMind team is one of the largest and
              most exciting luxury real estate brokerages in the country. Our
              team represents a shared enthusiasm towards people,bespoke
              properties, and of course, the Southern California lifestyle.
            </p>
            <p>
              Not only does the team continue to bring in record transactions
              year after year, ranking among Real Trends America’s Best Real
              Estate Agents for 2017, but The EcoMind Team performs under a
              “living life to the fullest” mentality, which means customer
              service is a top priority—as is staying ahead of the ever-changing
              industry.
            </p>
          </div>
        </div>
        <div className={styles.rightColumn}>
          <Image
            src="/building.png"
            alt="Building Image"
            width={600}
            height={350}
            layout="responsive"
          />
        </div>
      </div>

      <div className={styles.newsletterSection}>
        <div className={styles.newsletterContent}>
          <h2>BE IN THE KNOW. LET&apos;S STAY IN TOUCH.</h2>
          <p>
            Madison incorporated The EcoMind, Inc., enlisting a team of
            specialists who work together to make record transactions, exerting
            passion, professionalism, integrity, and uncanny industry knowledge.
            Madison’s ability to connect and communicate with a wide range of
            clientele is guided by his passion for travel and his experiences
            living in various countries, states, and cities.
          </p>
          <form className={styles.newsletterForm}>
            <input
              type="email"
              placeholder="Email"
              className={styles.newsletterInput}
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className={styles.newsletterInput}
            />
            <button type="submit" className={styles.newsletterButton}>
              SUBMIT
            </button>
          </form>
        </div>
      </div>
      <Image
        src="/workwithus.png"
        alt="workwithus"
        width={600}
        height={350}
        layout="responsive"
      />
      <main className={styles.main}></main>

      <Footer />
    </>
  );
}
