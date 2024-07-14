"use client";
import { useThemeStore } from "@/app/store";
import { HelpDesk } from "@/types/helpDeskProps";
import { processHelpDeskData } from "@/utils/helpDeskData";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const HelpDeskReport: React.FC = () => {
  const [data, setHelpDesks] = useState<HelpDesk[]>([]);
  const [filter, setFilter] = useState("all");
  const [filteredData, setFilteredData] = useState(data);
  const [processedData, setProcessedData] = useState(processHelpDeskData(data));
  const router = useRouter();

  useEffect(() => {
    const filterData = (data: HelpDesk[], filter: string) => {
      const now = new Date();
      let filteredData = data;

      switch (filter) {
        case "daily":
          filteredData = data.filter((d) => {
            const date = new Date(d.date || "");
            return date.toDateString() === now.toDateString();
          });
          break;
        case "weekly":
          const oneWeekAgo = new Date(now);
          oneWeekAgo.setDate(now.getDate() - 7);
          filteredData = data.filter((d) => {
            const date = new Date(d.date || "");
            return date >= oneWeekAgo && date <= now;
          });
          break;
        case "bi-weekly":
          const twoWeeksAgo = new Date(now);
          twoWeeksAgo.setDate(now.getDate() - 14);
          filteredData = data.filter((d) => {
            const date = new Date(d.date || "");
            return date >= twoWeeksAgo && date <= now;
          });
          break;
        case "monthly":
          const oneMonthAgo = new Date(now);
          oneMonthAgo.setMonth(now.getMonth() - 1);
          filteredData = data.filter((d) => {
            const date = new Date(d.date || "");
            return date >= oneMonthAgo && date <= now;
          });
          break;
        case "6months":
          const sixMonthsAgo = new Date(now);
          sixMonthsAgo.setMonth(now.getMonth() - 6);
          filteredData = data.filter((d) => {
            const date = new Date(d.date || "");
            return date >= sixMonthsAgo && date <= now;
          });
          break;
          case "all":
            filteredData = data;
            break;
        default:
          break;
      }

      return filteredData;
    };

    const newFilteredData = filterData(data, filter);
    setFilteredData(newFilteredData);
    setProcessedData(processHelpDeskData(newFilteredData));
  }, [filter, data]);

  useEffect(() => {
    const fetchHelpDesks = async () => {
      try {
        const res = await axios.get<HelpDesk[]>("/api/helpdesk/report");
        const helpDesks = res.data;
        setHelpDesks(helpDesks);
      } catch (error) {
        console.error("Failed to fetch help desks", error);
      }
    };

    fetchHelpDesks();
  }, []);

  // const processedData = processHelpDeskData(data);

  return (
    <>
      <ArrowLeft onClick={() => router.back()} className="cursor-pointer" />
      <div className="grid justify-items-center ">
        <h2 className="text-4xl font-bold mb-8 text-primary">
          HelpDesk Report
        </h2>
        <div className="my-8">
          <h3 className="text-2xl font-medium text-center text-secondary mb-4">
            Overview
          </h3>
          <div className="flex flex-col gap-y-4">
            <p>
              Shortest Call Duration:{" "}
              <span className="font-bold">{processedData.shortestCall}</span>{" "}
            </p>
            <p>
              Longest Call Duration:{" "}
              <span className="font-bold">{processedData.longestCall}</span>{" "}
            </p>
            <p>
              Average Time Spent on Call:{" "}
              <span className="font-bold">
                {processedData.averageTimeSpent}
              </span>{" "}
            </p>
            <p>
              Resolved Tickets Percentage:{" "}
              <span className="font-bold">
                {processedData.resolvedPercentage}%
              </span>
            </p>
            <p>
              Freshdesk Tickets Percentage:{" "}
              <span className="font-bold">
                {processedData.freshdeskPercentage}%
              </span>
            </p>

          </div>
        </div>
        <div className="flex justify-around w-full items-baseline my-4">
          <h3 className="text-2xl font-semibold text-center text-secondary mb-4">
            All HelpDesk Data
          </h3>
          <div>
            <label htmlFor="filter" className="mr-2">
              Filter by:
            </label>
            <select
              id="filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className={`text-black bg-gray-200 border border-primary rounded-xl py-1 px-2`}
            >
              <option value="all">All</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="bi-weekly">Bi-Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="6months">6 Months</option>
            </select>
          </div>
        </div>
        <table>
          <thead>
            <tr className="border-t-2 border-gray-400">
              <th>Date</th>
              <th>Call Duration</th>
              <th>Campus</th>
              <th>Query</th>
              <th>Resolve</th>
              <th>Client</th>
              <th>Problem</th>
              <th>Status</th>
              <th>Call Agent</th>
            </tr>
          </thead>
          <tbody>
            {filteredData
              ?.sort((a, b) => {
                const dateA = new Date(a.date ?? 0);
                const dateB = new Date(b.date ?? 0);
                return dateB.getTime() - dateA.getTime();
              })
              .map((helpDesk) => (
                <tr key={helpDesk.id} className="border-b border-gray-400">
                  <td className="pr-4 py-2 border-r border-gray-400 text-center">
                    {helpDesk.date}
                  </td>
                  <td className="pr-4 py-2 border-r border-gray-400 text-center">
                    {helpDesk.callDuration}
                  </td>
                  <td className="pr-4 py-2 border-r border-gray-400 text-center">
                    {helpDesk.campus}
                  </td>
                  <td className="pr-4 py-2 border-r border-gray-400 text-center">
                    {helpDesk.query}
                  </td>
                  <td className="pr-4 py-2 border-r border-gray-400 text-center">
                    {helpDesk.resolve}
                  </td>
                  <td className="pr-4 py-2 border-r border-gray-400 text-center">
                    {helpDesk.client}
                  </td>
                  <td className="pr-4 py-2 border-r border-gray-400 text-center">
                    {helpDesk.problem}
                  </td>
                  <td className="pr-4 py-2 border-r border-gray-400 text-center">
                    {helpDesk.status}
                  </td>
                  <td className="pr-4 py-2 border-r border-gray-400 text-center">
                    {helpDesk.callAgent}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default HelpDeskReport;
