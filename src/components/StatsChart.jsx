import { Chart as ChartJS } from "chart.js/auto";
import { Chart } from "react-chartjs-2";
import { Line } from "react-chartjs-2";

export const StatsChart = ({ data }) => {
  return (
    <div style={{ width: "80%", margin: "100px auto" }}>
      <Line
        datasetIdKey="id"
        width={700}
        heigth={400}
        options={{
          responsive: true,
          interaction: {
            mode: "index",
            intersect: false,
          },
          plugins: {
            title: {
              display: true,
              text: "All Runs",
            },
          },
          scales: {
            x: {
              ticks: {
                display: false,
              },
            },
            y: {
              ticks: {
                stepSize: 10,
              },
              beginAtZero: true,
              position: "left",
              title: {
                display: true,
                text: "Words Per Minute",
              },
            },
          },
        }}
        data={{
          labels: data.map((run, runID) => `run ${runID + 1}`),
          datasets: [
            {
              label: "rawWPM",
              data: data.map((run, runID) => run.rawWPM),
              borderColor: "#d82bd2",
              backgroundColor: "#d82bd2",
            },
            {
              label: "netWPM",
              data: data.map((run, runID) => run.netWPM),
              borderColor: "#fee715",
              backgroundColor: "#fee715",
            },
          ],
        }}
      />
    </div>
  );
};
