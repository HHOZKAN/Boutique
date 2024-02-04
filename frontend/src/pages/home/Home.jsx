import React from 'react';
import Svg from '../../assets/react.svg'
import { AiOutlineSearch } from 'react-icons/ai';
import { Slider } from '../../components/hero/Slider';
import { Order } from '../../components/hero/Order';
import { Category } from '../../components/Category/Category';
export const Home = () => {
   
    return (
        <>
            <Slider />
            <Order />
            <Category />
        </>
    )
}