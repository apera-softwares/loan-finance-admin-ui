"use client";
import { FORM_INPUT_CLASS,  REQUIRED_ERROR } from "@/constant/constantClassName";
import React,{useState,useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { createProductCatalog,fetchProductCatalogs, updateProductCatalog,deleteProductCatalog, } from "@/lib/redux/slices/productCatalogSlice";
import toast, { Toaster } from "react-hot-toast";
import Radio from "../form/input/Radio";
import Button from "../ui/button/Button";
import Select from "../form/Select";



interface FormState {
  name: string;
  bulletPoint1:string;
  bulletPoint2:string;
  bulletPoint3:string;
  elevatorPitch:string;
  team:string;
  members:string;
  status:string;
}

interface PaginationState {
    currentPage:number,
    totalPages:number,
}

interface FiltersState {
    searchQuery:string,
    status:string,
}



interface AddEditProductCatalogFormProps {

  filters:FiltersState,
  paginationData:PaginationState,
  onEditSuccess:()=>void;
  editData:any;

}


const TEXT_SIZE = "text-base";

const Teams = [
    { value: "A_TEAM", label: "Assign To A-Team(s)" },
    { value: "B_TEAM", label: "Assign To B-Team(s)" },
];

const AddEditProductCatalogForm:React.FC<AddEditProductCatalogFormProps> = ({filters,paginationData,editData,onEditSuccess}) => {

  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState<FormState>({ name: "", bulletPoint1:"",bulletPoint2:"",bulletPoint3:"",elevatorPitch:"",team:"",members:"",status:""});

  const[loading,setLoading] = useState<boolean>(false);
  const[errors,setErrors] = useState({
     name: "", bulletPoint1:"",bulletPoint2:"",bulletPoint3:"",elevatorPitch:"",team:"",members:"",status:""
    })
  




  useEffect(() => {
    if (editData) 
     {
      setFormData(editData);
     }
  }, [editData]);
  

    const validateFormData = () => {
    let isValidData = true;
    const tempErrors = { ...errors };
 
    const nameRegex = /^[A-Za-z]+(-[A-Za-z]+)*$/;;
  
    //validate name 
    if (formData.name.trim() === "") {
      tempErrors.name= "Name is required";
      isValidData = false;
    } else {
      tempErrors.name = "";
    }


    //validate  bullet points

    if (formData.bulletPoint1.trim() === "") {
      tempErrors.bulletPoint1= "Bullet point1 is required";
      isValidData = false;
    } else {
      tempErrors.bulletPoint1 = "";
    }

    if (formData.bulletPoint2.trim() === "") {
      tempErrors.bulletPoint2= "Bullet point2 is required";
      isValidData = false;
    } else {
      tempErrors.bulletPoint2 = "";
    }

    if (formData.bulletPoint3.trim() === "") {
      tempErrors.bulletPoint3= "Bullet point3 is required";
      isValidData = false;
    } else {
      tempErrors.bulletPoint3 = "";
    }


    //validate elevatorPitch
    if (formData.elevatorPitch.trim() === "") {
      tempErrors.elevatorPitch= "Elevator Pitch is required";
      isValidData = false;
    } else {
      tempErrors.elevatorPitch = "";
    }

    //validate team
    if (formData.team.trim() === "") {
      tempErrors.team= "Team is required";
      isValidData = false;
    } else {
      tempErrors.team = "";
    }

    //validate members 
    if (formData.members.trim() === "") {
      tempErrors.members= "Members is required";
      isValidData = false;
    } else {
      tempErrors.members = "";
    }

    //validate status
    if (formData.status.trim() === "") {
      tempErrors.status= "Status is required";
      isValidData = false;
    } else {
      tempErrors.status = "";
    }


    setErrors(tempErrors);
    return isValidData;
    
  };


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClearFormData = ()=>{
    setFormData({ name: "", bulletPoint1:"",bulletPoint2:"",bulletPoint3:"",elevatorPitch:"",team:"",members:"",status:""});
    onEditSuccess();
  }


  const handleSubmit = async () => {
   
    try {


      //if(!validateFormData()) return ;

      setLoading(true);

      // const payload = {
      //   name:formData.name,
      //   bulletPoints:`${formData.bulletPoint1},${formData.bulletPoint2},${formData.bulletPoint3}`,
      //   elevatorPitch:formData.elevatorPitch,
      //   status:formData.status,
      //   stateId:"22",

      // }

      const payload = {
        name:"test product catalog 1",
        status:true,
        bulletPoints: "product cataglog 1 point 1,product cataglog 1 point 2,product cataglog 1 point 3",
        elevatorPitch: "product catalog 1 elevator pitch",
        stateId:"22",
       }

      if (editData) {
        await dispatch(updateProductCatalog({ id: editData?.id, ...formData })).unwrap();

        toast.success("Updated product catalog successfully");
        
      } else {
        await dispatch(createProductCatalog(payload)).unwrap();
     
        toast.success("Created product catalog successfully");
      }

      handleClearFormData();
      dispatch(fetchProductCatalogs({...filters,...paginationData}));
  
    } catch (error: any) {
      console.log("error while add edit product catalog",error)
      toast.error("Something went wrong");
    }
    finally{
      setLoading(false);
    
      
    }
  };



  const handleDelete = async (id: string) => {
   
    try {
      await dispatch(deleteProductCatalog(id)).unwrap();
      toast.success("Deleted successfully");
      dispatch(fetchProductCatalogs({...filters,...paginationData}));
    } catch (err: any) {
      toast.error(err || "Failed to delete");
    }
  };


  return (
    <div className="w-full max-w-[1500px] bg-white px-6 md:px-8 py-8 rounded-xl ">

      <div className="w-full ">
        <div className="w-full space-y-8  md:space-10 lg:space-y-12 mb-8 md:mb-10">
          <div className="w-full grid grid-cols-1  ">
            <div className="w-full">
              <input
                type="text"
                placeholder="Product Name"
                name="name"
                className={`${FORM_INPUT_CLASS} ${TEXT_SIZE}`}
                value={formData.name}
                onChange={handleInputChange}
              />
              <span className={`${REQUIRED_ERROR}`}>{errors.name||""}</span>
            </div>
         
          </div>

          <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12 ">
            <div className="w-full">
              <input
                type="text"
                placeholder="Bullet point 1"
                name="bulletPoint1"
                className={`${FORM_INPUT_CLASS} ${TEXT_SIZE}`}
                value={formData.bulletPoint1}
                onChange={handleInputChange}
              />
              <span className={`${REQUIRED_ERROR}`}>{errors.bulletPoint1||""}</span>
            </div>
            <div className="w-full">
              <input
                type="text"
                placeholder="Bullet point 2"
                name="bulletPoint2"
                className={`${FORM_INPUT_CLASS} ${TEXT_SIZE}`}
                value={formData.bulletPoint2}
                onChange={handleInputChange}
              />
              <span className={`${REQUIRED_ERROR}`}>{errors.bulletPoint2||""}</span>
            </div>
            <div className="w-full">
              <input
                type="text"
                placeholder="Bullet point  3"
                name="bulletPoint3"
                className={`${FORM_INPUT_CLASS} ${TEXT_SIZE}`}
                value={formData.bulletPoint3}
                onChange={handleInputChange}
              />
              <span className={`${REQUIRED_ERROR}`}>{errors.bulletPoint3||""}</span>
            </div>
          </div>
              <div className="w-full grid grid-cols-1 ">
            <div className="w-full">
              <textarea
                placeholder="Write an elevator pitch"
                name="elevatorPitch"
                className={`  ${FORM_INPUT_CLASS} ${TEXT_SIZE} h-24 `}
                value={formData.elevatorPitch}
                onChange={handleInputChange}

              />
              <span className="text-sm text-red-500">{errors.elevatorPitch||""}</span>
            </div>
          </div>

          <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12 ">
           
            <div className="w-full ">


                      <Select
                                options={Teams}
                                defaultValue={formData.team}
                                placeholder="Select Team"
                                onChange={(value: string) => setFormData((prevData:FormState)=>({...prevData,team:value}))}
                                className="dark:bg-dark-900"
                            />
              <span className={`${REQUIRED_ERROR}`}>{errors.team||""}</span>
            </div>
            <div className="w-full ">
              <input
                type="text"
                name="members"
                placeholder={`Assign To member's`}
                className={`${FORM_INPUT_CLASS} ${TEXT_SIZE}`}
                value={formData.members}
                onChange={handleInputChange}
              />
              <span className={`${REQUIRED_ERROR}`}>{errors.members||""}</span>
            </div>
            <div className="w-full ">
             <div className="flex items-center  gap-6 ">
              <label className="block text-base font-medium text-gray-700  ">Status</label>
                  <div className="flex items-center flex-wrap space-x-6  ">
                      <Radio
                                    id="radio1"
                                    label="Active"
                                    name="status"
                                    value="active"
                                    checked={formData.status === "active"}
                                    onChange={(value) => {setFormData((prev:FormState)=>({...prev,status:value}))}}
                                   
                                />
                                <Radio
                                    id="radio2"
                                    label="Inactive"
                                    name="status"
                                    value="inactive"
                                    checked={formData.status === "inactive"}
                                    onChange={(value) => {setFormData((prev:FormState)=>({...prev,status:value}))}}
                                  
                                />

  </div>
</div>

              <span className={`${REQUIRED_ERROR}`}>{errors.status||""}</span>
            </div>
          </div>
          

      
        </div>
        <div className="w-full flex justify-center md:justify-start items-center gap-4  ">

          <Button size="md" onClick={handleSubmit}>
                       {loading?"...loading":(editData ? "Update Product":"Save Product")} 
                    </Button>
                    <Button size="md" variant="outline" onClick={handleClearFormData}>
                        Cancel
                    </Button>

        </div>

      </div>
    </div>
  );
};

export default AddEditProductCatalogForm;
