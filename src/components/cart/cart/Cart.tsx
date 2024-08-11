import styles from './cart.module.css'
import CartItem from '../cartItem/CartItem'
import type { shoppingCart } from '@/lib/types'

type CartProps = {
    cart: shoppingCart
}

export default function Cart({cart}:CartProps) {
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
                            <div key={i}>
                                <CartItem 
                                    id = {JSON.parse(JSON.stringify(item.product._id))}
                                    image = {item.product.image}
                                    brand = {item.product.brand}
                                    name = {item.product.name}
                                    price = {item.product.price}
                                    discount={item.product.discount}
                                    quantity = {item.quantity}
                                />
                            </div>

                        )
                    })}
                </div>
                <div className={styles.orderContainer}>
                    <h2>ORDER SUMMARY</h2>
                    <div className={styles.subtotalContainer}>
                        <p>Subtotal <span className={styles.midDarkGray}>{`( ${cart.size} ${cart.size == 1? 'item':'items'} )`}</span></p>
                        <p>{cart.subtotal}</p>
                    </div>
                    <hr></hr>
                    <div className={styles.totalContainer}>
                        <h3>Order Total</h3>
                        <div>
                            <h3>{cart.subtotal}</h3>
                            <p className={styles.midDarkGray}>Inlusive of VAT</p>
                        </div>
                    </div>
                    <div className={styles.actionContainer}>
                        <button className={styles.CheckoutBtn}>Checkout</button>
                    </div>
                </div>
            </div>
        </>
    )
}
