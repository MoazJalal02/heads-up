import AdminNav from '@/components/admin/adminNav/AdminNav'
import styles from './layout.module.css'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/nextAuthOptions'
import { redirect } from 'next/navigation'
import AdminSidebar from '@/components/admin/adminSidebar/AdminSidebar'

export const metadata = {
    title: "Heads Up Admin Center",
    description: "Admin Center description"
}


export default async function AdminLayout({
    children,
    }: {
    children: React.ReactNode
    }) 
    {
        const session = await getServerSession(authOptions)
        if(session){
            if(session.user.role != 'Admin'){
                redirect('/denied')
            }
        }    
        else {
            redirect('/api/auth/signin?callbackUrl=/admin/add-product')
        }

        return (
            <main className={styles.container}>
                <nav className={styles.navContainer}>
                    <AdminNav />
                    <AdminSidebar />
                </nav>
                <section className={styles.contentContainer}>
                    <h1>Admin Center</h1>
                    {children}
                </section>
            </main>
        )
}