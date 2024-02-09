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
    description: string
    price: number
    apiUrl: string | undefined
}


export default function AdminProduct({ id, brand, name, price, description,image, apiUrl }:AdminProductProps) {
    const router = useRouter()
    const [isEditMode,setIsEditMode] = useState<boolean>(false)
    const [isPending, startTransition ] = useTransition()
    const [updateMessage,setUpdateMessage] = useState(false)
    const [deleteMessage,setDeleteMessage] = useState(false)
    const [showUpdateMessage, setShowUpdateMessage] = useState(false);
    const [showDeleteMessage, setShowDeleteMessage] = useState(false);
    
    const handleSubmit = async (formData:FormData) => {
        const updatedBrand = formData.get('brand') ? formData.get('brand'): brand
        const updatedName = formData.get('name') ? formData.get('name'): name
        const updatedPrice = formData.get('price') ? formData.get('price'): price
    
        const updatedProduct = {
            brand: updatedBrand,
            name: updatedName,
            price: updatedPrice,
        }

        startTransition(
            async () => {
                setUpdateMessage(false)
                try {
                    await fetch(`${apiUrl}/api/products/${id}`,{
                        method: 'put',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(updatedProduct),
                    })
                    router.refresh()
                    setUpdateMessage(true)
                    handleMessage(setShowUpdateMessage)
                } catch(err) {
                    console.log('error: ',err)
                    console.log('Failed to update product')
                    setUpdateMessage(false)
                    handleMessage(setShowUpdateMessage)
                }
            }
        )
    }

    const handleDelete = async () => {
        startTransition(
            async () => {
                setDeleteMessage(false)
                try {
                    await fetch(`${apiUrl}/api/products/${id}`,{
                        method: 'delete',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })
                    router.refresh()
                    setDeleteMessage(true)
                    handleMessage(setShowDeleteMessage)
                } catch(err) {
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
                    width={736}
                    height={736}
                    style={{
                    width: '100%',
                    height: 'auto',
                    }}
                />
            </div>
            {
                !isEditMode?
                    <ul className={styles.infosContainer}>
                            <li>
                                <h4>Brand</h4>
                                <div>
                                    <h5>{brand}</h5>
                                </div>
                            </li>
                            <li>
                                <h4>Name</h4>
                                <div>
                                    <h5>{name}</h5>
                                </div>
                            </li>
                            <li>
                                <h4>Price</h4>
                                <div>
                                    <h5>${price}</h5>
                                </div>
                            </li>
                    </ul>
                    :
                    <form id="update-form" className={styles.infosContainer} action={handleSubmit}>
                        <label htmlFor="brand">
                            <h4>Brand</h4>
                            <input
                                id="brand"
                                name="brand"
                                type="text"
                                placeholder={brand}
                            >
                            </input>
                        </label>
                        <label>
                            <h4>Name</h4>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                placeholder={name}
                            >
                            </input>
                        </label>
                        <label>
                            <h4>Price</h4>
                            <input
                                id="price"
                                name="price"
                                type="number"
                                placeholder={`$${price}`}
                            >
                            </input>
                        </label>
                    </form>
            }
            <div className={styles.leftSection}>
                <svg onClick={() => setIsEditMode(prevState=>!prevState)} className={`${styles.editContainer} ${isEditMode?'activeEdit':''}`} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.5833 4.66667H4.66659C3.91514 4.66667 3.19447 4.96518 2.66312 5.49654C2.13176 6.02789 1.83325 6.74856 1.83325 7.50001V27.3333C1.83325 28.0848 2.13176 28.8055 2.66312 29.3368C3.19447 29.8682 3.91514 30.1667 4.66659 30.1667H24.4999C25.2514 30.1667 25.972 29.8682 26.5034 29.3368C27.0347 28.8055 27.3333 28.0848 27.3333 27.3333V17.4167" stroke="#14342B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M25.2083 2.54167C25.7718 1.97809 26.5362 1.66147 27.3333 1.66147C28.1303 1.66147 28.8947 1.97809 29.4583 2.54167C30.0218 3.10526 30.3385 3.86964 30.3385 4.66667C30.3385 5.4637 30.0218 6.22809 29.4583 6.79167L15.9999 20.25L10.3333 21.6667L11.7499 16L25.2083 2.54167Z" stroke="#14342B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                { isEditMode &&
                    <div className={styles.buttonsContainer}>
                        <div className={styles.buttonContainer}>
                            <button className={styles.deleteBtn} type="button" onClick={async () => await handleDelete() }>
                                {isPending? 
                                    <div className={styles.loader}><div className={styles.spinner}></div></div>
                                    :<h4>DELETE</h4>
                                }
                            </button>
                            {(isPending) &&
                                <span className={`${styles.successMessage} ${showDeleteMessage? styles.visible: styles.hidden} ${styles.red}`}>{deleteMessage?'Product deleted Successfully':'Failed to delete prodcut'}</span>
                            }
                        </div>
                        <div className={styles.buttonContainer}>
                            <button className={styles.submitBtn} form="update-form" type="submit">
                                {isPending? 
                                    <div className={styles.loader}><div className={styles.spinner}></div></div>
                                    :<h4>SUBMIT</h4>
                                }
                            </button>
                            {(isPending) &&
                                <span className={`${styles.successMessage} ${showUpdateMessage? styles.visible: styles.hidden} ${styles.green}`}>{updateMessage?'Product updated Successfully':'Failed to update prodcut'}</span>
                            }
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}
