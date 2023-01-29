import { Chart as ChartJS } from "chart.js/auto";
import { Chart } from "react-chartjs-2";
import { Line } from "react-chartjs-2";

export const StatsChart = ({ data }) => {
  return (
    <div style={{ width: "80%", margin: "40px auto" }}>
      <Line
        datasetIdKey="id"
        options={{
          scales: {
            x: {
              ticks: {
                display: false,
              },
            },
            y: {
              display: true,
              title: {
                display: true,
                text: "Words Per Minute",
              },
            },
          },
        }}
        data={{
          labels: data.map((run) => `run ${data.indexOf(run) + 1}`),
          datasets: [
            {
              label: "netWPM",
              data: data.map((run, runID) => run.netWPM),
              borderColor: "#fee715",
              backgroundColor: "#fee715",
            },
            {
              label: "rawWPM",
              data: data.map((run, runID) => run.rawWPM),
              borderColor: "#d82bd2",
              backgroundColor: "#d82bd2",
            },
          ],
        }}
      />
    </div>
  );
};
