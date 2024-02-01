import styles from "./home.module.css"
import { Saira_Condensed } from 'next/font/google'
import Products from "@/components/products/Products"
import { unstable_noStore as noStore } from "next/cache"

const sairaCondensed = Saira_Condensed({
    weight: ["400","600","700"],
    subsets: ["latin"],
  })

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
        <h1 className={sairaCondensed.className}>
          check the <span className={styles.zeiti}>Best</span> Caps <span className={styles.zeiti}>Ever</span>
        </h1>
      </section>
      <h1></h1>
      <section className={styles.products_container}>
        <h2 className={sairaCondensed.className}>
          Latest Deals
        </h2>
        {<Products products = {products}/>}
      </section>
    </main>
  )
}
