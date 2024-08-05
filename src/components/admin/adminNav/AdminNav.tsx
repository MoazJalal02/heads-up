"use client"

import Link from 'next/link'
import styles from './adminNav.module.css'
import { usePathname } from 'next/navigation'

export default function AdminNav(){

    const navLinks = [
        { id: 1, name: 'Products', path: '/admin/products' },
        { id: 1, name: 'Add Product', path: '/admin/add-product' },
        { id: 1, name: 'Users', path: '/admin/users' },
        { id: 1, name: 'Orders', path: '/admin/orders' },
    ]
    const pathname = usePathname()
    const isActive = (path:string) => path == pathname
    return (
        <nav className={styles.navContainer}>
            <ul className={styles.linksContainer}>
                { 
                
                    navLinks.map((link,i)=>{
                        return(<li key={i}><Link className={`${isActive(link.path)? styles.active:''}`}  href={link.path}>{link.name}</Link></li>)
                    })
                }
            </ul>
        </nav>
    )
}
