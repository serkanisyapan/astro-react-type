import { Chart as ChartJS } from "chart.js/auto";
import { Chart } from "react-chartjs-2";
import { Line } from "react-chartjs-2";

export const StatsChart = ({ data }) => {
  return (
    <div style={{ width: "80%", margin: "80px auto" }}>
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
            tooltip: {
              padding: 7,
              bodySpacing: 5,
              bodyFont: {
                size: 14,
              },
              footerFont: {
                size: 14,
              },
              callbacks: {
                afterBody: function (context) {
                  const grabData = data[context[0].dataIndex];
                  let label =
                    `rawWPM: ${grabData.rawWPM}` +
                    "\n" +
                    `seconds: ${grabData.seconds}` +
                    "\n" +
                    `totalChars: ${grabData.keyStrokes}` +
                    "\n" +
                    `wrongChars:${grabData.wrongLetters}` +
                    "\n" +
                    `gameMode:${grabData.gameMode} words`;
                  return label;
                },
                beforeFooter: function (context) {
                  let footerLabel =
                    `==============` +
                    "\n" +
                    `date: ${data[context[0].dataIndex].getRunDate}`;
                  return footerLabel;
                },
              },
            },
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
