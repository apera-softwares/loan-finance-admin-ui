"use client";
import React from "react";
import { calculateAmortizationRow } from "./calculateAmortizationRow"; 

export type LoanTermOptions = {
  id: number;
  title: string; 
  months: number; 
};

type SelectableCardListProps = {
  loanTerms: LoanTermOptions[];
  principal: number;
  interestRate: number;
  selectedLoanTermId:number|null;
  onSelect:(loanTerm:(LoanTermOptions|null))=>void;
};


export default function SelectLoanTerm({
  loanTerms,
  principal,
  interestRate,
  selectedLoanTermId,
  onSelect
}: SelectableCardListProps) {


  const toggleCard = (loanTermData:LoanTermOptions) => {
    if (selectedLoanTermId === loanTermData.id) {
      onSelect(null);
    } else {
      onSelect(loanTermData);
    }
  };

  return (
    <div className="w-full space-y-4">
      {loanTerms.map((loanTerm) => {
        const isSelected = selectedLoanTermId === loanTerm.id;
        const amortizationRows = isSelected
          ? calculateAmortizationRow(principal, interestRate, loanTerm.months)
          : [];

        return (
          <div
            key={loanTerm.id}
            className={`border rounded-lg overflow-hidden transition-all duration-500 ${
              isSelected
                ? "bg-white border-primary shadow-lg"
                : "bg-white hover:shadow-lg"
            }`}
          >
          
            <div
              className="flex items-center justify-between p-6 cursor-pointer"
              onClick={() => toggleCard(loanTerm)}
            >
              {/* Radio Button like */}
              <div className="flex items-center space-x-2">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors duration-300 ${
                    isSelected ? "border-primary" : "border-gray-400"
                  }`}
                >
                  {isSelected && (
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                  )}
                </div>
                <span className="font-semibold text-gray-800">
                  {loanTerm.title}
                </span>
              </div>

              <div className="text-right space-y-1 text-sm text-gray-700">
                <div>{`Total Cost : $${principal}`}</div>
              </div>
            </div>

            {/* Collapsible Table */}
            {isSelected && (
              <div className="px-6 pb-6 bg-white animate-fade-in">
                <div className="w-full mb-6">
                  <h2 className="font-medium">Repayment Schedule</h2>
                </div>
                {
                  amortizationRows.length > 0 ? (   <div className="w-full overflow-x-auto">
                  <table className="w-full text-sm text-left border-collapse ">
                    <thead>
                      <tr className="text-gray-700 border-b">
                        <th className="py-2 px-2">Payment</th>
                        <th className="py-2 px-2">Interest</th>
                        <th className="py-2 px-2">Principal</th>
                        <th className="py-2 px-2">Balance</th>
                  
                      </tr>
                    </thead>
                    <tbody>
                      {amortizationRows.map((row) => (
                        <tr
                          key={row.paymentNumber}
                          className="border-b last:border-none text-gray-800"
                        >
                          <td className="py-2 px-2">{row.paymentNumber}</td>
                          <td className="py-2 px-2">
                            ${row.interest.toFixed(2)}
                          </td>
                          <td className="py-2 px-2">
                            ${row.principalPayment.toFixed(2)}
                          </td>
                          <td className="py-2 px-2">
                            ${row.remainingBalance.toFixed(2)}
                          </td>
                        </tr>
                      ))}

                      {/* totals */}
                      <tr className="font-semibold text-gray-900 border-t">
                      <td className="py-2 px-2">Total</td>
                      <td className="py-2 px-2">
                      ${amortizationRows.reduce((sum, r) => sum + r.interest, 0).toFixed(2)}
                      </td>
                      <td className="py-2 px-2">
                      ${amortizationRows.reduce((sum, r) => sum + r.principalPayment, 0).toFixed(2)}
                      </td>
                      <td className="py-2 px-2">
                      ${amortizationRows[amortizationRows.length - 1]?.remainingBalance.toFixed(2) || "0.00"}
                      </td>
                      </tr>
                    </tbody>
                  </table>
                </div>) : (  <p className="text-sm text-gray-500">No repayment data found.</p>)
                }
             
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
