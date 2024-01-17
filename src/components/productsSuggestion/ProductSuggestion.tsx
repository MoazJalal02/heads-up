import React from 'react'
import styles from './productSuggestion.module.css'
import Product from '../product/Product'
import type { ProductType } from '@/lib/types'
const getData = async () => {
    const apiUrl = process.env.API_URL

    const res = await fetch(`${apiUrl}/api/products`)
    if(!res.ok){
      throw new Error("Something went wrong!")
    }
  
    return res.json()
  }
  

export default async function ProductSuggestion(props: { id:string }) {
    const { id } = props
    const data = await getData()
    const products = data.filter((prod : ProductType) => {
        return ! (prod._id ===  id)
    })

    return (
        <ul className={styles.suggestionContainer}>
            {[...products.splice(0,2)].map(prod => {
                return (
                    <li key={prod.id}>
                        <Product
                            id={prod._id}
                            brand={prod.brand} 
                            name={prod.name}
                            image = {prod.image}
                            price={prod.price}
                            showButton={false}
                        />
                    </li>
                )
            })}
        </ul>
    )
}
