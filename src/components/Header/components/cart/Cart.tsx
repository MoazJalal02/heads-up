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
                <svg className={styles.cartIcon} width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 15.2755L14.8477 3.84533C14.8269 3.61913 14.6114 3.44766 14.3503 3.44766H11.9212C11.9171 1.54689 10.1596 0 8 0C5.84041 0 4.0829 1.54689 4.07876 3.44766H1.64974C1.39275 3.44766 1.1772 3.61913 1.15233 3.84533L0 15.2755C0 15.2901 0 15.3011 0 15.3156C0 16.5889 1.33057 17.625 2.96373 17.625H13.0363C14.6694 17.625 16 16.5889 16 15.3156C16 15.3011 16 15.2901 16 15.2755ZM8 0.875597C9.61244 0.875597 10.9223 2.02847 10.9264 3.44766H5.07357C5.07772 2.02847 6.38756 0.875597 8 0.875597ZM13.0363 16.7458H2.96373C1.88601 16.7458 1.00725 16.1146 0.994819 15.3302L2.1057 4.32326H4.07876V5.8592C4.07876 6.09999 4.30259 6.297 4.57617 6.297C4.84974 6.297 5.07357 6.09999 5.07357 5.8592V4.32326H10.9264V5.8592C10.9264 6.09999 11.1503 6.297 11.4238 6.297C11.6974 6.297 11.9212 6.09999 11.9212 5.8592V4.32326H13.8943L15.0052 15.3339C14.9927 16.1146 14.114 16.7458 13.0363 16.7458Z" fill="white"/>
                </svg>
                <span className={styles.cartSize}>{size}</span>
            </button>
            <div className={styles.dropdown}>
                <div className={styles.dropdownContent} ref={dropdownRef} style={{ display: `${isDropdownOpen ? 'block' : 'none'}` }}>
                    <p>Cart</p>
                    <hr className={styles.line}></hr>
                    <div className={styles.dropdownBottom}>
                        <div className={styles.cartInfo}>
                            <p className={styles.grayText}>Items: <span className={styles.blackText}>{size}</span></p>
                            <p className={styles.grayText}>Subtotal: <span className={styles.blackText}>${subtotal}</span></p>
                        </div>
                        <Link className={styles.linkButton} href="/cart"><h3>View Cart</h3></Link>
                    </div>
                </div>
            </div>
        </>
      )
}