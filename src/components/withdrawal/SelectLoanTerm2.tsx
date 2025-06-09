"use client";
import React, { useState } from "react";
import { calculateAmortizationRow } from "./calculateAmortizationRow"; // import your function

export type CardData = {
  id: number;
  title?: string; // optional
  months: number; // <=== important: months per card!
};

type SelectableCardListProps = {
  cards: CardData[];
  principal: number;
  interestRate: number;
};

export default function SelectLoanTerm({
  cards,
  principal,
  interestRate,
}: SelectableCardListProps) {
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
        const amortizationRows = isSelected
          ? calculateAmortizationRow(principal, interestRate, card.months)
          : [];

        return (
          <div
            key={card.id}
            className={`border rounded-lg overflow-hidden transition-all duration-500 ${
              isSelected
                ? "bg-blue-50 border-blue-500 shadow-lg"
                : "bg-white hover:bg-blue-50 hover:shadow-lg"
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

              {/* Summary */}
              <div className="text-right space-y-1 text-sm text-gray-700">
                <div>Principal: {principal}</div>
              </div>
            </div>

            {/* Collapsible Table */}
            {isSelected && (
              <div className="p-6 bg-white animate-fade-in">
                <div className="w-full mb-4">
                  <h2 className="font-medium mb-2">Repayment Schedule</h2>
                </div>
                <div className="w-full overflow-x-auto">
                  <table className="w-full text-sm text-left border-collapse">
                    <thead>
                      <tr className="text-gray-700 border-b">
                        <th className="py-2 px-2">Payment #</th>
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
                            ₹{row.interest.toFixed(2)}
                          </td>
                          <td className="py-2 px-2">
                            ₹{row.principalPayment.toFixed(2)}
                          </td>
                          <td className="py-2 px-2">
                            ₹{row.remainingBalance.toFixed(2)}
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
