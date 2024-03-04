import React from 'react';
import { Slider } from '../../components/hero/Slider';
import { Category } from '../../components/Category/Category';
import { Product } from '../../components/Products/Product.jsx';
export const Home = () => {

    return (
        <>
            <Slider />
            <Category />
            <Product />
        </>
    )
}