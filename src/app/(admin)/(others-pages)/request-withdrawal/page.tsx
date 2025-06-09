"use client";
import React,{useState} from "react";
import { Toaster } from "react-hot-toast";
import WithdrawalRangeSlider from "@/components/withdrawal/WithdrawalRangeSlider";
import { useAppSelector } from "@/lib/redux/hooks";
import SelectLoanTerm from "@/components/withdrawal/SelectLoanTerm2";

// const cards: CardData[] = [
//     {
//       id: 1,
//       title: "6 Months",
//       totalFees: 8000,
//       totalCost: 12000,
//       details: [
//         { date: "2025-06-01", principal: 4000, fees: 500, totalDue: 4500 },
//         { date: "2025-06-02", principal: 3500, fees: 300, totalDue: 3800 },
//       ],
//     },
//     {
//       id: 2,
//       title: "12 Months",
//       totalFees: 6000,
//       totalCost: 9000,
//       details: [
//         { date: "2025-06-03", principal: 3000, fees: 400, totalDue: 3400 },
//         { date: "2025-06-04", principal: 2500, fees: 200, totalDue: 2700 },
//       ],
//     },
//     {
//       id: 3,
//       title: "18 Months",
//       totalFees: 6000,
//       totalCost: 9000,
//       details: [
//         { date: "2025-06-03", principal: 3000, fees: 400, totalDue: 3400 },
//         { date: "2025-06-04", principal: 2500, fees: 200, totalDue: 2700 },
//       ],
//     },
//   ];

export default function RequestWithdrawal() {

  const {userProfile} = useAppSelector((state)=>state.userProfile);
  const maxLimit =userProfile?.UserDetails?.[0]?.availableCredit||0;
  const [principal, setPrincipal] = useState<number>(0);
  const interestRate = userProfile?.UserDetails?.[0]?.interestRate||0;



  return (
    <div className="w-full ">
      <Toaster />
      <div className="w-full max-w-2xl mx-auto">
        <div className="w-full mb-6">
          <WithdrawalRangeSlider maxAmount={maxLimit} onChange={(value:number)=> setPrincipal(Number(value))}/>
        </div>
        <div className="w-full">
          <div className="w-full mb-4">
              <h2 className=" font-semibold">Select Loan Term</h2>
          </div>
          <SelectLoanTerm
            principal={principal}
            interestRate={interestRate}
            cards={[
            { id: 1, months: 6, title: "6 Month" },
            { id: 2, months: 12, title: "12 Month" },
            { id: 3, months: 18, title: "18 Month" },
            ]}
          />

        </div>
   
      </div>
    </div>
  );
}
