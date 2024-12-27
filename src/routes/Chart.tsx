import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "./api";
import ApexCharts from "react-apexcharts";

interface IHistorical {
  close: string;
  high: string;
  low: string;
  market_cap: number;
  open: string;
  time_close: number;
  time_open: number;
  volume: string;
}

function Chart() {
  const coinId = useOutletContext<string>();
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );

  const candlestickData = data?.map((price) => ({
    x: new Date(price.time_close * 1000),
    y: [
      Number(price.open),
      Number(price.high),
      Number(price.low),
      Number(price.close),
    ],
  }));

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexCharts
          type="candlestick"
          series={[
            {
              name: "Candlestick",
              data: candlestickData || [],
            },
          ]}
          options={{
            theme: {
              mode: "dark",
            },
            chart: {
              type: "candlestick",
              height: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            title: {
              text: `${coinId} Candlestick Chart`,
              align: "left",
            },
            xaxis: {
              type: "datetime",
              labels: {
                format: "MMM dd",
              },
            },
            yaxis: {
              tooltip: {
                enabled: true,
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
