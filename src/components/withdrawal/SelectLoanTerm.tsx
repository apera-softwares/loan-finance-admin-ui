"use client";
import React, { useState } from "react";

export type CardDetail = {
  date: string;
  principal: number;
  fees: number;
  totalDue: number;
};

export type CardData = {
  id: number;
  title?: string; // optional
  totalFees: number;
  totalCost: number;
  details: CardDetail[];
};

type SelectableCardListProps = {
  cards: CardData[];
};

export default function SelectLoanTerm({ cards }: SelectableCardListProps) {
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);

  const toggleCard = (id: number) => {
    if (selectedCardId === id) {
      setSelectedCardId(null); // Deselect
    } else {
      setSelectedCardId(id); // Select
    }
  };

  return (
    <div className="w-full space-y-4">
      {cards.map((card) => {
        const isSelected = selectedCardId === card.id;
        return (
          <div
            key={card.id}
            className={`border rounded-lg overflow-hidden transition-all duration-500 ${
              isSelected ? "bg-blue-50 border-blue-500 shadow-lg" : "bg-white hover:bg-blue-50 hover:shadow-lg"
            }`}
          >
            {/* Card Header */}
            <div
              className="flex items-center justify-between p-6 cursor-pointer"
              onClick={() => toggleCard(card.id)}
            >
              {/* Radio Button like */}
              <div className="flex items-center space-x-2">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors duration-300 ${
                    isSelected ? "border-blue-600" : "border-gray-400"
                  }`}
                >
                  {isSelected && (
                    <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  )}
                </div>
                <span className="font-semibold text-gray-800">
                  {card.title ? card.title : `Select Plan ${card.id}`}
                </span>
              </div>

              {/* Total Fees / Cost Summary */}
              <div className="text-right space-y-1 text-sm text-gray-700">
                <div>Total Fees: ₹{card.totalFees}</div>
                <div>Total Cost: ₹{card.totalCost}</div>
              </div>
            </div>

            {/* Collapsible Table */}
            {isSelected && (
              <div className="p-6  bg-white animate-fade-in ">
               <div className="w-full mb-4">
                <h2 className=""> Repayment Schedule</h2>

               </div>
               <div className="w-full ">
                 <table className="w-full text-sm text-left border-collapse ">
                  <thead>
                    <tr className="text-gray-700 border-b">
                      <th className="py-2 px-2">Date</th>
                      <th className="py-2 px-2">Principal</th>
                      <th className="py-2 px-2">Fees</th>
                      <th className="py-2 px-2">Total Due</th>
                    </tr>
                  </thead>
                  <tbody>
                    {card.details.map((row, index) => (
                      <tr
                        key={index}
                        className="border-b last:border-none text-gray-800"
                      >
                        <td className="py-2 px-2">{row.date}</td>
                        <td className="py-2 px-2">₹{row.principal}</td>
                        <td className="py-2 px-2">₹{row.fees}</td>
                        <td className="py-2 px-2">₹{row.totalDue}</td>
                      </tr>
                    ))}
                    {/* Total Row */}
                    <tr className="font-semibold text-gray-900">
                      <td className="py-2 px-2">Total</td>
                      <td className="py-2 px-2">
                        ₹
                        {card.details.reduce(
                          (sum, row) => sum + row.principal,
                          0
                        )}
                      </td>
                      <td className="py-2 px-2">
                        ₹
                        {card.details.reduce((sum, row) => sum + row.fees, 0)}
                      </td>
                      <td className="py-2 px-2">
                        ₹
                        {card.details.reduce(
                          (sum, row) => sum + row.totalDue,
                          0
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
               </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}


