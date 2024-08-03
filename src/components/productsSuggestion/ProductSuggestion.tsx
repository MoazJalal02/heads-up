"use client"

import { useEffect, useRef, useState } from 'react'
import styles from './productSuggestion.module.css'
import Product from '../product/Product'
import type { ProductType, objectId } from '@/lib/types'

const getData = async () => {
    const apiUrl = process.env.API_URL

    const res = await fetch(`${apiUrl}/api/products`)
    if(!res.ok){
      throw new Error("Something went wrong!")
    }
  
    return res.json()
}

type ProductSuggestionProps = {
    id: objectId
    products: any
}

export default function ProductSuggestion({ id, products }: ProductSuggestionProps ) {
    const productsSuggestions = products.filter((prod : ProductType) => {
        return ! (prod._id ===  id)
    })
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const containerRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        console.log('Active: ',activeIndex)
        if (!container) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting && index !== activeIndex) {
                        setActiveIndex(index);
                    }
                });
            },
        { threshold: .7 } // Adjust the threshold as needed
        );
            // Observe each product element
            container.querySelectorAll(`.${styles.suggestionContainer} > li`).forEach((item) => {
                observer.observe(item);
        });
        return () => {
        observer.disconnect();
        };
    }, [activeIndex]);

    const handleDotClick = (index: number) => {
        setActiveIndex(index);
        const container = containerRef.current;
        if (container) {
          const productList = container.querySelectorAll(`.${styles.suggestionContainer} > li`);
          if (productList[index]) {
            productList[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
      };

    return (
        <div className={styles.suggestionContainerWrapper}>
            <ul className={styles.suggestionContainer} ref={containerRef}>
            {[...productsSuggestions].map((prod,i) => (
                <li key={i}>
                    <Product
                        id={prod._id}
                        brand={prod.brand}
                        name={prod.name}
                        image={prod.image}
                        price={prod.price}
                        showButton={false}
                        discount={prod.discount}
                    />
                </li>
            ))}
            </ul>
            <div className={styles.slickDots}>
            {[...productsSuggestions].map((_, index) => (
                <div
                    key={index}
                    onClick={() => handleDotClick(index)}
                    className={`${styles.dot} ${index === activeIndex ? styles.active : ''}`}
                ></div>
            ))}
            </div>
        </div>
    )
}
