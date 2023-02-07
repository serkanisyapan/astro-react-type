import { Chart as ChartJS } from "chart.js/auto";
import { Chart } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import { calcAverageWPM } from "../utils/calculateAverageWPM";

export const StatsChart = ({ data }) => {
  const averageWPM = calcAverageWPM(data);
  const averageWPMLine = {
    id: "averageWPMLine",
    beforeDatasetsDraw: (chart) => {
      console.log(chart);
      const {
        ctx,
        chartArea: { top, right, bottom, left, width, height },
        scales: { x, netWPM },
      } = chart;
      ctx.save();
      // draw horizontal line
      ctx.strokeStyle = "#e160e8";
      ctx.setLineDash([5, 5]);
      ctx.strokeRect(left, netWPM.getPixelForValue(averageWPM), width, 0);
      ctx.restore();
    },
  };

  return (
    <div style={{ width: "80%", margin: "80px auto" }}>
      <Line
        datasetIdKey="id"
        width={700}
        options={{
          responsive: true,
          interaction: {
            mode: "index",
            intersect: false,
          },
          tension: 0.3,
          plugins: {
            averageWPMLine: {},
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
                    `wrongChars:${grabData.wrongLetters}` +
                    "\n" +
                    `avgWPM:${averageWPM}`;
                  return label;
                },
                beforeFooter: function (context) {
                  let footerLabel =
                    `==============` +
                    "\n" +
                    `date: ${data[context[0].dataIndex].runDate}`;
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
            netWPM: {
              axis: "y",
              min: 0,
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
              yAxisID: "netWPM",
              pointRadius: (context) => linePointStyling(context, "radius"),
              pointStyle: (context) => linePointStyling(context, "style"),
            },
          ],
        }}
        plugins={[averageWPMLine]}
      />
    </div>
  );
};

const linePointStyling = (context, stylingOption) => {
  const allData = context.dataset.data;
  const findMaxValue = Math.max(...allData);
  const pointsArray = [];
  for (let i = 0; i < allData.length; i++) {
    const isMaxValue = allData[i] === findMaxValue;
    if (isMaxValue) {
      stylingOption === "style"
        ? pointsArray.push("star")
        : pointsArray.push(10);
    } else {
      stylingOption === "style"
        ? pointsArray.push("circle")
        : pointsArray.push(4);
    }
  }
  return pointsArray;
};
