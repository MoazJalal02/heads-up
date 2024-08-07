"use client"

import Link from 'next/link'
import styles from './adminSidebar.module.css'
import { usePathname } from 'next/navigation'

export default function AdminSidebar(){

    const navLinks = [
        { id: 1, name: 'Manage Products', path: '/admin/manage-products' },
        { id: 2, name: 'Add Product', path: '/admin/add-product' },
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