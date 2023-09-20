import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../styles/Projet.module.scss';
import { useRouter } from 'next/router';

const Projet = () => {
    const router = useRouter();

    return (
        <>
        <div className={styles.wrap}>
            <div><img src="https://zupimages.net/up/23/32/gpcr.png" alt="" /></div>
            <div>test</div>
            <div></div>
        </div>
        </>
        
        
        
        
        );
    };
    
    export default Projet;
