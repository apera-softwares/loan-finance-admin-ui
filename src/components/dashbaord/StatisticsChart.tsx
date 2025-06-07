"use client";
import React,{useState} from "react";
import { ApexOptions } from "apexcharts";
import MonthDropdown from "../common/MonthDropdown";
import dynamic from "next/dynamic";

// Dynamically import the ReactApexChart component
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function StatisticsChart() {

  const [selectedMonth, setSelectedMonth] = useState("January");
  const options: ApexOptions = {
    legend: {
      show: false,
      position: "top",
      horizontalAlign: "left",
    },
    colors: ["#4379EE"],
    chart: {
      fontFamily: "Poppins, sans-serif",
      height: 310,
      type: "area",
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: "straight",
      width: [1],
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
      },
    },
    markers: {
      size: 0,
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: {
        size: 6,
      },
    },
    grid: {
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      enabled: true,
      x: {
        formatter: function (value) {
          return `${value}`;
        },
      },
      y: {
        formatter: function (val) {
          return val + "%";
        },
      },
    },
    xaxis: {
      type: "category",
      categories: [
        "100",
        "200",
        "300",
        "500",
        "1k",
        "2k",
        "5k",
        "7k",
        "9k",
        "11k",
        "13k",
      ],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    yaxis: {
      min: 0,
      max: 100,
      tickAmount: 5, // Gives 0%, 20%, 40%, 60%, 80%, 100%
      labels: {
        style: {
          fontSize: "12px",
          colors: ["#6B7280"],
        },
        formatter: function (val) {
          return val + "%";
        },
      },
      title: {
        text: "",
        style: {
          fontSize: "0px",
        },
      },
    },
  };

  const series = [
    {
      name: "Conversion Rate",
      data: [20, 30, 40, 50, 60, 65, 70, 75, 80, 90, 100], // Example % data
    },
  ];

  return (
    <div className="rounded-2xl bg-white px-6 lg:px-8 py-8 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="flex flex-col  gap-4 sm:gap-5 mb-6 sm:flex-row sm:justify-between ">
        <div className="w-full">
          <h3 className="text-xl sm:text-2xl font-medium text-[#202224] dark:text-white/90">
            Funded Details
          </h3>
        </div>
        <div className="flex items-start w-full  sm:justify-end">
          <MonthDropdown
            selectedMonth={selectedMonth}
            onChange={(month) => setSelectedMonth(month)}
          />
        </div>
      </div>

      <div className="max-w-full overflow-x-auto custom-scrollbar ">
        <div className="min-w-[1000px] xl:min-w-full">
          <ReactApexChart
            options={options}
            series={series}
            type="area"
            height={310}
          />
        </div>
      </div>
    </div>
  );
}
