"use client";
import React, { useState } from "react";

type WithdrawalRangeSliderProps = {
  maxAmount: number;
  value:number;
  onChange: (value: number) => void;
};

const USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

export default function WithdrawalRangeSlider({
  maxAmount,
  value,
  onChange,
}: WithdrawalRangeSliderProps) {


  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    onChange(newValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = Number(e.target.value);

    if (isNaN(newValue)) newValue = 0;
    newValue = Math.max(0, Math.min(maxAmount, newValue));

    onChange(newValue);
  };

  return (
    <div className="flex flex-col space-y-5 w-full bg-white p-6 rounded-lg border ">
      <label className="font-semibold text-gray-700  mb-3">
        Select Loan Amount
      </label>

      <input
        type="number"
        min={0}
        max={maxAmount}
        value={value}
        onChange={handleInputChange}
        className=" rounded-md px-4 py-2 w-full text-gray-500 text-lg font-medium   border border-gray-200 focus:border-gray-300 outline-none"
        placeholder="Enter amount"
      />

      {/* Slider */}
      <div className="w-full flex flex-col space-y-2">
        <input
          type="range"
          min={0}
          max={maxAmount}
          value={value}
          onChange={handleSliderChange}
          className="w-full appearance-none h-2 bg-blue-200 rounded-lg outline-none"
        />

        {/* Min / Max Labels  */}
        <div className="flex justify-between text-sm text-gray-600 px-1">
          <span>{USDollar.format(`0`)}</span>
          <span>{USDollar.format(`${maxAmount||0}`)}</span>
        </div>
      </div>
    </div>
  );
}
