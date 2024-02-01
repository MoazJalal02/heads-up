import Image from "next/image";
import styles from './cartItem.module.css'
import { Saira_Condensed } from 'next/font/google'
import { Sansita } from 'next/font/google'
import QuantityButton from "./quantityButton/QuantityButton";
import { increment, decrement, deleteCartItem } from '@/components/addToCartBtn/actions'
import TrashIcon from "./trashIcon/TrashIcon";


const sansita = Sansita({
  weight: ["400"],
  subsets: ["latin"],
})

const sairaCondensed = Saira_Condensed({
    weight: ["400","600","700"],
    subsets: ["latin"],
})

type cartItemProps = {
  id: string
  image: string,
  brand: string,
  name: string,
  price: number,
  quantity: number
}

export default function CartItem({id, image, brand, name, price, quantity } : cartItemProps) {
  return (
    <div className={styles.container}>
        <div className={styles.imageContainer}>
          <Image 
            className={styles.productImage} 
            src={image} 
            alt={name}
            sizes="100vw"
            width={736}
            height={736}
            style={{
              width: '100%',
              height: 'auto',
            }}
          ></Image>
        </div>
        <div className={styles.infoContainer}>
            <div className={styles.infoTop}>
                <h4>{brand}</h4>  
                <TrashIcon id={id} deleteCartItem={deleteCartItem}/>
            </div>
            <h5 className={styles.productName}>{name}</h5>
            <h5 className={styles.productPrice}>${price}</h5>
            <QuantityButton id={id} quantity={quantity} increment={increment} decrement={decrement}/>
        </div>
    </div>
  )
}
