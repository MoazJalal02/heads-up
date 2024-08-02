import styles from "./home.module.css"
import Products from "@/components/products/Products"
import ProductsSlider from "@/components/ProductsSlider/ProductsSlider"
import { unstable_noStore as noStore } from "next/cache"
import Link from "next/link"

export const metadata = {
  title: "Heads Up",
  description: "Home page description"
}

const getData = async () => {
  noStore()
  const apiUrl = process.env.API_URL
  const res = await fetch(`${apiUrl}/api/products`)
  if(!res.ok){
    throw new Error("Something went wrong!")
  }

  return res.json()
}

export default async function Home() {
  // const products = await getProducts()
  const products = await getData()

  return (
    <main>
      <section className={styles.hero_container}>
        <div className={styles.callToActionContainer}>
          <h1>
            check the Best Caps Ever
          </h1>
          <Link href='/'className={styles.actionBtn}> <h3> SHOP NOW </h3></Link>      
        </div>
      </section>
      <h1></h1>
      <section className={styles.products_container}>
        <div className={styles.categoryContainer}>
          <Link href='/brands'>
            <h2>
              SHOP BY BRANDS
            </h2>
          </Link>
          <div className={styles.brandsContainer}>
            <Link href='' className={styles.brandButton}>
              <h3>VERVE</h3>
            </Link>
            <Link href='' className={styles.brandButton}>
              <h3>GRILD</h3>
            </Link>
            <Link href='' className={styles.brandButton}>
              <h3>BARS</h3>
            </Link>
          </div>
        </div>
        <div className={styles.categoryContainer}>
          <Link href='/top-deals'>
            <h2>TOP DEALS</h2>
          </Link>
          <div className={styles.sliderContainer}>
            {<ProductsSlider products= {products} isDiscount={true}/>}
          </div>
          <div className={styles.carouselContainer}>
            {<Products products = {products} isDiscount={true} layout='carousel'/>}
          </div>
        </div>
        <div className={styles.categoryContainer}>
          <h2>
            NEW ARRIVALS
          </h2>
          <div className={styles.sliderContainer}>
            {<ProductsSlider products= {products} isDiscount={false}/>}
          </div>
          <div className={styles.carouselContainer}>
            {<Products products = {products} isDiscount={false} layout='carousel'/>}
          </div>
        </div>
      </section>
    </main>
  )
}
