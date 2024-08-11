"use client"

import Product from "../product/Product"
import type { ProductType } from "@/lib/types"
import styles from './products.module.css'
import { addToCart } from "@/components/addToCartBtn/actions"
import ProductCarousel from "./productsCarousel/ProductCarousel"

type ProductsProps = {
    products: any
    layout: "carousel" | "grid"
    brand?: string
}

export default function Products({ products, layout, brand }: ProductsProps) {
    const filteredProducts = brand ? products.filter((prod: ProductType) => prod.brand === brand): products;

    return (
        <>
            {layout === 'carousel'? 
            <>
                <ProductCarousel products={products}/>
            </>:
            <>
                <ul className={styles.products_grid}>
                {filteredProducts.map((prod : ProductType) => {
                        return(
                            <li key={prod._id.toString()}>
                                <Product 
                                    id={prod._id}
                                    brand={prod.brand} 
                                    name={prod.name}
                                    image = {prod.image}
                                    price={prod.price}
                                    showButton={false}
                                    addToCart={addToCart}
                                    discount={prod.discount}
                                /> 
                            </li>)
                    })}
                </ul>
            </>
            }
        </>
    )
}
