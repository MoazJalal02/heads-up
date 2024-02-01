import React from 'react'
import Link from 'next/link'
import styles from './header.module.css'
import Account from './Account'
import Cart from './Cart'
import { Saira_Condensed } from 'next/font/google'
import { getCart } from '@/app/cart/actions'

const sairaCondensed = Saira_Condensed({
    weight: ["400","800"],
    subsets: ["latin"],
  })

export default async function Header() {
    const cart = await getCart()

    return (
        <header>
            <nav className={styles.nav}>
                <Link href='/' className={styles.headerLogo}>
                    <svg className={styles.logoIcon} width="111" height="71" viewBox="0 0 111 71" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M106.548 56.2222C105.144 58.7061 103.43 59.0981 102.323 59.0983H102.323L106.548 56.2222ZM106.548 56.2222C107.279 54.928 107.867 53.1897 108.258 51.0081C106.298 51.0928 100.847 51.6366 92.335 54.8399M106.548 56.2222L92.335 54.8399M92.335 54.8399C95.0332 56.3824 97.5087 57.6014 99.8857 58.5645L99.8876 58.5653C100.793 58.9338 101.611 59.0983 102.322 59.0983H102.322H102.322H102.322H102.322H102.322H102.322H102.322H102.322H102.322H102.322H102.322H102.323H102.323H102.323H102.323L92.335 54.8399ZM80.3797 33.1795C79.9563 31.5727 78.2424 25.6806 74.4075 19.3578C71.8019 15.062 68.7714 11.4982 65.4127 8.74541C61.1939 5.28771 56.4271 3.09045 51.2325 2.19582L80.3797 33.1795ZM80.3797 33.1795C76.6949 33.6406 50.609 37.1428 30.8258 46.0887C29.2965 40.5186 25.833 27.6494 23.8958 18.4606L23.8958 18.4601C22.1294 10.0939 22.8048 6.63501 23.1321 5.6184C29.2293 2.92703 36.0945 1.5 42.9913 1.5C45.775 1.5 48.5479 1.73437 51.232 2.19575L80.3797 33.1795ZM24.209 54.3741C24.5018 54.2211 24.8254 54.052 25.1697 53.8409C34.8106 48.0242 47.8066 44.0148 58.9471 41.4012C69.9146 38.8282 78.9485 37.6382 80.9335 37.3928C96.886 41.8932 103.503 45.3846 105.734 46.7785C101.401 47.0191 85.7658 49.0196 62.6991 64.7011C58.5105 67.5478 54.5145 68.9131 50.8064 68.9134C50.8064 68.9134 50.8064 68.9134 50.8063 68.9134H50.8062H50.8062H50.8061H50.806H50.806H50.8059H50.8059H50.8058H50.8057H50.8057H50.8056H50.8056H50.8055H50.8054H50.8054H50.8053H50.8052H50.8052H50.8051H50.8051H50.805H50.8049H50.8049C46.8167 68.9134 43.9946 67.3859 42.1665 66.3891L42.1663 66.389L42.131 66.3698C41.815 66.1975 41.4897 66.0201 41.2223 65.8934L41.2205 65.8926C40.6734 65.6343 39.339 64.8032 37.5283 63.6056C35.7622 62.4375 33.6481 60.9922 31.6059 59.5783C28.3915 57.3527 25.3707 55.2156 24.195 54.3814C24.1953 54.3812 24.1956 54.3811 24.1959 54.3809L24.1961 54.3808L24.209 54.3741ZM5.34148 54.0244C3.11297 48.7251 1.8515 43.5816 1.56416 38.7337L1.56416 38.7337C1.29309 34.1619 1.88247 29.8106 3.30178 25.7912C5.83655 18.6127 10.9924 12.5039 18.3131 8.11318C18.1938 11.1152 18.6279 14.8869 19.5575 19.3029L19.5576 19.3032C21.5693 28.8495 25.2197 42.3563 26.7824 48.0289C25.4402 48.7226 24.107 49.466 22.8166 50.24L22.8129 50.2422C17.1666 53.6509 12.6384 55.2339 9.27792 55.2341C9.27789 55.2341 9.27792 55.2341 9.27789 55.2341H9.2778H9.27777H9.27775H9.27772H9.27769H9.27766H9.27763H9.2776H9.27757H9.27754H9.27751H9.27748H9.27745H9.27742H9.27739H9.27736H9.27733H9.2773H9.27726C6.63494 55.2341 5.53999 54.2334 5.34148 54.0244Z" fill="#14342B" stroke="#EAF2E3" strokeWidth="3"/>
                    </svg>
                    <h1 className={`${sairaCondensed.className} ${styles.logoText}`}>Heads<span style={{color:'#A1B084'}}>Up</span></h1>
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
        </header>
    )
}
