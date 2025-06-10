"use client";
import React,{useState} from "react";
import { Toaster } from "react-hot-toast";
// import axios from 'axios';
import WithdrawalRangeSlider from "@/components/withdrawal/WithdrawalRangeSlider";
import { useAppSelector } from "@/lib/redux/hooks";
import SelectLoanTerm from "@/components/withdrawal/SelectLoanTerm";
// import { BACKEND_API } from "@/api";

const loanTerms = [
            { id: 1, months: 6, title: "6 Month" },
            { id: 2, months: 12, title: "12 Month" },
            { id: 3, months: 18, title: "18 Month" },
            ];

export default function RequestWithdrawal() {

  const {userProfile} = useAppSelector((state)=>state.userProfile);
  const loggedInUser = useAppSelector((state)=>state.user.user);
  const maxLimit =userProfile?.UserDetails?.[0]?.availableCredit||0;
  const interestRate = userProfile?.UserDetails?.[0]?.interestRate||0;
  const [principal, setPrincipal] = useState<number>(0);
  const [selectedLoanTerms,setSelectedLoanTerm] = useState<any>(null);
  console.log(loggedInUser);


//  const handleSubmitLoanRequest= async()=> {
//   try {

//      const loanData = {
//       principal:"",
//       loanTerms:"",
//      };
//     const token = loggedInUser.token;
//     const response = await axios.post(
//       `${BACKEND_API}`,
//       loanData,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       }
//     );

//     console.log('Loan request submitted successfully:', response.data);
   
//   } catch (error: any) {
    
//   }
 
   
// }

  
  return (
    <div className="w-full ">
      <Toaster />
      <div className="w-full max-w-2xl mx-auto">
        <div className="w-full mb-6">
          <WithdrawalRangeSlider maxAmount={maxLimit} onChange={(value:number)=> setPrincipal(Number(value))}/>
        </div>
        <div className="w-full mb-8">
          <div className="w-full mb-4">
              <h2 className=" font-semibold">Select Loan Term</h2>
          </div>
          <SelectLoanTerm
            principal={principal}
            interestRate={interestRate}
            onSelect={(loanTerm:any)=>setSelectedLoanTerm(loanTerm)}
            cards={loanTerms}
          />

        </div>
        <div className="w-full flex items-center justify-center">
          {
            selectedLoanTerms && ( <button className=" mx-auto px-6 py-2 bg-primary hover:bg-primary-hover text-white font-medium rounded-lg cursor-pointer transition-all duration-500 ">Submit Loan Request</button>)
          }
         
        </div>
   
      </div>
    </div>
  );
}
