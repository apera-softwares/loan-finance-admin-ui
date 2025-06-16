"use client";
import React, { useEffect, useState } from "react";
import { BACKEND_API } from "@/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import Spinner from "../common/Spinner";
import axios from "axios";
import {
  TABLE_CLASS,
  TABLE_CELL_HEADER_CLASS,
  TABLE_CELL_REGULAR_CLASS,
  TABLE_HEADER_CLASS,
  TABLE_RAW_CLASS,
} from "@/constant/constantClassName";

const BankTransactionsTable = ({}) => {
  const dispatch = useAppDispatch();
  const [bankTransactions, setBankTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { user: loggedInUser } = useAppSelector((state) => state.user);
  const { userProfile } = useAppSelector((state) => state.userProfile);

  useEffect(() => {
    if (!userProfile?.accountConnectedWithPlaid) return;
    fetchTransactions();
  }, [dispatch]);

  async function fetchTransactions() {
    try {
      setLoading(true);
      const accessToken = userProfile?.UserDetails?.[0]?.AccessToken;
      const response = await axios.get(
        `${BACKEND_API}api/transactions?access_token=${encodeURIComponent(
          accessToken
        )}`,
        {
          headers: {
            "ngrok-skip-browser-warning": "true",
            "Content-Type": "application/json",
            Authorization: `Bearer ${loggedInUser?.token}`,
          },
        }
      );

      const transactionData = response.data;
      console.log("Transaction data", transactionData);
      setBankTransactions(transactionData?.latest_transactions || []);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full ">
      <div className="w-full overflow-hidden  rounded-t-[14px] ">
        <div className="w-full overflow-x-auto">
          <div className="w-full  ">
            {loading ? (
              <Spinner />
            ) : (
              <Table className={`${TABLE_CLASS}`}>
                <TableHeader>
                  <TableRow className={`${TABLE_HEADER_CLASS}`}>
                    <TableCell
                      isHeader
                      className={`${TABLE_CELL_HEADER_CLASS}`}
                    >
                      Sr.No
                    </TableCell>
                    <TableCell
                      isHeader
                      className={`${TABLE_CELL_HEADER_CLASS}`}
                    >
                      Merchant Name
                    </TableCell>
                    <TableCell
                      isHeader
                      className={`${TABLE_CELL_HEADER_CLASS}`}
                    >
                      Amount
                    </TableCell>
                    <TableCell
                      isHeader
                      className={`${TABLE_CELL_HEADER_CLASS}`}
                    >
                      Date
                    </TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bankTransactions && bankTransactions.length > 0 ? (
                    bankTransactions.map((transItem: any, index: number) => (
                      <TableRow
                        key={transItem?.id}
                        className={`${TABLE_RAW_CLASS}`}
                      >
                        <TableCell className={`${TABLE_CELL_REGULAR_CLASS}`}>
                          <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                            {index + 1}
                          </span>
                        </TableCell>
                        <TableCell className={`${TABLE_CELL_REGULAR_CLASS}`}>
                          <span className="uppercase">
                            {`${transItem?.merchant_name || "NA"}`}
                          </span>
                        </TableCell>
                        <TableCell className={`${TABLE_CELL_REGULAR_CLASS}`}>
                          <span>
                            {transItem?.amount
                              ? `$ ${transItem?.amount}`
                              : `NA`}
                          </span>
                        </TableCell>
                        <TableCell className={`${TABLE_CELL_REGULAR_CLASS}`}>
                          {`${transItem?.date || "NA"}`}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow className={`${TABLE_RAW_CLASS}`}>
                      <TableCell className={`${TABLE_CELL_REGULAR_CLASS}`}>
                        No transactions found.
                      </TableCell>
                      <TableCell className={`${TABLE_CELL_REGULAR_CLASS}`}>
                        {``}
                      </TableCell>
                      <TableCell className={`${TABLE_CELL_REGULAR_CLASS}`}>
                        {``}
                      </TableCell>
                      <TableCell className={`${TABLE_CELL_REGULAR_CLASS}`}>
                        {``}
                      </TableCell>
                      <TableCell className={`${TABLE_CELL_REGULAR_CLASS}`}>
                        {``}
                      </TableCell>
                      <TableCell className={`${TABLE_CELL_REGULAR_CLASS}`}>
                        {``}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankTransactionsTable;
