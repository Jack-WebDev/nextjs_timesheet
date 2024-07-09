"use client";
import { HelpDesk } from "@/types/helpDeskProps";
import { processHelpDeskData } from "@/utils/helpDeskData";
import axios from "axios";
import React, { useEffect, useState } from "react";

const HelpDeskReport: React.FC = () => {
  const [data, setHelpDesks] = useState<HelpDesk[]>([]);

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

  const processedData = processHelpDeskData(data || []);

  return (
    <div className="grid justify-items-center ">
      <h2 className="text-4xl font-bold mb-8 text-primary">HelpDesk Report</h2>
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
            <span className="font-bold">{processedData.averageTimeSpent}</span>{" "}
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
      <h3 className="text-2xl font-semibold text-center text-secondary mb-4">
        All HelpDesk Data
      </h3>
      <table>
        <thead>
          <tr>
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
          {data?.map((helpDesk) => (
            <tr key={helpDesk.id} className="border-b border-gray-400">
              <td className="pr-4 py-2 border-r border-gray-400 text-center">{helpDesk.date}</td>
              <td className="pr-4 py-2 border-r border-gray-400 text-center">{helpDesk.callDuration}</td>
              <td className="pr-4 py-2 border-r border-gray-400 text-center">{helpDesk.campus}</td>
              <td className="pr-4 py-2 border-r border-gray-400 text-center">{helpDesk.query}</td>
              <td className="pr-4 py-2 border-r border-gray-400 text-center">{helpDesk.resolve}</td>
              <td className="pr-4 py-2 border-r border-gray-400 text-center">{helpDesk.client}</td>
              <td className="pr-4 py-2 border-r border-gray-400 text-center">{helpDesk.problem}</td>
              <td className="pr-4 py-2 border-r border-gray-400 text-center">{helpDesk.status}</td>
              <td className="pr-4 py-2 border-r border-gray-400 text-center">{helpDesk.callAgent}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HelpDeskReport;
