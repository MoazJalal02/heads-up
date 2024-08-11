'use client'

import Link from 'next/link'
import styles from './subheader.module.css'
import { useParams, usePathname } from 'next/navigation'
export default function Subheader() {
  const path = usePathname()
  const { id } = useParams()

  return (
    path != `/products/${id}` && path != `/cart`? 
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
    </nav>: <></>
  )
}
