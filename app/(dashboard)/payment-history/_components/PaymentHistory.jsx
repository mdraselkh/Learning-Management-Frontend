"use client";
import Loading from "@/app/loading";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { DataTable } from "./data-table";
import { useSelector } from "react-redux";
import { columns } from "./columns";

const PaymentHistory = ({isDashboard}) => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false); // Set initial loading state to true
  const user = useSelector((state) => state.auth.user);

  const fetchTransactionData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:5000/api/payment//getPaymentByStudent/${user.userId}`
      );
      console.log(response);
      console.log(response.data.data);

      setPayments(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactionData();
  }, [user]);

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
        data={payments}
        isDashboard={isDashboard}
      />
    </div>
  );
};

export default PaymentHistory;
