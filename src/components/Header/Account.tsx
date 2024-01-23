"use client"
import Link from "next/link"
import styles from './account.module.css'
import { Session } from "next-auth"
import { useEffect, useRef, useState } from "react"
import { signIn } from "next-auth/react"

export default function Account({ session } : { session: Session }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null);

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
                Account
                <svg className='account--icon' width="36" height="48" viewBox="0 0 36 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M29.3333 12.3333C29.3333 18.5924 24.2591 23.6667 18 23.6667C11.7408 23.6667 6.66666 18.5924 6.66666 12.3333C6.66666 6.0741 11.7408 1 18 1C24.2591 1 29.3333 6.0741 29.3333 12.3333Z" stroke="#EAF2E3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M25.6001 29.3333H10.4C9.03287 29.3333 8.3493 29.3333 7.73784 29.4639C5.62162 29.9158 3.79169 31.5039 2.76647 33.7788C2.47025 34.4359 2.2541 35.2167 1.82176 36.7787C1.30227 38.6553 1.04254 39.5937 1.0074 40.3504C0.883501 43.0206 2.32652 45.4315 4.46917 46.1341C5.07646 46.3333 5.89782 46.3333 7.54058 46.3333H28.4595C30.1023 46.3333 30.9237 46.3333 31.5308 46.1341C33.6734 45.4315 35.1164 43.0206 34.9926 40.3504C34.9575 39.5937 34.6977 38.6553 34.1783 36.7787C33.7459 35.2167 33.5298 34.4359 33.2334 33.7788C32.2083 31.5039 30.3782 29.9158 28.262 29.4639C27.6506 29.3333 26.9672 29.3333 25.6001 29.3333Z" stroke="#EAF2E3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
            <div className={styles.dropdown}>
            {session ? (
                    <div className={styles.dropdownContent} ref={dropdownRef} style={{ display: `${isDropdownOpen ? 'block' : 'none'}` }}>
                    {session?.user?.role === "Admin" && <Link href="/admin">Admin</Link>}
                    <Link className={styles.link} href="/api/auth/signout?callbackUrl=/">Logout</Link>
                    </div>
                ) : (
                    <div className={styles.dropdownContent} style={{ display: `${isDropdownOpen ? 'block' : 'none'}` }}>
                    <Link className={styles.link} href="/api/auth/signin?callbackUrl=/">Login</Link>
                    </div>
                )}
            </div>
        </>
    )
}
