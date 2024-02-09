'use client'

import { useState, useTransition } from 'react'
import styles from './form.module.css'
import { createProduct } from '../../actions';
import { Saira_Condensed } from 'next/font/google'
const sairaCondensed = Saira_Condensed({
    weight: ["400","600","700"],
    subsets: ["latin"],
})

export default function Form() {
    const [ isPending, startTransition ] = useTransition()
    const [success,setSuccess] = useState(false)
    const [showMessage, setShowMessage] = useState(false);

    const handleSubmit = (formData: FormData) => {
        startTransition(
            async () => {
                setSuccess(false)
                try{
                    await createProduct(formData)
                    setSuccess(true)
                    handleMessage()
                } catch(e){
                    console.log('ERROOOR: ',e)
                    setSuccess(false)
                    handleMessage()
                }
              }
        )
    }

    const handleMessage = () => {
        setShowMessage(true);
  
        setTimeout(() => {
            setShowMessage(false);
        }, 3000);
    };

    return (
        <form className={styles.container} action={handleSubmit}>
        <label htmlFor='brand' className={sairaCondensed.className}>
            Brand
            <input
                id='brand'
                name='brand'
                placeholder='Verve'
                className={`${styles.inputField} ${sairaCondensed.className}`}
                required
            ></input>
        </label>

        <label htmlFor='name' className={sairaCondensed.className}>
            Name
            <input
                id='name'
                name='name'
                placeholder='Steel Blue baseball cap'
                className={`${styles.inputField} ${sairaCondensed.className}`}
                required
            ></input>
        </label>

        <label htmlFor='price' className={sairaCondensed.className}>
            Price
            <input
                id='price'
                type='number'
                name='price'
                placeholder='15'
                className={`${styles.inputField} ${sairaCondensed.className}`}
                required
            ></input>
        </label>

        <label htmlFor='image' className={sairaCondensed.className}>
            Image
            <input
                id='image'
                name='image'
                placeholder='/assets/caps-images/1.png'
                className={`${styles.inputField} ${sairaCondensed.className}`}
            ></input>
        </label>

        <label htmlFor='description' className={`${sairaCondensed.className} ${styles.descriptionLabel}`}>
            Description
            <textarea
                id='description'
                name='description'
                placeholder='Introducing our vibrant Green Baseball Cap, a stylish accessory that seamlessly blends fashion and functionality. Crafted with precision and designed for comfort, this cap is the perfect addition to your casual wardrobe'
                className={`${styles.inputField} ${sairaCondensed.className}`}
                required
            ></textarea>
        </label>
        <button type='submit' className={`${styles.button} ${sairaCondensed.className}`}>
            {isPending? 
                <div className={styles.loader}><div className={styles.spinner}></div></div>
                :'ADD PRODUCT'
            }
        </button>
        {(!isPending) &&
            <span className={`${styles.successMessage} ${showMessage? styles.visible: styles.hidden}`}>{success?'Product Created Successfully':'Failed to create prodcut'}</span>
        }
    </form>
    )
}
