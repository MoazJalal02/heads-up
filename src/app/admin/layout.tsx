import AdminNav from '@/components/adminNav/AdminNav'
import styles from './layout.module.css'
import { Saira_Condensed } from 'next/font/google'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/nextAuthOptions'
import { redirect } from 'next/navigation'

const sairaCondensed = Saira_Condensed({
    weight: ["400","600","700"],
    subsets: ["latin"],
})



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
            <>
                <header className={styles.header}>
                    <h1 className={sairaCondensed.className}>Admin Center</h1>
                    <AdminNav />
                </header>
                {children}
            </>
        )
}