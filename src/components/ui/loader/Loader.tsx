import React from 'react';
import { TbLoaderQuarter } from "react-icons/tb";


const Loader = () => {
  return (
   <span className="flex justify-center items-center text-white "><TbLoaderQuarter className="text-white text-2xl animate-spin duration-1000 "/></span>
  )
}

export default Loader
