import Image from "next/image";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.newsletterContainer}>
        <h2 className={styles.newsletterHeading}>
          SUBSCRIBE TO OUR NEWSLETTER
        </h2>
        <p className={styles.newsletterText}>
          For exclusive news and market updates sign up for our newsletter.
        </p>
        <form className={styles.newsletterForm}>
          <input
            type="email"
            placeholder="Your email address"
            className={styles.newsletterInput}
            required
          />
          <button type="submit" className={styles.newsletterButton}>
            SUBSCRIBE
          </button>
        </form>
      </div>
      <div className={styles.footerContent}>
        <div className={styles.contactSection}>
          <Image
            src="/logo.png"
            alt="The EcoMind Logo"
            width={100}
            height={100}
          />
          <div className={styles.contactDetails}>
            <h2>THE ECOMIND TEAM</h2>
            <p>(+84) 901 392 331</p>
            <p>team@ecomind.com</p>
          </div>
        </div>

        <div className={styles.addressSection}>
          <h2>ADDRESS</h2>
          <p>268 Ly Thuong Kiet, Ward 14,</p>
          <p>District 10, Ho Chi Minh City</p>
        </div>

        <nav className={styles.navigation}>
          <ul>
            <li>HOME</li>
            <li>MEET THE TEAM</li>
            <li>NEIGHBORHOODS</li>
            <li>CONTACT US</li>
          </ul>
        </nav>

        <div className={styles.socialSection}>
          <Image src="/facebook.png" alt="Facebook" width={24} height={24} />
          <Image src="/instagram.png" alt="Instagram" width={24} height={24} />
        </div>
      </div>

      <div className={styles.disclaimer}>
        <p>
          The EcoMind is a team of real estate agents affiliated. The EcoMind is
          a licensed real estate broker licensed by the state of California and
          abides by equal housing opportunity laws. All material presented
          herein is intended for measurements and square footages are
          approximate. This is not intended to solicit property already listed.
          Nothing herein shall be construed as legal, accounting or other
          professional advice outside the realm of real estate. informational
          purposes only. Information is compiled from sources deemed reliable
          but is subject to errors, omissions, changes in price, condition,
          sale, or withdrawal without notice.{" "}
        </p>
      </div>

      <div className={styles.footerBottom}>
        <div className={styles.logos}>
          <Image src="/realtorlogo.png" alt="Realtor" width={50} height={50} />
        </div>
        <div className={styles.poweredBy}>Powered by Loc Le</div>
        <div className={styles.copyRight}>
          Copyright © 2023 | Privacy Policy
        </div>
      </div>
    </footer>
  );
};

export default Footer;
