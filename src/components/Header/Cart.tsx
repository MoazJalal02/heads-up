"use client"

import Link from "next/link"
import styles from './cart.module.css'
import { useEffect, useRef, useState } from "react"
import { useSession } from "next-auth/react"


type cartProps = {
    size: number
    subtotal: number
}
export default function Cart({ size, subtotal } : cartProps) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { data: session } = useSession();

    useEffect(() => {
        const handleDocumentClick = (event: MouseEvent) => {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsDropdownOpen(false);
          }
        };

        const dropdownButton = dropdownRef.current

        if (dropdownButton) {
          dropdownButton.addEventListener('click', () => {
            setIsDropdownOpen(!isDropdownOpen);
          });
        }

        document.addEventListener('click', handleDocumentClick);

        return () => {
          if (dropdownButton) {
            dropdownButton.removeEventListener('click', () => {
              setIsDropdownOpen(!isDropdownOpen);
            });
          }
          document.removeEventListener('click', handleDocumentClick);
      };
    }, [isDropdownOpen]);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
      };
    
    return (
        <>
            <button className={styles.button} onClick={() => toggleDropdown()}>
                <svg className={styles.cartIcon} width="38" height="42" viewBox="0 0 38 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M38 36.2793L35.2632 9.13266C35.214 8.59544 34.7021 8.1882 34.0819 8.1882H28.313C28.3031 3.67386 24.129 0 19 0C13.871 0 9.69689 3.67386 9.68705 8.1882H3.91813C3.30777 8.1882 2.79585 8.59544 2.73679 9.13266L0 36.2793C0 36.314 0 36.34 0 36.3747C0 39.3987 3.1601 41.8595 7.03886 41.8595H30.9611C34.8399 41.8595 38 39.3987 38 36.3747C38 36.34 38 36.314 38 36.2793ZM19 2.07954C22.8295 2.07954 25.9404 4.81761 25.9503 8.1882H12.0497C12.0596 4.81761 15.1705 2.07954 19 2.07954ZM30.9611 39.7712H7.03886C4.47927 39.7712 2.39223 38.2722 2.36269 36.4093L5.00104 10.2677H9.68705V13.9156C9.68705 14.4875 10.2187 14.9554 10.8684 14.9554C11.5181 14.9554 12.0497 14.4875 12.0497 13.9156V10.2677H25.9503V13.9156C25.9503 14.4875 26.4819 14.9554 27.1316 14.9554C27.7813 14.9554 28.313 14.4875 28.313 13.9156V10.2677H32.999L35.6373 36.418C35.6078 38.2722 33.5207 39.7712 30.9611 39.7712Z" fill="#EAF2E3"/>
                </svg>
                <span className={styles.cartSize}>{size}</span>
            </button>
            <div className={styles.dropdown}>
                <div className={styles.dropdownContent} ref={dropdownRef} style={{ display: `${isDropdownOpen ? 'block' : 'none'}` }}>
                    <h5>Cart</h5>
                    <hr className={styles.line}></hr>
                    <div className={styles.dropdownBottom}>
                        <div className={styles.cartInfo}>
                            <h5>Items: <span className={styles.asp}>{size}</span></h5>
                            <h5>Subtotal: <span className={styles.asp}>${subtotal}</span></h5>
                        </div>
                        <Link className={styles.linkButton} href="/cart">View Cart</Link>
                    </div>
                </div>
            </div>
        </>
      )
}