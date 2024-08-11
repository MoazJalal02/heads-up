import styles from './emptyCart.module.css'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/nextAuthOptions'

export default async function EmptyCart() {
    const session = await getServerSession(authOptions)

    return (
        <div className={styles.container}>
            <h1>YOUR CART IS EMPTY</h1>
            <div className={styles.linksSection}>
                <h3>Fill it with our latest deals!</h3>
                <Link href='/top-deals' className={`${styles.link} ${styles.shoppingLink}`}><h2>Continue Shopping</h2></Link>
            </div>
            { !session && 
                <div className={styles.linksSection}>
                <h3>Or sign in to your cart</h3>
                <Link href='/api/auth/signin?callbackUrl=/' className={`${styles.link} ${styles.signInLink}`}><h2>Sign in</h2></Link>
                </div>
            }
        </div>
    )
}
