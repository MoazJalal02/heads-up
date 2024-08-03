"use client";

import Link from "next/link";
import styles from './account.module.css';
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";

export default function Account() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    const dropdownButton = dropdownRef.current;

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
        <svg className={styles.accountIcon} width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.6667 5.5C12.6667 7.98524 10.5773 10 8.00001 10C5.42268 10 3.33334 7.98524 3.33334 5.5C3.33334 3.01472 5.42268 1 8.00001 1C10.5773 1 12.6667 3.01472 12.6667 5.5Z" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M11.1295 12.25H4.87059C4.30765 12.25 4.02618 12.25 3.7744 12.3019C2.90302 12.4813 2.14952 13.1119 1.72737 14.0151C1.6054 14.276 1.51639 14.5861 1.33837 15.2063C1.12446 15.9514 1.01751 16.324 1.00305 16.6244C0.95203 17.6846 1.54621 18.6419 2.42848 18.9209C2.67854 19 3.01675 19 3.69318 19H12.3069C12.9833 19 13.3215 19 13.5715 18.9209C14.4538 18.6419 15.0479 17.6846 14.997 16.6244C14.9825 16.324 14.8755 15.9514 14.6617 15.2063C14.4836 14.5861 14.3946 14.276 14.2726 14.0151C13.8505 13.1119 13.0969 12.4813 12.2255 12.3019C11.9738 12.25 11.6924 12.25 11.1295 12.25Z" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <div className={styles.dropdown}>
        {session ? (
          <div className={styles.dropdownContent} ref={dropdownRef} style={{ display: `${isDropdownOpen ? 'block' : 'none'}` }}>
            {session.user?.role === 'Admin' ? <Link href="/admin/products">Admin</Link> : ''}
            <Link className={styles.link} href="/api/auth/signout?callbackUrl=/">Logout</Link>
          </div>
        ) : (
          <div className={styles.dropdownContent} style={{ display: `${isDropdownOpen ? 'block' : 'none'}` }}>
            <Link className={styles.link} href="/api/auth/signin?callbackUrl=/">Login</Link>
          </div>
        )}
      </div>
    </>
  );
}
