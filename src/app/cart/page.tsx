import styles from './cartPage.module.css'
import EmptyCart from '@/components/cart/emptyCart/EmptyCart'
import Cart from '@/components/cart/cart/Cart'
import { createCart, getCart } from './actions'

export default async function page() {
    const cart = await getCart()
    console.log("Cart: ",cart)
    return (
        <main className={styles.container}>
            {
                cart?
                cart.size > 0?
                <Cart cart={cart}/>
                :<EmptyCart />
                :<EmptyCart />
            }
        </main>
    )
}
