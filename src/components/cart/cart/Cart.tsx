import styles from './cart.module.css'
import CartItem from '../cartItem/CartItem'
import type { cartItem, ProductType, shoppingCart } from '@/lib/types'
import Link from 'next/link'

type CartProps = {
    cart: shoppingCart
}

const getDiscount = (cartItems: cartItem[]) => {
    var totalDiscount = 0;
    cartItems.forEach(item => {
        if(item.product.discount !== 0.00) totalDiscount += (item.product.discount * item.product.price) * item.quantity
    })

    return totalDiscount
} 

export default function Cart({cart}:CartProps) {

    const totalDiscount = getDiscount(cart.items)
    return (
        <>
            <div className={styles.cartHeader}>
                <h3>{cart.size} {`${cart.size == 1? 'item':'items'}`}</h3>
                <h3>Total: ${cart.subtotal}</h3>
            </div>
            <div className={styles.container}>
                <div className={styles.cartItemContainer}>
                    {cart.items.map((item,i )=> {
                        return (
                                <CartItem 
                                    key={JSON.parse(JSON.stringify(item.product._id))}
                                    id = {JSON.parse(JSON.stringify(item.product._id))}
                                    image = {item.product.image}
                                    brand = {item.product.brand}
                                    name = {item.product.name}
                                    price = {item.product.price}
                                    discount={item.product.discount}
                                    quantity = {item.quantity}
                                />

                        )
                    })}
                </div>
                <div className={styles.orderContainer}>
                    <h2>ORDER SUMMARY</h2>
                    <div className={styles.discountSubtotalContainer}>
                        <div className={styles.subtotalContainer}>
                            <p>Subtotal <span className={styles.midDarkGray}>{`( ${cart.size} ${cart.size == 1? 'item':'items'} )`}</span></p>
                            <p>${(Math.round(cart.subtotal * 100) / 100).toFixed(2)}</p>
                        </div>
                        <div className={styles.subtotalContainer}>
                            <p>Discount</p>
                            <p className={styles.red}>-${Math.round(totalDiscount).toFixed(2)}</p>
                        </div>
                    </div>
                    <hr className={styles.divideLine}></hr>
                    <div className={styles.totalContainer}>
                        <h3>Order Total</h3>
                        <div className={styles.totalContent}>
                            <h3>${Math.round(cart.subtotal - totalDiscount).toFixed(2)}</h3>
                            <p className={styles.midDarkGray}>Inlusive of VAT</p>
                        </div>
                    </div>
                    <div className={styles.actionContainer}>
                        <Link href='/top-deals' className={`${styles.link} ${styles.shoppingLink}`}><h2>Continue Shopping</h2></Link>
                        <button className={styles.CheckoutBtn}><h2>Checkout</h2></button>
                    </div>
                </div>
            </div>
        </>
    )
}
