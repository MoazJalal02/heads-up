import styles from './emptyCart.module.css'
import Link from 'next/link'
import { Saira_Condensed } from 'next/font/google'

const sairaCondensed = Saira_Condensed({
    weight: ["400","600","700"],
    subsets: ["latin"],
})

export default function EmptyCart() {
    return (
        <div className={styles.container}>
            <h2 className={`${sairaCondensed.className} ${styles.headText}`}>Your cart is empty </h2>
            <div className={styles.linkSection}>
                <h5 className={`${sairaCondensed.className} ${styles.subText}`}>Fill it with our latest deals!</h5>
                <Link href='/' className={`${styles.link} ${styles.shoppingLink}`}><h5>Continue Shopping</h5></Link>
            </div>    
            <div className={styles.linkSection}>
                <h5 className={`${sairaCondensed.className} ${styles.subText}`}>Or sign in to your cart</h5>
                <Link href='/signin' className={`${styles.link} ${styles.signInLink}`}><h5>Sign in</h5></Link>
            </div>
        </div>
    )
}
