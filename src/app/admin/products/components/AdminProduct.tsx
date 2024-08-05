"use client"

import { objectId } from "@/lib/types"
import styles from './adminProduct.module.css'
import Image from "next/image"
import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"

type AdminProductProps = {
    id: objectId
    brand: string
    name: string
    image: string
    price: number
    discount: number
    apiUrl: string | undefined
}


export default function AdminProduct({ id, brand, name, price, discount, image, apiUrl }: AdminProductProps) {
    const router = useRouter()
    const [isEditMode, setIsEditMode] = useState<boolean>(false)
    const [isPendingDelete, startDeleteTransition] = useTransition()
    const [isPendingSubmit, startSubmitTransition] = useTransition()
    const [updateMessage, setUpdateMessage] = useState(false)
    const [deleteMessage, setDeleteMessage] = useState(false)
    const [showUpdateMessage, setShowUpdateMessage] = useState(false);
    const [showDeleteMessage, setShowDeleteMessage] = useState(false);

    const handleSubmit = async (formData: FormData) => {
        const updatedBrand = formData.get('brand') ? formData.get('brand') : brand
        const updatedName = formData.get('name') ? formData.get('name') : name
        const updatedPrice = formData.get('price') ? formData.get('price') : price
        const updatedDiscount = formData.get('discount') ? formData.get('discount') : discount

        const updatedProduct = {
            brand: updatedBrand,
            name: updatedName,
            price: updatedPrice,
            discount: updatedDiscount
        }

        startSubmitTransition(
            async () => {
                setUpdateMessage(false)
                try {
                    await fetch(`${apiUrl}/api/products/${id}`, {
                        method: 'put',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(updatedProduct),
                    })
                    router.refresh()
                    setUpdateMessage(true)
                    handleMessage(setShowUpdateMessage)
                } catch (err) {
                    console.log('error: ', err)
                    console.log('Failed to update product')
                    setUpdateMessage(false)
                    handleMessage(setShowUpdateMessage)
                }
            }
        )
    }

    const handleDelete = async () => {
        startDeleteTransition(
            async () => {
                setDeleteMessage(false)
                try {
                    await fetch(`${apiUrl}/api/products/${id}`, {
                        method: 'delete',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })
                    router.refresh()
                    setDeleteMessage(true)
                    handleMessage(setShowDeleteMessage)
                } catch (err) {
                    console.log("Failed to delete product")
                    handleMessage(setShowDeleteMessage)
                }
            }
        )
    }

    const handleMessage = (set: React.Dispatch<React.SetStateAction<boolean>>) => {
        set(true);

        setTimeout(() => {
            set(false);
        }, 5000);
    };

    return (
        <div className={styles.container}>
            <div className={styles.imageContainer}>
                <Image
                    src={(image)}
                    alt={name}
                    sizes="100vw"
                    width={116}
                    height={116}
                    style={{
                        width: '100%',
                        height: 'auto',
                    }}
                />
            </div>
            <svg onClick={() => setIsEditMode(prevState => !prevState)} className={`${styles.editContainer} ${isEditMode ? 'activeEdit' : ''}`} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.5833 4.66667H4.66659C3.91514 4.66667 3.19447 4.96518 2.66312 5.49654C2.13176 6.02789 1.83325 6.74856 1.83325 7.50001V27.3333C1.83325 28.0848 2.13176 28.8055 2.66312 29.3368C3.19447 29.8682 3.91514 30.1667 4.66659 30.1667H24.4999C25.2514 30.1667 25.972 29.8682 26.5034 29.3368C27.0347 28.8055 27.3333 28.0848 27.3333 27.3333V17.4167" stroke="#14342B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M25.2083 2.54167C25.7718 1.97809 26.5362 1.66147 27.3333 1.66147C28.1303 1.66147 28.8947 1.97809 29.4583 2.54167C30.0218 3.10526 30.3385 3.86964 30.3385 4.66667C30.3385 5.4637 30.0218 6.22809 29.4583 6.79167L15.9999 20.25L10.3333 21.6667L11.7499 16L25.2083 2.54167Z" stroke="#14342B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {!isEditMode ?
                <ul className={styles.infosContainer}>
                    <li className={styles.infoContainer}>
                        <h3>Brand</h3>
                        <div className={styles.infoContent}>
                            <p>{brand}</p>
                        </div>
                    </li>
                    <li className={styles.infoContainer}>
                        <h3>Name</h3>
                        <div className={styles.infoContent}>
                            <p>{name}</p>
                        </div>
                    </li>
                    <li className={styles.infoContainer}>
                        <h3>Price</h3>
                        <div className={styles.infoContent}>
                            <p>${price}</p>
                        </div>
                    </li>
                    <li className={styles.infoContainer}>
                        <h3>Discount</h3>
                        <div className={styles.infoContent}>
                            <p>{discount}</p>
                        </div>
                    </li>
                </ul>
                :
                <form id="update-form" className={styles.infosContainer} action={handleSubmit}>
                    <label htmlFor="brand" className={styles.infoContainer}>
                        <h3>Brand</h3>
                        <input className={styles.infoContent}
                            id="brand"
                            name="brand"
                            type="text"
                            placeholder={brand}
                        >
                        </input>
                    </label>
                    <label className={styles.infoContainer}>
                        <h3>Name</h3>
                        <input className={styles.infoContent}
                            id="name"
                            name="name"
                            type="text"
                            placeholder={name}
                        >
                        </input>
                    </label>
                    <label className={styles.infoContainer}>
                        <h3>Price</h3>
                        <input className={styles.infoContent}
                            id="price"
                            name="price"
                            type="number"
                            placeholder={`$${price}`}
                        >
                        </input>
                    </label>
                    <label className={styles.infoContainer}>
                        <h3>Discount</h3>
                        <input className={styles.infoContent}
                            id="discount"
                            name="discount"
                            type="number"
                            placeholder={`$${discount}`}
                            step={0.01}
                        >
                        </input>
                    </label>
                </form>
            }
            {isEditMode &&
                <div className={styles.buttonsContainer}>
                    <div className={styles.buttonContainer}>
                        <button className={styles.deleteBtn} type="button" onClick={async () => await handleDelete()}>
                            {isPendingDelete ?
                                <div className={styles.loader}><div className={`${styles.spinner} ${styles.redSpinner}`}></div></div>
                                : <p>DELETE</p>
                            }
                        </button>
                        {(isPendingDelete) &&
                            <p className={`${styles.successMessage} ${showDeleteMessage ? styles.visible : styles.hidden} ${styles.red}`}>{deleteMessage ? 'Product deleted Successfully' : 'Failed to delete prodcut'}</p>
                        }
                    </div>
                    <div className={styles.buttonContainer}>
                        <button className={styles.submitBtn} form="update-form" type="submit">
                            {isPendingSubmit ?
                                <div className={styles.loader}><div className={styles.spinner}></div></div>
                                : <p>SUBMIT</p>
                            }
                        </button>
                        {(isPendingSubmit) &&
                            <p className={`${styles.successMessage} ${showUpdateMessage ? styles.visible : styles.hidden} ${styles.green}`}>{updateMessage ? 'Product updated Successfully' : 'Failed to update prodcut'}</p>
                        }
                    </div>
                </div>
            }
        </div>
    )
}
