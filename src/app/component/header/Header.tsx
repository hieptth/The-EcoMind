import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.imageContainer}>
        <Image
          src="/HeaderImage.png"
          alt="The EcoMind"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
        <h1 className={styles.overlayText}>The EcoMind</h1>
      </div>
      <div className={styles.logo}>
        <div className={styles.headerleftcontainer}>
          <Image
            src="/logo.png"
            alt="The EcoMind"
            width={60}
            height={60}
            quality={100}
          />
          <h3 className={styles.textLogo}>THE ECOMIND</h3>
        </div>
      </div>
      <div className={styles.headerContent}>
        <nav>
          <ul className={styles.navigation}>
            <li>
              <Link legacyBehavior href="/real-estate">
                <a>REAL ESTATE</a>
              </Link>
            </li>
            <li>
              <Link legacyBehavior href="/neighborhoods">
                <a>NEIGHBORHOODS</a>
              </Link>
            </li>
            <li>
              <Link legacyBehavior href="/valuation">
                <a>VALUATION</a>
              </Link>
            </li>
            <li>
              <Link legacyBehavior href="/home-search">
                <a>HOME SEARCH</a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
