"use client"

import Product from "../product/Product"
import type { ProductType } from "@/lib/types"
import styles from './products.module.css'
import { addToCart } from "@/components/addToCartBtn/actions"
import { useEffect, useRef, useState } from "react"
import "react-responsive-carousel/lib/styles/carousel.min.css";

type ProductsProps = {
    products: any
}

export default function Products({ products }: ProductsProps) {
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const containerRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        const callback = (entries: IntersectionObserverEntry[]) => {
            console.log("callback called")
            console.log('entries: ',entries)
            entries.forEach((entry,i) => {
                console.log('index: ',i)
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
        console.log('Products: ',container.querySelectorAll(`.${styles.productsContainer} > li`))
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
        <section>
            <ul className={styles.productsContainer} ref={containerRef}>
            {products.map((prod : ProductType) => {
                    return(
                        <li key={prod.name}>
                            <Product 
                                id={prod._id}
                                brand={prod.brand} 
                                name={prod.name}
                                image = {prod.image}
                                price={prod.price}
                                showButton={false}
                                addToCart={addToCart}
                            /> 
                        </li>)
                })}
            </ul>
            <div className={styles.slickDots}>
            {[...products].map((_, index) => (
                <div
                    key={index}
                    onClick={() => handleDotClick(index)}
                    className={`${styles.dot} ${index === activeIndex ? styles.active : ''}`}
                ></div>
            ))}
            </div>
        </section>
    )
}
