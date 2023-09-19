import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../styles/Footer.module.scss';
import { useRouter } from 'next/router';

const Footer = () => {
    const router = useRouter();

    return (
        <>
        <footer className={styles.footer}>    

        <ul>
            <li><Link href="/mentions-legales"></Link>Mentions légales</li>
            <li>©2023 All Rights reserved</li>
            <li>Conception et développement par Guillaume Bracaval</li>
        </ul>

        </footer>
        </>
        
        
        
        
        );
    };
    
    export default Footer;
