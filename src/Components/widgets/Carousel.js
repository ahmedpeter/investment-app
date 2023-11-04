import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { TrendingCoins } from "../../Util/API";
import AliceCarousel from "react-alice-carousel";
import { numberWithCommas } from "./CoinsTable";

function CryptoCarousel() {
  const [trending, setTrending] = useState([]);
  // const { currency }  = ["USD", "NGN"];
  const fetchTrendingCoin = async () => {
    const { data } = await axios.get(TrendingCoins("USD"));
    setTrending(data);
  };
  // trending);

  useEffect(() => {
    fetchTrendingCoin();
  }, ["USD"]);

  const items = trending.map((coin) => {
    let profit = coin.price_change_percentage_2h >= 0;
    return (
      <div>
        <img
          src={coin?.image}
          alt={coin.name}
          height="60"
          style={{ marginBottom: 10 }}
        />
        <p className="upper-case">
          {coin?.symbol}{" "}
          <span
            style={{
              color: profit > 0 ? "rgb(14, 203, 129)" : "red",
              fontWeight: 500,
            }}>
            {profit && "+"}
            {coin.price_change_percentage_2h?.toFixed(2)}%
          </span>{" "}
        </p>{" "}
        &nbsp;
        <span style={{ fontSize: 22, fontWeight: 500 }}>
          ${numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </div>
    );
  });
  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 5,
    },
  };
  return (
    <div className="CryptoCarousel">
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        responsive={responsive}
        autoPlay
        disableButtonsControls
        items={items}
      />
    </div>
  );
}

export default CryptoCarousel;
