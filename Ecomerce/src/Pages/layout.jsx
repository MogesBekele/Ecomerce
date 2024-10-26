import Header from "../Components/header/header";
import React from "react";
import {Outlet} from 'react-router-dom'
import Footer from "../Components/footer/footer";
import Cart from "../Components/cart";
import { useContext } from "react";
import AppContext from "../Context";


export default function Layout(){
  const {cartvisble} = useContext(AppContext)
  return(
    <>
    <Header/>
    <Outlet/>
    {cartvisble&&<Cart/>}
    <Footer/>
    </>
  )
}