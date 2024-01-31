import Image from 'next/image';
import Link from 'next/link';
import styles from './Header.module.css'; 

const Header = () => {
  return (
    <div className={styles.header}>
      <Image
        src='/HeaderImage.png' 
        alt='The EcoMind'
        layout='fill'
        objectFit='cover'
        quality={100}
      />
      <div className={styles.logo} >
      <Image
        src='/logo.png' 
        alt='The EcoMind'
        width={100}
        height={100}
        quality={100}
      />
      <Image
        src='/name.png' 
        alt='The EcoMind'
        width={100}
        height={100}
        quality={100}
      />
      </div>
      <div className={styles.headerContent}>
        <nav>
          <ul className={styles.navigation}>
            <li><Link legacyBehavior href="/real-estate"><a>REAL ESTATE</a></Link></li>
            <li><Link legacyBehavior href="/neighborhoods"><a>NEIGHBORHOODS</a></Link></li>
            <li><Link legacyBehavior href="/valuation"><a>VALUATION</a></Link></li>
            <li><Link legacyBehavior href="/home-search"><a>HOME SEARCH</a></Link></li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
