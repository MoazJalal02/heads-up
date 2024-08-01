import React from 'react'
import Link from 'next/link'
import styles from './header.module.css'
import Account from './components/account/Account'
import Cart from './components/cart/Cart'
import { getCart } from '@/app/cart/actions'
import Image from 'next/image'
import logo from '../../../public/assets/logoMobile.svg'
import SearchBar from './components/searchBar/SearchBar'

export default async function Header() {
    const cart = await getCart()

    return (
        <header>
            <nav className={styles.nav}>
                <Link href='/' className={styles.headerLogo}>
                    <Image 
                        alt='heads-up logo'
                        className={styles.logoIcon}
                        width={42}
                        height={736}
                        src={logo}
                    />
                    <h1 className={styles.logoText}>Heads<span style={{color:'var(--primary-green)'}}>Up</span></h1>
                </Link>
                <div className={styles.searchBarContainer}>
                    <SearchBar />
                </div>
                <ul className={styles.headerLinks}>
                    <li className={`${styles.li} ${styles.searchIcon}`}>
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.8829 17.3172L12.5724 12.0068C13.7586 10.6844 14.408 8.99423 14.408 7.20402C14.408 5.27961 13.6586 3.47061 12.2978 2.11001C10.9374 0.749402 9.12823 0 7.20402 0C5.27961 0 3.47061 0.749402 2.11001 2.11001C0.749402 3.47061 0 5.27961 0 7.20402C0 9.12823 0.749402 10.9374 2.11001 12.2978C3.47061 13.6586 5.27961 14.408 7.20402 14.408C8.99423 14.408 10.6844 13.7586 12.0068 12.5724L17.3172 17.8829C17.3954 17.9611 17.4976 18 17.6 18C17.7024 18 17.8046 17.9611 17.8829 17.8829C18.0391 17.7267 18.0391 17.4734 17.8829 17.3172ZM2.67561 11.7322C1.4662 10.5226 0.800002 8.91463 0.800002 7.20402C0.800002 5.49342 1.4662 3.88521 2.67561 2.67561C3.88501 1.466 5.49342 0.800002 7.20402 0.800002C8.91463 0.800002 10.5226 1.4662 11.7322 2.67561C12.9418 3.88501 13.608 5.49342 13.608 7.20402C13.608 8.91463 12.9418 10.5226 11.7322 11.7322C10.5226 12.9418 8.91463 13.608 7.20402 13.608C5.49342 13.608 3.88521 12.9418 2.67561 11.7322Z" fill="white"/>
                        </svg>
                    </li>
                    <li className={styles.li}>
                        <Account />
                    </li>
                    <li className={`${styles.li} ${styles.cartIconContainer}`}>
                        <Cart size={cart?cart.size:0} subtotal={cart?cart.subtotal:0}/>
                    </li>
                </ul>
            </nav>
            <nav className={styles.subHeader}>
                <Link href='/new-arrivals' >
                    <h2>NEW ARRIVALS</h2>
                </Link>
                <Link href='/brands' >
                    <h2>BRANDS</h2>
                </Link>
                <Link href='/top-deals' >
                    <h2>TOP DEALS</h2>
                </Link>
            </nav>
        </header>
    )
}
