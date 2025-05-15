import Link from "next/link";
import React from "react";

interface CommonHeadingProps {
  pageTitle?: string;
  description?: string;
  sideDescription?: string;
}

const CommonHeading: React.FC<CommonHeadingProps> = ({ pageTitle, description, sideDescription }) => {
  return (
    <div className="mb-6">
    <h1
        className="text-3xl font-semibold text-gray-800 dark:text-white/90"
        x-text="pageName"
    >
        {pageTitle}      </h1>
    <div className="text-md text-[#1F1C3B]">
        {description}
    </div>
</div>
  );
};

export default CommonHeading;
