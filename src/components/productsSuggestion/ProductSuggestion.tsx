import Products from '../products/Products'
import ProductsSlider from '../ProductsSlider/ProductsSlider'
import styles from './productSuggestion.module.css'
import type { ProductType } from '@/lib/types'


type ProductSuggestionProps = {
    products: ProductType[]
    product?: ProductType
}

const getLatest =  (products : ProductType[]) => {
    const latestProducts = products.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return latestProducts.slice(0,4)
}

export default function ProductSuggestion({ products, product }: ProductSuggestionProps ) {
    const filteredProducts = product? products.filter((prod : ProductType) => {
        return ! (prod._id ===  product?._id)
    }): products

    const latestProducts = getLatest(filteredProducts)

    return (
        <div className={styles.suggestContainer}>
            <h2>YOU MIGHT LIKE</h2>
            <div className={styles.sliderContainer}>
                {<ProductsSlider products= {latestProducts} />}
            </div>
            <div className={styles.carouselContainer}>
                {<Products products = {latestProducts}  layout='carousel'/>}
            </div>
        </div>
    )
}
