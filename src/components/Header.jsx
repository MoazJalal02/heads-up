import React from 'react'
import Link from 'next/link'
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
            <nav>
                <Link href='/' className='header--logo'>
                    <svg className='logo--icon' width="111" height="71" viewBox="0 0 111 71" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M106.548 56.2222C105.144 58.7061 103.43 59.0981 102.323 59.0983H102.323L106.548 56.2222ZM106.548 56.2222C107.279 54.928 107.867 53.1897 108.258 51.0081C106.298 51.0928 100.847 51.6366 92.335 54.8399M106.548 56.2222L92.335 54.8399M92.335 54.8399C95.0332 56.3824 97.5087 57.6014 99.8857 58.5645L99.8876 58.5653C100.793 58.9338 101.611 59.0983 102.322 59.0983H102.322H102.322H102.322H102.322H102.322H102.322H102.322H102.322H102.322H102.322H102.322H102.323H102.323H102.323H102.323L92.335 54.8399ZM80.3797 33.1795C79.9563 31.5727 78.2424 25.6806 74.4075 19.3578C71.8019 15.062 68.7714 11.4982 65.4127 8.74541C61.1939 5.28771 56.4271 3.09045 51.2325 2.19582L80.3797 33.1795ZM80.3797 33.1795C76.6949 33.6406 50.609 37.1428 30.8258 46.0887C29.2965 40.5186 25.833 27.6494 23.8958 18.4606L23.8958 18.4601C22.1294 10.0939 22.8048 6.63501 23.1321 5.6184C29.2293 2.92703 36.0945 1.5 42.9913 1.5C45.775 1.5 48.5479 1.73437 51.232 2.19575L80.3797 33.1795ZM24.209 54.3741C24.5018 54.2211 24.8254 54.052 25.1697 53.8409C34.8106 48.0242 47.8066 44.0148 58.9471 41.4012C69.9146 38.8282 78.9485 37.6382 80.9335 37.3928C96.886 41.8932 103.503 45.3846 105.734 46.7785C101.401 47.0191 85.7658 49.0196 62.6991 64.7011C58.5105 67.5478 54.5145 68.9131 50.8064 68.9134C50.8064 68.9134 50.8064 68.9134 50.8063 68.9134H50.8062H50.8062H50.8061H50.806H50.806H50.8059H50.8059H50.8058H50.8057H50.8057H50.8056H50.8056H50.8055H50.8054H50.8054H50.8053H50.8052H50.8052H50.8051H50.8051H50.805H50.8049H50.8049C46.8167 68.9134 43.9946 67.3859 42.1665 66.3891L42.1663 66.389L42.131 66.3698C41.815 66.1975 41.4897 66.0201 41.2223 65.8934L41.2205 65.8926C40.6734 65.6343 39.339 64.8032 37.5283 63.6056C35.7622 62.4375 33.6481 60.9922 31.6059 59.5783C28.3915 57.3527 25.3707 55.2156 24.195 54.3814C24.1953 54.3812 24.1956 54.3811 24.1959 54.3809L24.1961 54.3808L24.209 54.3741ZM5.34148 54.0244C3.11297 48.7251 1.8515 43.5816 1.56416 38.7337L1.56416 38.7337C1.29309 34.1619 1.88247 29.8106 3.30178 25.7912C5.83655 18.6127 10.9924 12.5039 18.3131 8.11318C18.1938 11.1152 18.6279 14.8869 19.5575 19.3029L19.5576 19.3032C21.5693 28.8495 25.2197 42.3563 26.7824 48.0289C25.4402 48.7226 24.107 49.466 22.8166 50.24L22.8129 50.2422C17.1666 53.6509 12.6384 55.2339 9.27792 55.2341C9.27789 55.2341 9.27792 55.2341 9.27789 55.2341H9.2778H9.27777H9.27775H9.27772H9.27769H9.27766H9.27763H9.2776H9.27757H9.27754H9.27751H9.27748H9.27745H9.27742H9.27739H9.27736H9.27733H9.2773H9.27726C6.63494 55.2341 5.53999 54.2334 5.34148 54.0244Z" fill="#14342B" stroke="#EAF2E3" strokeWidth="3"/>
                    </svg>
                    <h1 className={`${sairaCondensed.className} logo--text`}>Heads<span style={{color:'#A1B084'}}>Up</span></h1>
                </Link>
                <ul className='header--links'>
                    <li>
                        <Link href="/sign-in">
                            Account
                            <svg className='account--icon' width="36" height="48" viewBox="0 0 36 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M29.3333 12.3333C29.3333 18.5924 24.2591 23.6667 18 23.6667C11.7408 23.6667 6.66666 18.5924 6.66666 12.3333C6.66666 6.0741 11.7408 1 18 1C24.2591 1 29.3333 6.0741 29.3333 12.3333Z" stroke="#EAF2E3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M25.6001 29.3333H10.4C9.03287 29.3333 8.3493 29.3333 7.73784 29.4639C5.62162 29.9158 3.79169 31.5039 2.76647 33.7788C2.47025 34.4359 2.2541 35.2167 1.82176 36.7787C1.30227 38.6553 1.04254 39.5937 1.0074 40.3504C0.883501 43.0206 2.32652 45.4315 4.46917 46.1341C5.07646 46.3333 5.89782 46.3333 7.54058 46.3333H28.4595C30.1023 46.3333 30.9237 46.3333 31.5308 46.1341C33.6734 45.4315 35.1164 43.0206 34.9926 40.3504C34.9575 39.5937 34.6977 38.6553 34.1783 36.7787C33.7459 35.2167 33.5298 34.4359 33.2334 33.7788C32.2083 31.5039 30.3782 29.9158 28.262 29.4639C27.6506 29.3333 26.9672 29.3333 25.6001 29.3333Z" stroke="#EAF2E3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </Link>
                    </li>
                    <li className='cart--icon-container'>
                        <Link href="/cart">
                            Cart
                            <svg className='cart--icon' width="38" height="42" viewBox="0 0 38 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M38 36.2793L35.2632 9.13266C35.214 8.59544 34.7021 8.1882 34.0819 8.1882H28.313C28.3031 3.67386 24.129 0 19 0C13.871 0 9.69689 3.67386 9.68705 8.1882H3.91813C3.30777 8.1882 2.79585 8.59544 2.73679 9.13266L0 36.2793C0 36.314 0 36.34 0 36.3747C0 39.3987 3.1601 41.8595 7.03886 41.8595H30.9611C34.8399 41.8595 38 39.3987 38 36.3747C38 36.34 38 36.314 38 36.2793ZM19 2.07954C22.8295 2.07954 25.9404 4.81761 25.9503 8.1882H12.0497C12.0596 4.81761 15.1705 2.07954 19 2.07954ZM30.9611 39.7712H7.03886C4.47927 39.7712 2.39223 38.2722 2.36269 36.4093L5.00104 10.2677H9.68705V13.9156C9.68705 14.4875 10.2187 14.9554 10.8684 14.9554C11.5181 14.9554 12.0497 14.4875 12.0497 13.9156V10.2677H25.9503V13.9156C25.9503 14.4875 26.4819 14.9554 27.1316 14.9554C27.7813 14.9554 28.313 14.4875 28.313 13.9156V10.2677H32.999L35.6373 36.418C35.6078 38.2722 33.5207 39.7712 30.9611 39.7712Z" fill="#EAF2E3"/>
                            </svg>
                        </Link>
                        <span className='cart--size'>{cart?cart.size:0}</span>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
