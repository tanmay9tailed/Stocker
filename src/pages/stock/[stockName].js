import { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";
import { FloatingDock } from "@/components/ui/floating-doc";
import navLinks from "@/utils/navLinks";
import { useRouter } from "next/router";
import Logo from "@/components/logo";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { FaCaretUp } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa";

Chart.register(...registerables);

const StockPage = () => {
    const router = useRouter();
    const { stockName } = router.query;
    const links = navLinks;
    const [chartData, setChartData] = useState(null);
    const chartInstance = useRef(null);
    const [stockData, setStockData] = useState(null);
    const words = "Stock Data for " + stockName;
    useEffect(() => {
        if (!stockName) return;

        const fetchStockData = async () => {
            try {
                const response = await fetch(
                    `https://finnhub.io/api/v1/quote?symbol=${stockName}&token=cu7ri7hr01qhqu5bft0gcu7ri7hr01qhqu5bft10`
                );
                const data = await response.json();

                const now = new Date();
                const prices = Array.from({ length: 7 }, (_, i) => ({
                    date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - (6 - i))
                        .toISOString()
                        .split("T")[0],
                    price: data.c + Math.random() * 10 - 5, // Random price between c-5 and c+5
                }));
                setStockData(data);
                setChartData(prices);
            } catch (error) {
                console.error("Error fetching stock data:", error);
            }
        };

        fetchStockData();
    }, [stockName]);

    useEffect(() => {
        if (!chartData) return;

        const ctx = document.getElementById("stockChart").getContext("2d");

        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        chartInstance.current = new Chart(ctx, {
            type: "line",
            data: {
                labels: chartData.map((item) => item.date),
                datasets: [
                    {
                        label: `${stockName} Stock Price (Last 7 Days)`,
                        data: chartData.map((item) => item.price),
                        borderColor: "rgba(75, 192, 192, 1)",
                        backgroundColor: "rgba(75, 192, 192, 0.2)",
                        borderWidth: 2,
                        tension: 0.3,
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: true,
                    },
                },
                scales: {
                    x: {
                        type: "category",
                        title: {
                            display: true,
                            text: "Date",
                        },
                    },
                    y: {
                        title: {
                            display: true,
                            text: "Price (USD)",
                        },
                    },
                },
            },
        });

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [chartData, stockName]);

    return (
        <div>
            <Logo />
            <h1 className="text-start text-4xl font-bold mt-4 pl-5 mb-4">
                Stock Data for {stockName || "Loading..."}
            </h1>
            <p className="text-3xl pl-5 text-green-600 font-bold ">${stockData?.c ||999}</p>
            <div className="p-4 flex justify-center lg:w-[50%]">
                <canvas className="flex justify-center" id="stockChart" width="400" height="200"></canvas>
            </div>
            <div className="p-4 ">
                {stockData ? (

                    <div className="dark:bg-zinc-900 py-4 pl-4 rounded-2xl hover:rounded-3xl dark:hover:bg-zinc-800 hover:drop-shadow-2xl duration-500">
                        <TextGenerateEffect words={words} />
                        <div className="flex mt-4">
                            <div className="flex flex-col w-[50%] justify-start ">
                                <p className="text-lg font-bold py-1">Current Price <span className="font-normal">: {stockData.c}</span></p>
                                <p className="text-lg font-bold py-1">Open Price <span className="font-normal">: {stockData.o}</span></p>
                                <p className="text-lg font-bold py-1">High Price <span className="font-normal">: {stockData.h}</span></p>
                                <p className="text-lg font-bold py-1">Low Price <span className="font-normal">: {stockData.l}</span></p>
                                <p className="text-lg font-bold py-1">Previous Close Price: <span className="font-normal"> {stockData.pc}</span></p>
                            </div>

                            <div className="w-[50%] flex justify-start">{stockData.o < stockData.c ? 
                            (<div className='flex justify-end text-4xl font-bold text-green-600'>
                                <FaCaretUp />{((stockData.c - stockData.o) / stockData.o).toFixed(2)}%
                            </div>) : 
                            (<div className='flex justify-end text-4xl font-bold text-red-600'>
                                <FaCaretDown />{((stockData.c - stockData.o) / stockData.o).toFixed(2)}%
                            </div>)}</div>

                        </div>
                    </div>
                ) : (
                    <p>Loading stock data...</p>
                )}
            </div>


            <div className="flex fixed bottom-10 items-center justify-center h-[3rem] w-full">
                <FloatingDock items={links} />
            </div>

        </div>
    );
};

export default StockPage;
