import Link from "next/link";
import {  useEffect, useState } from "react";
import BuyModal from "./BuyModal";
import SellModal from "./SellModal";

const StockModal = ({ symbol, onClose }) => {
    const [price, setPrice] = useState(0);
    const [buyOrSell, setBuyOrSell] = useState(false);

    useEffect(() => {
        async function fetchStockData() {
            const response = await fetch(`/api/fetch-stockData?symbol=${symbol}`);
            const data = await response.json();
            setPrice(data.stockData.c);
            console.log(data.stockData.c);
        }
        fetchStockData();
    }, [symbol]);
    

    



    return (
      <div className="fixed inset-0 z-50 flex justify-center  items-center bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="bg-darkbg rounded-lg shadow-lg w-[90%] lg:w-[40%] bg-gray-300 dark:bg-zinc-950 drop-shadow-2xl  sm:w-[50%] max-h-[80%] overflow-y-auto p-5">
          <div className="flex justify-between items-center  mb-4">
            <h2 className="text-xl font-semibold">{symbol} <span className="text-green-500">${price}</span></h2>
            <button
              className="text-gray-100 hover:text-gray-500"
              onClick={onClose}
            >X
            </button>
          </div>
            {buyOrSell===false ? 
            (<div className="flex justify-evenly items-center">
            <button onClick={() => setBuyOrSell("buy")} className="bg-green-500 px-5 py-2 text-xl font-bold text-white p-2 rounded-lg hover:bg-green-700 duration-200 ">Buy</button>
            <button onClick={() => setBuyOrSell("sell")} className="bg-red-500 px-5 py-2 text-xl font-bold text-white p-2 rounded-lg hover:bg-red-700 duration-200 ">Sell</button>
          </div>):
          (buyOrSell==="buy" ?(<BuyModal symbol={symbol}/>):(<SellModal symbol={symbol}/>))}
          
          
        </div>
      </div>
    );
  };

export default StockModal;