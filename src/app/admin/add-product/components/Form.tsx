'use client'

import { useState, useTransition } from 'react'
import styles from './form.module.css'
import { createProduct } from '../../actions';

export default function Form() {
    const [isPending, startTransition] = useTransition()
    const [success, setSuccess] = useState(false)
    const [showMessage, setShowMessage] = useState(false);

    const handleSubmit = (formData: FormData) => {
        startTransition(
            async () => {
                setSuccess(false)
                try {
                    await createProduct(formData)
                    setSuccess(true)
                    handleMessage()
                } catch (e) {
                    console.log('ERROOOR: ', e)
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
            <label htmlFor='brand' className={styles.infoContainer}>
                <h3>Brand</h3>
                <input
                    id='brand'
                    name='brand'
                    placeholder='Verve'
                    className= {styles.infoContent}
                    required
                ></input>
            </label>

            <label htmlFor='name' className={styles.infoContainer}>
                <h3>Name</h3>
                <input
                    id='name'
                    name='name'
                    placeholder='Steel Blue baseball cap'
                    className= {styles.infoContent}
                    required
                ></input>
            </label>

            <label htmlFor={'price'} className={styles.infoContainer}>
                <h3>Price</h3>
                <input
                    id='price'
                    type='number'
                    name='price'
                    placeholder='15'
                    className= {styles.infoContent}
                    required
                ></input>
            </label>

            <label htmlFor={'discount'} className={styles.infoContainer}>
                <h3>Discount</h3>
                <input
                    id='discount'
                    type='number'
                    name='discount'
                    step={.01}
                    placeholder='0.00'
                    className= {styles.infoContent}
                    required
                ></input>
            </label>

            <label htmlFor='image' className={styles.infoContainer}>
                <h3>Image</h3>
                <input
                    id='image'
                    name='image'
                    placeholder='/assets/caps-images/1.png'
                    className= {styles.infoContent}
                ></input>
            </label>

            <label htmlFor='description' className={`${styles.infoContainer} ${styles.descriptionContainer}`}>
                <h3>Description</h3>
                <textarea
                    id='description'
                    name='description'
                    placeholder='Introducing our vibrant Green Baseball Cap, a stylish accessory that seamlessly blends fashion and functionality. Crafted with precision and designed for comfort, this cap is the perfect addition to your casual wardrobe'
                    className= {`${styles.infoContent} ${styles.descriptionContent}`}
                    required
                ></textarea>
            </label>
            <div className={styles.buttonContainer}>
                <button className={styles.addBtn} type='submit' >
                    {isPending ?
                        <div className={styles.loader}><div className={styles.spinner}></div></div>
                        : <p>ADD PRODUCT</p>
                    }
                </button>
                {
                    (!isPending) &&
                    <p className={`${styles.successMessage} ${showMessage ? styles.visible : styles.hidden}`}>{success ? 'Product Created Successfully' : 'Failed to create product'}</p>
                }
            </div>
        </form >
    )
}
