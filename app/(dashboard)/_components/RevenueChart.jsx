"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import Loading from "@/app/loading";

const RevenueChart = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("7d");
  const [loading, setLoading] = useState(false);

  const fetchChartData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:5000/api/dashboard/revenue-by-cat?filter=${filter}`
      );
      console.log(res);
      setData(res.data);
    } catch (error) {
      console.error("❌ Error fetching chart data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, [filter]);

  const filters = [
    { label: "7 Days", value: "7d" },
    { label: "30 Days", value: "30d" },
    { label: "This Year", value: "year" },
  ];

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold">
        Revenue by Course Category
      </h2>

      <div className="bg-white rounded mt-6 shadow p-4">
        <div className="flex items-end justify-end mb-4">
          <div className="flex gap-2">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`px-3 py-1 rounded-md text-sm font-medium border ${
                  filter === f.value
                    ? "bg-green-600 text-white border-green-600"
                    : "text-gray-700 hover:bg-gray-100 border-gray-300"
                } transition`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <Loading />
        ) : data.length === 0 ? (
          <p className="text-center text-red-500">No revenue data found.</p>
        ) : (
          <ResponsiveContainer width="100%" height={325}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#10B981" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default RevenueChart;
