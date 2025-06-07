"use client";
import React, { useState, useRef, useEffect } from "react";

interface MonthDropdownProps {
  selectedMonth: string;
  onChange: (month: string) => void;
}

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const MonthDropdown: React.FC<MonthDropdownProps> = ({ selectedMonth, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelectMonth = (month: string) => {
    onChange(month);
    setIsOpen(false);
  };

  return (
    <div className="relative w-36 " ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full bg-[#FCFDFD] border border-[#D5D5D5] text-sm font-medium text-gray-400 py-2 px-4 rounded leading-tight outline-none  "
      >
        <span>{selectedMonth}</span>
        {/* Arrow */}
        <svg
          className={`h-5 w-5 transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          viewBox="0 0 20 20"
        >
          <path fill="currentcolor" d="M5.516 7.548L10 12.032l4.484-4.484 1.06 1.06L10 14.152l-5.544-5.544z" />
        </svg>
      </button>

      {isOpen && (
        <ul className="absolute z-10 mt-0.5 w-full bg-white border border-[#D5D5D5] rounded shadow-lg max-h-60 overflow-y-auto">
          {months.map((month) => (
            <li
              key={month}
              onClick={() => handleSelectMonth(month)}
              className={`text-sm px-4 py-2 cursor-pointer hover:bg-blue-100 ${
                month === selectedMonth ? "bg-blue-50 font-medium" : ""
              }`}
            >
              {month}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MonthDropdown;
