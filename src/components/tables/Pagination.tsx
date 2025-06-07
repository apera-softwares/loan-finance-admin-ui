import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: any) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {

  return (
    <div className="w-full flex items-center  justify-between gap-3 ">
    
      <div className="w-full flex items-center">
        <p className="text-sm font-medium text-[#202224] text-nowrap">
         {`page ${currentPage} of ${totalPages}`}
        </p>
    
      </div>
      <div className="w-full flex items-center justify-end">
         <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className=" h-8 flex items-center justify-center rounded-l-lg border border-[#D5D5D5] bg-white px-4 py-2 text-[#202224] disabled:text-[#D5D5D5]  hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] text-sm"
      >
        <MdKeyboardArrowLeft className="text-lg"/>
      </button>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className=" h-8 flex items-center justify-center rounded-r-lg border border-[#D5D5D5] bg-white px-4 py-2 text-[#202224] disabled:text-[#D5D5D5]  text-sm hover:bg-gray-50  disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]"
      >
        <MdKeyboardArrowRight className="text-lg"/>
      </button>
      </div>
      
   
    </div>
  );
};

export default Pagination;

