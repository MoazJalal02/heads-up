import styles from './cart.module.css'
import CartItem from '../cartItem/CartItem'
import { Saira_Condensed } from 'next/font/google'
import type { shoppingCart } from '@/lib/types'

const sairaCondensed = Saira_Condensed({
    weight: ["400","600","700"],
    subsets: ["latin"],
})

type CartProps = {
    cart: shoppingCart
}

export default function Cart({cart}:CartProps) {
    return (
        <div>
            <div className={styles.cartHeader}>
                <div>
                    <p>{cart.size} {`${cart.size == 1? 'item':'items'}`}</p>
                    <h5>Total: ${cart.subtotal}</h5>
                </div>
            </div>
            <div className={styles.container}>
                <div className={styles.cartItemContainer}>
                    {cart.items.map((item,i )=> {
                        return (
                            <div key={i}>
                                <CartItem 
                                    id = {JSON.parse(JSON.stringify(item.product._id))}
                                    image = {item.product.image}
                                    brand = {item.product.brand}
                                    name = {item.product.name}
                                    price = {item.product.price}
                                    quantity = {item.quantity}
                                />
                            </div>

                        )
                    })}
                </div>
                <button className={styles.CheckoutBtn}>Checkout</button>
            </div>
        </div>
    )
}
