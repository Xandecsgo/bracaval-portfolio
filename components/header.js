import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../styles/Header.module.scss';
import { useRouter } from 'next/router';

const Header = () => {
    const router = useRouter();

    const [isActive, setIsActive] = useState(false);
    const [prevScrollY, setPrevScrollY] = useState(0);
    const [transitionY, setTransitionY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;

            // Check if the user is scrolling down
            if (scrollY > prevScrollY) {
                // Smoothly increase transitionY when scrolling down
                setTransitionY(Math.min(200, transitionY + (scrollY - prevScrollY)));
            } else {
                // Smoothly decrease transitionY when scrolling up
                setTransitionY(Math.max(0, transitionY + (scrollY - prevScrollY)));
            }

            setIsActive(scrollY > prevScrollY);
            setPrevScrollY(scrollY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [prevScrollY, transitionY]);


    // BURGER
    const [isOpenNav, setIsOpenNav] = useState(false);

    const toggleNav = () => {
        setIsOpenNav(!isOpenNav);
    }
    const closeMobileMenu = () => {
        setIsOpenNav(false);
    }

    return (
        <>
            <div className={styles.mobi}>

                <div className={styles.logo}>
                    <ul>
                        <li><Link href="/">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="31"
                                height="48.2"
                            >
                                <path className="cls-2" d="m30.43,32.17l-16.47,2.02.57,4.89,16.47-2.02-.57-4.89Z" />
                                <path className="cls-2" d="m22.44,5.48l2.05,17.49-17.09,2.1L5.35,7.58l17.09-2.1ZM26.65,0L0,3.28l3.2,27.27,26.65-3.28L26.65,0Z" />
                                <path className="cls-2" d="m26.65,0l-10.18,1.25,1.22,10.42,10.18-1.25L26.65,0Z" />
                            </svg>
                        </Link></li>
                    </ul>
                </div>
            </div>
            <div className={isOpenNav ? styles.mobileMenu + ' ' + styles.mobileMenuOpen : styles.mobileMenu} onClick={toggleNav}><span></span></div>

            <header
                className={`
        ${styles.header} 
        ${isOpenNav ? styles.headerMobileOpen : ''}
      `}>



                <nav>
                    <ul>
                        <li onClick={closeMobileMenu}><Link href="/">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="31"
                                height="48.2"
                            >
                                <path className="cls-2" d="m30.43,32.17l-16.47,2.02.57,4.89,16.47-2.02-.57-4.89Z" />
                                <path className="cls-2" d="m22.44,5.48l2.05,17.49-17.09,2.1L5.35,7.58l17.09-2.1ZM26.65,0L0,3.28l3.2,27.27,26.65-3.28L26.65,0Z" />
                                <path className="cls-2" d="m26.65,0l-10.18,1.25,1.22,10.42,10.18-1.25L26.65,0Z" />
                            </svg>
                        </Link></li>
                    </ul>

                    <ul>
                        <li onClick={closeMobileMenu}><Link href="#apropos"></Link>À propos</li>
                        <li onClick={closeMobileMenu}><Link href="#portfolio"></Link>Portfolio</li>
                        <li onClick={closeMobileMenu}><Link href="#conception"></Link>Processus de conception</li>
                        <li onClick={closeMobileMenu}><Link href="blog"></Link>Blog</li>
                    </ul>

                    <ul>
                        <li onClick={closeMobileMenu}><Link href="/contact">Contact</Link></li>
                        <li onClick={closeMobileMenu}><Link href="https://www.linkedin.com/in/guillaume-bracaval-4507391b2/" target="_blank">Linkedin</Link></li>
                    </ul>

                    <div className={styles.shape} style={{
                        transform: `translateY(-${transitionY}px)`
                    }}>
                        <div className={styles.shape}>
                            <svg>
                                <path d="M43.6923 366L0 2.03333L1136 0V234.85L43.6923 366Z" fill="#032D2D" />
                            </svg>



                            <Link href="/contact">Contact</Link>
                            <Link href="https://www.linkedin.com/in/guillaume-bracaval-4507391b2/" target="_blank">Linkedin</Link>
                        </div>


                    </div>

                </nav>
            </header>
        </>




    );
};

export default Header;




