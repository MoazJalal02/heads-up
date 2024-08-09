import styles from "./home.module.css"
import Products from "@/components/products/Products"
import ProductsSlider from "@/components/ProductsSlider/ProductsSlider"
import { ProductType } from "@/lib/types"
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

export const getLatest =  (products : ProductType[]) => {
  const latestProducts = products.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  return latestProducts.slice(0,4)
}

const getDiscounted =  (products: ProductType[]) => {
  const discounted = products.filter((product) => {
      return product.discount != 0
  })

  return discounted.sort((a, b) => new Date(b.discount).getTime() - new Date(a.discount).getTime()).slice(0,4);
}

export default async function Home() {
  // const products = await getProducts()
  const products: ProductType[] = await getData()
  const latestProducts = getLatest(products) 
  const discountedProduct = getDiscounted(products)

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
            {<ProductsSlider products= {discountedProduct} />}
          </div>
          <div className={styles.carouselContainer}>
            {<Products products = {discountedProduct}  layout='carousel'/>}
          </div>
        </div>
        <div className={styles.categoryContainer}>
          <Link href='/new-arrivals'>
            <h2>NEW ARRIVALS</h2>
          </Link>
          <div className={styles.sliderContainer}>
            {<ProductsSlider products= {latestProducts} />}
          </div>
          <div className={styles.carouselContainer}>
            {<Products products = {latestProducts}  layout='carousel'/>}
          </div>
        </div>
      </section>
    </main>
  )
}
