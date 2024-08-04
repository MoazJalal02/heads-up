"use client"

import Product from "../product/Product"
import type { ProductType } from "@/lib/types"
import styles from './products.module.css'
import { addToCart } from "@/components/addToCartBtn/actions"
import { useEffect, useRef, useState } from "react"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ProductCarousel from "./productsCarousel/ProductCarousel"

type ProductsProps = {
    products: any
    layout: "carousel" | "grid"
    brand?: string
}

export default function Products({ products, layout, brand }: ProductsProps) {
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const containerRef = useRef<HTMLUListElement>(null);
    const filteredProducts = brand ? products.filter((prod: ProductType) => prod.brand === brand): products;

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        const callback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry,i) => {
                if(entry.isIntersecting)
                setActiveIndex(i)
            });
        };
          
        let options = {
            root: container,
            rootMargin: "0px",
            threshold: .8,
        };

        let observer = new IntersectionObserver(callback, options);
        container.querySelectorAll(`.${styles.productsContainer} > li`).forEach(item => observer.observe(item))
    }, [activeIndex]);

    const handleDotClick = (index: number) => {
        setActiveIndex(index);
        const container = containerRef.current;
        if (container) {
          const productList = container.querySelectorAll(`.${styles.productsContainer} > li`);
          if (productList[index]) {
            productList[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
      };

    return (
        <>
            {layout === 'carousel'? 
            <>
                <ProductCarousel products={products}/>
            </>:
            <>
                <ul className={styles.products_grid} ref={containerRef}>
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
