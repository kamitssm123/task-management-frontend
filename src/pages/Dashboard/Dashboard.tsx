import React, { useState, useEffect, useCallback } from "react";

import "./Dashboard.style.css";
import { Row } from "../../components/Table/types";
import SummarySection from "../../components/SummarySection";
import { SummaryConfigItem } from "../../components/SummarySection/types";
import Table from "../../components/Table";
import { getDashboardStat } from "../../services/api";



const Dashboard: React.FC = () => {
  const [summaryData, setSummaryData] = useState<SummaryConfigItem[]>([]);
  const [pendingTaskData, setPendingTaskData] = useState<SummaryConfigItem[]>([]);
  const [tableData, setTableData] = useState<Row[]>([]);

  const fetchDashboardData = useCallback(async () => {
    try {
      const result = await getDashboardStat();

      if (result && result.taskMetrics) {
        const taskMetrics = result.taskMetrics;
        setSummaryData([
          { label: "Total tasks", value: taskMetrics.total_tasks },
          { label: "Tasks completed", value: `${taskMetrics.completed_percentage}%` },
          { label: "Tasks pending", value: `${taskMetrics.pending_percentage}%` },
          { label: "Average time per completed task", value: `${parseFloat(taskMetrics.avg_time_per_completed_task).toFixed(2)} hrs` },
        ]);

        setPendingTaskData([
          { label: "Pending tasks", value: taskMetrics.pending_tasks },
          { label: "Total time lapsed", value: `${parseFloat(taskMetrics.total_time_lapsed).toFixed(2)} hrs` },
          { label: "Total time to finish", value: `${parseFloat(taskMetrics.total_time_to_finish).toFixed(2)} hrs`, description: "estimated based on endtime" },
        ]);
      }

      if (result && result.topTasks) {
        setTableData(
          result.topTasks.map((task: any) => [
            task["Task priority"].toString(),
            task["Pending tasks"].toString(),
            parseFloat(task["Time lapsed (hrs)"]).toFixed(2),
            parseFloat(task["Time to finish (hrs)"]).toFixed(2),
          ])
        );
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  return (
    <div>
      <h2 className="primary-header">Dashboard</h2>
      <div className="summary-wrapper">
        <SummarySection heading="Summary" config={summaryData} />
        <SummarySection heading="Pending task summary" config={pendingTaskData} />
        <Table header={["Task priority", "Pending tasks", "Time lapsed (hrs)", "Time to finish (hrs)"]} data={tableData} />
      </div>
    </div>
  );
};

export default React.memo(Dashboard);
