"use client"

import Link from 'next/link'
import styles from './adminSidebar.module.css'
import { usePathname } from 'next/navigation'

export default function AdminSidebar(){

    const navLinks = [
        { id: 1, name: 'Products', path: '/admin/products' },
        { id: 1, name: 'Add Product', path: '/admin/add-product' },
        { id: 1, name: 'Users', path: '/admin/users' },
        { id: 1, name: 'Orders', path: '/admin/orders' },
    ]
    const pathname = usePathname()
    const isActive = (path:string) => path == pathname
    return (
        <>
            <ul className={styles.linksContainer}>
                { 
                
                    navLinks.map((link,i)=>{
                        return(<li key={i}><Link className={`${isActive(link.path)? styles.active:''}`}  href={link.path}><p>{link.name}</p></Link></li>)
                    })
                }
            </ul>
        </>
    )
}