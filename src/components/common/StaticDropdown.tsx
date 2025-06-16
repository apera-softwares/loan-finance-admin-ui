import React, { useEffect, useRef, useState } from "react";
import { FiChevronDown } from "react-icons/fi";

interface StaticDropdownProps {
  options: string[];
}

const StaticDropdown: React.FC<StaticDropdownProps> = ({ options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Label */}
      <div
        className="flex justify-between items-center   cursor-pointer "
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>{options[0]}</span>
        <FiChevronDown
          className={`text-gray-600 transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      {/* Dropdown List */}
      {isOpen && (
        <ul className="absolute left-0 mt-2 w-full border rounded-md shadow-lg bg-white z-10">
          {options.slice(1).map((option, index) => (
            <li
              key={index}
              className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StaticDropdown;
