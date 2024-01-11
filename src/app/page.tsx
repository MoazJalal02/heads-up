import styles from "./styles/home.module.css"
import { Saira_Condensed } from 'next/font/google'
import Product from "@/components/product/Product"
import React from "react"
import { getProducts } from '@/lib/data'

const sairaCondensed = Saira_Condensed({
    weight: ["400","600","700"],
    subsets: ["latin"],
  })

interface Product {
  _id: number,
  brand: string,
  name: string,
  description: string,
  price: number,
  image: string,
}

export default async function Home() {
  const products = await getProducts()
  console.log(products)

  return (
    <main>
      <section className={styles.hero_container}>
        <h1 className={sairaCondensed.className}>
          check the <span className={styles.zeiti}>Best</span> Caps <span className={styles.zeiti}>Ever</span>
        </h1>
      </section>
      <h1></h1>
      <section className={styles.products_container}>
        <h2 className={sairaCondensed.className}>
          Latest Deals
        </h2>
        <ul>
            {products.map((prod :Product) => {
              return(
                <li key={prod._id}>
                  <Product 
                    id={prod._id}
                    brand={prod.brand} 
                    name={prod.name}
                    image = {prod.image}
                    price={prod.price}
                /> 
              </li>
              )
            })}
          {/* <li>
            <Product 
              id={2}
              brand="Verve" 
              name="Steel Blue baseball" 
              image = "/assets/caps-images/2.png"
              price={15}
            /> 
          </li>
          <li>
            <Product 
              id={3}
              brand="Bars" 
              name="Midnight Blue baseball" 
              image = "/assets/caps-images/3.png"
              price={20}
            /> 
          </li>

          <li>
            <Product 
              id={4}
              brand="Bars" 
              name="Slate Gray baseball" 
              image = "/assets/caps-images/4.png"
              price={20}
            /> 
          </li> */}
        </ul>
      </section>
    </main>
  )
}
