import React from "react";
import { processColor } from "react-native";
import { CandleStickChart } from "react-native-charts-wrapper";

import { useOrientation } from "@app/hooks/";

import { styles } from "./styles.tsx";
import { ChartData } from "./types.tsx";

// PriceChart component is a wrapper around CandleStickChart component
// shows larger chart in landscape mode
const PriceChart = ({ data, xAxisLabels }: ChartData): React.JSX.Element => {
  const orientation = useOrientation();
  return (
    <>
      <CandleStickChart
        style={
          orientation === "PORTRAIT" ? styles.chart : styles.landscapeChart
        }
        xAxis={{
          position: "BOTTOM",
          valueFormatter: xAxisLabels,
          labelRotationAngle: 45,
        }}
        yAxis={{
          left: {
            enabled: true,
            valueFormatter: "$###.0",
          },
          right: {
            enabled: false,
          },
        }}
        data={{
          dataSets: [
            {
              label: "Coin price in last 30 days",
              values: data,
              config: {
                drawValues: true,
                color: processColor("gray"),
                valueTextSize: 10,
                valueFormatter: "$###.0",
              },
            },
          ],
        }}
        pinchZoom={true}
        drawGridBackground={false}
      />
    </>
  );
};

export default PriceChart;
