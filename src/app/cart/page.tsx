import styles from './cartPage.module.css'
import EmptyCart from '@/components/cart/emptyCart/EmptyCart'
import Cart from '@/components/cart/cart/Cart'
import { getCart } from './actions'

export default async function page() {
    const cart = await getCart()
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
