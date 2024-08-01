"use client"

import Product from "../product/Product"
import type { ProductType } from "@/lib/types"
import styles from './productsSlider.module.css'
import rightArrow from '../../../public/assets/rightArrow.svg'
import leftArrow from '../../../public/assets/leftArrow.svg'
import { addToCart } from "@/components/addToCartBtn/actions"
import { useRef } from "react"
import Image from "next/image"

type ProductsSliderProps = {
    products: any
    brand?: string
}

export default function ProductsSlider({ products, brand } : ProductsSliderProps) {
    const containerRef = useRef<HTMLUListElement>(null)
    const filteredProducts = brand? products.filter((prod: ProductType) => prod.brand === brand): products;

    const slideLeft = () => {
        if (containerRef.current) {
            const itemWidth = containerRef.current.querySelector('li')?.offsetWidth || 0;
            containerRef.current.scrollLeft -= itemWidth;
        }
    };

    const slideRight = () => {
        if (containerRef.current) {
            const itemWidth = containerRef.current.querySelector('li')?.offsetWidth || 0;
            containerRef.current.scrollLeft += itemWidth;
        }
    };

    return (
        <div className={styles.sliderWrapper}>
            <button className={styles.btns} onClick={slideLeft}>
                <Image 
                    alt='left arrow'
                    className={styles.arrow}
                    width={52}
                    height={76}
                    src={leftArrow}
                />
            </button>
            <ul className={filteredProducts.length < 3? `${styles.sliderContainer} ${styles.sliderFewItmes}`: styles.sliderContainer} ref={containerRef}>
                {filteredProducts.map((prod: ProductType) => (
                    <li key={prod.name} className={styles.sliderItem}>
                        <Product 
                            id={prod._id}
                            brand={prod.brand} 
                            name={prod.name}
                            image={prod.image}
                            price={prod.price}
                            showButton={false}
                            addToCart={addToCart}
                            discount={{isDiscount: false, amount: .33}}
                        />
                    </li>
                ))}
            </ul>
            <button className={styles.btns} onClick={slideRight}> 
                <Image 
                    alt='right arrow'
                    className={styles.arrow}
                    width={52}
                    height={76}
                    src={rightArrow}
                />
            </button>
        </div>
    )
}
