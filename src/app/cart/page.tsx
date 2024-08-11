import styles from './cartPage.module.css'
import EmptyCart from '@/components/cart/emptyCart/EmptyCart'
import Cart from '@/components/cart/cart/Cart'
import { getCart } from './actions'
import ProductSuggestion from '@/components/productsSuggestion/ProductSuggestion'
import { ProductType } from '@/lib/types'

const getProductsData = async () => {
    const apiUrl = process.env.API_URL
  
    const res = await fetch(`${apiUrl}/api/products`)
    if (!res.ok) {
      throw new Error("Something went wrong!")
    }
  
    return res.json()
}

export default async function page() {
    const cart = await getCart()
    const products : ProductType[] = await getProductsData()

    return (
        <main className={styles.container}>
            {
                cart?
                    cart.size > 0?
                        <Cart cart={cart}/>
                        :<>
                            <EmptyCart />
                            <div className={styles.suggestionSection}>
                                <ProductSuggestion products={products}/>
                            </div>
                        </>
                :<>
                    <EmptyCart />
                    <div className={styles.suggestionSection}>
                        <ProductSuggestion products={products}/>
                    </div>
                </>
            }
        </main>
    )
}
