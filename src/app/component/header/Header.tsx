import Image from "next/image";
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
    </div>
  );
};

export default Header;
