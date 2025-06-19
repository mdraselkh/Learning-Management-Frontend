"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";
import Loading from "@/app/loading";
import axiosInstance from "@/app/utils/axiosInstance";

const TransactionListTable = ({isDashboard}) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false); // Set initial loading state to true

  const fetchTransactionData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        "/api/payment/getAllPayments"
      );
      console.log(response);
      console.log(response.data.data);

      setTransactions(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactionData();
  }, []);

  const updateTransactionList = () => {
    fetchTransactionData();
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <DataTable
        columns={columns({ updateTransactionList: updateTransactionList })}
        data={transactions}
        isDashboard={isDashboard}
      />
    </div>
  );
};

export default TransactionListTable;
