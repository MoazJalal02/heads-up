import Link from 'next/link'
import styles from './header.module.css'
import Account from './components/account/Account'
import Cart from './components/cart/Cart'
import { getCart } from '@/app/cart/actions'
import Image from 'next/image'
import logo from '../../../public/assets/logoMobile.svg'

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
                <ul className={styles.headerLinks}>
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
