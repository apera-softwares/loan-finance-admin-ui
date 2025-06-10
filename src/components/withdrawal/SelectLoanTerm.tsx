"use client";
import React, { useState } from "react";
import { calculateAmortizationRow } from "./calculateAmortizationRow"; 

export type CardData = {
  id: number;
  title: string; 
  months: number; 
};

type SelectableCardListProps = {
  cards: CardData[];
  principal: number;
  interestRate: number;
  onSelect:(loanTerm:(CardData|null))=>void;
};


export default function SelectLoanTerm({
  cards,
  principal,
  interestRate,
  onSelect
}: SelectableCardListProps) {
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);

  const toggleCard = (card:CardData) => {
    if (selectedCardId === card.id) {
      setSelectedCardId(null); 
      onSelect(null);
    } else {
      setSelectedCardId(card.id); 
      onSelect(card);
    }
  };

  return (
    <div className="w-full space-y-4">
      {cards.map((card) => {
        const isSelected = selectedCardId === card.id;
        const amortizationRows = isSelected
          ? calculateAmortizationRow(principal, interestRate, card.months)
          : [];

        return (
          <div
            key={card.id}
            className={`border rounded-lg overflow-hidden transition-all duration-500 ${
              isSelected
                ? "bg-white border-primary shadow-lg"
                : "bg-white hover:shadow-lg"
            }`}
          >
            {/* Card Header */}
            <div
              className="flex items-center justify-between p-6 cursor-pointer"
              onClick={() => toggleCard(card)}
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
                  {card.title}
                </span>
              </div>

              {/* Summary */}
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
                <div className="w-full overflow-x-auto">
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
