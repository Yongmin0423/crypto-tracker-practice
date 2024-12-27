import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinTickers } from "./api";
import styled from "styled-components";

const Main = styled.div`
  display: flex;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
  margin: 10px 0px;
`;

interface IPrice {
  ath_date: string;
  ath_price: number;
  market_cap: number;
  market_cap_change_24h: number;
  percent_from_price_ath: number;
  price: number;
  volume_24h: number;
  volume_24h_change_24h: number;
}

function Price() {
  const coinId = useOutletContext<string>();
  const { isLoading, data } = useQuery<IPrice>(["price", coinId], () =>
    fetchCoinTickers(coinId)
  );

  if (!data || !data.quotes?.USD) {
    return <div>Data not available</div>;
  }

  const athDate = new Date(data.quotes.USD.ath_date);
  const formattedDate = athDate.toLocaleDateString();
  return (
    <>
      <Main>
        <div>All Time High Date: {formattedDate}</div>
      </Main>
      <Main>
        <div>All Time High Price: ${data.quotes.USD.ath_price.toFixed(3)}</div>
      </Main>
      <Main>
        <div>Market Cap: ${data.quotes.USD.market_cap}</div>
      </Main>
      <Main>
        <div>
          Market Cap Change 24h: {data.quotes.USD.market_cap_change_24h}%
        </div>
      </Main>
      <Main>
        <div>
          All Time High Price ATH: {data.quotes.USD.percent_from_price_ath}%
        </div>
      </Main>
      <Main>
        <div>Today's Volume : ${data.quotes.USD.volume_24h}</div>
      </Main>
      <Main>
        <div>
          Today's Change Volume: {data.quotes.USD.volume_24h_change_24h}%
        </div>
      </Main>
    </>
  );
}

export default Price;
