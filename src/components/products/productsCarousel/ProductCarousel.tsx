"use client"

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from './productsCarousel.module.css'
import Product from "@/components/product/Product";
import { ProductType } from "@/lib/types";
import { addToCart } from "@/components/addToCartBtn/actions";

export default function ProductCarousel({products}:{products:ProductType[]}) {
    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1.5,
        slidesToScroll: 1,
      };
      return (
        <section className={styles.carouselContainer}>
            <Slider {...settings}>
                    {products.map((prod : ProductType) => {
                            return(
                                <li key={prod._id.toString()} className={styles.carouselItem}>
                                    <Product 
                                        id={prod._id}
                                        brand={prod.brand} 
                                        name={prod.name}
                                        image = {prod.image}
                                        price={prod.price}
                                        showButton={false}
                                        addToCart={addToCart}
                                        discount={prod.discount}
                                    /> 
                                </li>)
                        })}
            </Slider>
        </section>
      );
}
