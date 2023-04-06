import React, {useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {TrendingCoins} from '../../Util/API';
// import AliceCarousel from 'react-alice-carousel';
import { numberWithCommas } from "./CoinsTable";
import AliceCarousel from 'react-alice-carousel';
import { useLoading } from '@agney/react-loading';

function Ticker() {
    const [trending, setTrending] = useState([]);
    // const { currency }  = ["USD", "NGN"];
    const fetchTrendingCoin = async ()=> {
        const {data} = await axios.get(TrendingCoins('USD'));
        setTrending(data);
    };
console.log(trending);

    useEffect(() => {
        fetchTrendingCoin()
    }, ['USD']);


    const items = trending.map((coin)=> {
        let profit = coin.price_change_percentage_24h >= 0;
        return(
            <div>
                <span className="upper-case" style={{paddingLeft: '25px', textAlign: 'center'}}>{coin.name} - {coin?.symbol} 
                <br/>
                <span style={{ color: profit > 0 ? "rgb(14, 203, 129)" : "red", fontWeight: 400,  }}>
                    {profit && '+'}{coin.price_change_percentage_24h?.toFixed(2)}% 
                </span> &nbsp;
                <span style={{fontSize: 10, fontWeight: 400}}>
                    ${numberWithCommas(coin?.current_price.toFixed(2))}
                </span>
                </span> 
            </div>
        )
    })


    const responsive = {
        0: {
            items: 5,
        },
        512: {
            items: 7,
        },
        860: {
            items: 15,
        }

    }
        return(
            <div style={{marginTop: '-80px', textShadow: '0 0 5px rgba(0,0,0,1)', fontSize: '11px'}}>
            <AliceCarousel 
                mouseTracking
                infinite
                autoPlayInterval = {1000}
                animationDuration={1500}
                disableDotsControls
                responsive={responsive}
                autoPlay
                disableButtonsControls
                items = {items}
            />
        </div>
        )
    }

export default Ticker
