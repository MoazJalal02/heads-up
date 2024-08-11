import Image from "next/image";
import styles from './cartItem.module.css'
import QuantityButton from "./quantityButton/QuantityButton";
import { increment, decrement, deleteCartItem } from '@/components/addToCartBtn/actions'
import TrashIcon from "./trashIcon/TrashIcon";
import { objectId } from '@/lib/types'


type cartItemProps = {
  id: objectId
  image: string,
  brand: string,
  name: string,
  price: number,
  quantity: number,
  discount: number
}

export default function CartItem({id, image, brand, name, price, discount, quantity } : cartItemProps) {
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
            <h3>{brand}</h3>  
            <p>{name}</p>
            {discount != 0.00?  
            <div className={styles.priceContainer}>
              <p className={`${styles.price} ${styles.prevPrice}`}>${price}</p>
              <p className={`${styles.price} ${styles.newPrice}`}>${Math.floor(price - (price*discount))}</p>
            </div>
            : 
            <p className={styles.price}>${price}</p>
            }
            <div className={styles.actionContainer}>
              <QuantityButton id={id} quantity={quantity} increment={increment} decrement={decrement}/>
              <TrashIcon id={id} deleteCartItem={deleteCartItem}/>
            </div>
        </div>
    </div>
  )
}
