"use client"

import { useState, useTransition } from "react"
import styles from './button.module.css'
import mongoose from "mongoose"
import { objectId } from "@/lib/types"

type buttonProps = {
  id:objectId
  addToCart: ((id:objectId) => Promise<void>) | undefined
}

export default function Button({id, addToCart} : buttonProps,) {
  const [ isPending, startTransition ] = useTransition()
  const [success,setSuccess] = useState(false)

  return (
    <>
      <button className={styles.addToCartBtn} onClick={() => startTransition(
        
        async () => {
          setSuccess(false)
          if(addToCart)
          await addToCart(id)
          setSuccess(true)
        }
        )}>
        {isPending? 
        <div className={styles.loader}><div className={styles.spinner}></div></div>
        :<p>ADD TO CART</p>
        }
      </button>
      {(!isPending && success) && <span className={styles.successMessage}>Added to cart!</span>}
    </>
  )
}
