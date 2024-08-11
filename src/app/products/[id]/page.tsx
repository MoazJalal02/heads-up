import styles from './single-product.module.css'
import Image from 'next/image'
import { unstable_noStore as noStore } from 'next/cache';
import { addToCart } from '@/components/addToCartBtn/actions'
import { objectId, ProductType } from '@/lib/types'
import QuantAddBtn from '@/components/addToCartBtn/quantAddBtn'
import ProductsSlider from '@/components/ProductsSlider/ProductsSlider';
import Products from '@/components/products/Products';


const getProductData = async (id: objectId) => {
  noStore()
  const apiUrl = process.env.API_URL
  const res = await fetch(`${apiUrl}/api/products/${id}`);

  if (!res.ok) {
    console.log('error');
  }

  return res.json();
};

const getProductsData = async () => {
  const apiUrl = process.env.API_URL

  const res = await fetch(`${apiUrl}/api/products`)
  if (!res.ok) {
    throw new Error("Something went wrong!")
  }

  return res.json()
}

const getLatest =  (products : ProductType[]) => {
  const latestProducts = products.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  return latestProducts.slice(0,4)
}

export default async function page({ params }: { params: { id: objectId } }) {
  const { id } = params
  const product: ProductType = await getProductData(id)
  const products = await getProductsData()
  const filterProducts = products.filter((prod : ProductType) => {
    return prod._id !== product._id
  })
  const latestProducts = getLatest(filterProducts)

  return (
    <main className={styles.container}>
      <div className={styles.productContainer}>
        <div className={styles.infoContainer}>
          <div className={styles.nameContainer}>
            <h3 className={styles.productBrand}>{product.brand}</h3>
            <p className={styles.productName}>{product.name}</p>
          </div>
          <div className={styles.priceContainer}>
            {product.discount != 0.00 ?
              <>
                <p className={`${styles.price} ${styles.prevPrice}`}>${product.price}</p>
                <p className={`${styles.price} ${styles.newPrice}`}>${Math.floor(product.price - (product.price * product.discount))}</p>
              </>
              :
              <p className={styles.price}>${product.price}</p>
            }
          </div>
        </div>
        <div className={styles.imageContainer}>
          <Image
            className={styles.productImage}
            src={product.image}
            alt={product.name}
            sizes="100vw"
            width={736}
            height={736}
            style={{
              width: '100%',
              height: 'auto',
            }}
          ></Image>
        </div>
        <p className={styles.descriptionContainer}>{product.description}</p>
        <div className={styles.buttonContainer}>
          {<QuantAddBtn id={id} addToCart={addToCart} />}
        </div>
      </div>
      <div className={styles.suggestContainer}>
        <h2>YOU MIGHT LIKE</h2>
        <div className={styles.sliderContainer}>
            {<ProductsSlider products= {latestProducts} />}
          </div>
          <div className={styles.carouselContainer}>
            {<Products products = {latestProducts}  layout='carousel'/>}
        </div>
      </div>
    </main>
  )
}
