"use client"
import React, { useState,useRef } from "react";
import CommonHeading from "@/components/common/CommonHeading";
import { CiSearch } from "react-icons/ci";
import { HiOutlinePlus } from "react-icons/hi";
import { Toaster } from "react-hot-toast";
import ProductCatalogTable from "@/components/product-catalog/ProductCatalogTable";
import { FiEdit } from "react-icons/fi";
import AddEditProductCatalogForm from "@/components/product-catalog/AddEditProductCatalogForm";


interface FormState {
  name: string;
  bulletPoint1:string;
  bulletPoint2:string;
  bulletPoint3:string;
  pitch:string;
  team:string;
  members:string;
  status:string;
}

interface Filters {
    searchQuery:string,
    status:string,
}

export default function ProductCatalog(){

    const [filters,setFilters] = useState<Filters>({
        searchQuery:"",
        status:"",
    })
    const [editProductCatalogData,setEditProductCatalogData] = useState<any|null>(null);
    const formRef = useRef<HTMLDivElement>(null)

    const handleEditProductCatalog = (data:any)=>{
         setEditProductCatalogData(data);
    }


    const handlesScrollFormToTop=()=>{

        if(formRef && formRef.current)
        {
            formRef.current.scrollIntoView({
                behavior:"smooth"
            })
        }
    }

    return (  <div className="">
            <Toaster />
            {/* Top Bar: Left (Heading), Right (Search + Actions) */}
            <div className="flex flex-col lg:flex-row items-start justify-between lg:items-center gap-4  mb-6">
                {/* Left: Heading */}
                <div className=" w-full lg:w-1/2 ">
                    <CommonHeading
                        pageTitle="Product Catalog"
                        description="Manage products available for referral, assign them to teams, and keep content up to date."
                    />
                </div>

                {/* Right: Actions */}
                <div className="flex flex-wrap justify-start lg:justify-end items-center gap-3 w-full lg:w-1/2 ">
                    {/* Search Input */}
                    <div className="relative h-11">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            <CiSearch />
                        </span>
                        <input
                            type="text"
                            placeholder="Search by name, product, date"
                            name="searchQuery"
                            value={filters.searchQuery}
                            onChange={(e) => setFilters((prevFilters:Filters)=>({...prevFilters,searchQuery:e.target.value}))}
                            className="pl-10 h-11 pr-4 py-2 border border-gray-300 rounded-md focus:outline-[#FFA819]"
                        />
                    </div>

                        {/* Filter By Asc Des */}
                    <select

                        className="border border-[#151D48] w-32 h-11 text-[#151D48] rounded-md text-sm justify-center text-center outline-none"
                        value={filters.status}
                        onChange={(e) => setFilters((prevFilters:Filters)=>({...prevFilters,status:e.target.value}))}
                        >
                        <option value="">Filter : Status</option>
                        <option value="true">Active</option>
                        <option value="false">Inactive</option>
                    </select>
                    

                    <button
                        onClick={handlesScrollFormToTop}
                        className="h-11 bg-amber-500 text-white rounded-md text-md px-4 justify-center text-center outline-none flex items-center gap-1 hover:bg-amber-600">
                        <HiOutlinePlus className="text-white"/>
                       Add New Product
                    </button>

                     {/* <div className="w-32 h-11 relative rounded-md">
                        <div className="w-32 h-11 left-0 top-0 absolute bg-amber-500 rounded-md" />
                        <div className="left-[36px] top-[14.43px] absolute justify-start text-white text-sm font-medium font-['Montserrat']">CSV/PDF</div>
                    </div> */}

           

                    {/* Upload Button */}
                    {/* <div className="w-32 h-11 relative rounded-md">
                        <div className="w-32 h-11 left-0 top-0 absolute bg-amber-500 rounded-md" />
                        <div className="left-[36px] top-[14.43px] absolute justify-start text-white text-sm font-medium font-['Montserrat']">CSV/PDF</div>
                    </div> */}

                </div>
            </div>

            {/* Table */}
            <div className="mb-10">
            
             <ProductCatalogTable filters={filters}  onEdit={handleEditProductCatalog}  />
            </div>


            {/* add or edit product form */}

        <div className="w-full " ref={formRef}>
            <div className="w-full flex  items-start sm:items-center justify-between gap-6 mb-5">
                    <h1 className=" text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800 dark:text-white/90"
                    x-text="pageName">
                    Add New Product or Edit Product             
               </h1>
             <button className="flex items-center flex-nowrap gap text-[#FF9912] text-base font-medium  ">
             <FiEdit className=" mr-1.5"/>
             Edit
             </button>
            </div>

             <AddEditProductCatalogForm editData={editProductCatalogData} onEditSuccess={()=>setEditProductCatalogData(null)} />

        </div>


        </div>);
}