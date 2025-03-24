import React, { useState, useEffect } from "react";
import { FloatingDock } from "../components/ui/floating-doc";
import Logo from "@/components/logo";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import navLinks from "@/utils/navLinks";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import StockModal from "@/components/StockModel";
import { useSession } from "next-auth/react";

const BuySell = ({ initialStocks }) => {
  const router = useRouter();
  const links = navLinks;
  const [stocksData, setStocksData] = useState(initialStocks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const [mounted, setMounted] = useState(false);
  const { data: session, status } = useSession();
  const loading = status === "loading";

  // Mount check for avoiding hydration errors
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Loading or redirect if not authenticated
  if (loading) return <div>Loading...</div>;

  if (!session || !session.user) {
    router.push("/login");
    return null;
  }

  // Handle stock click to open modal
  const handleStockClick = (symbol) => {
    const stock = stocksData.stockData.find((stock) => stock.symbol === symbol);
    setSelectedStock(stock);
    setIsModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedStock(null);
  };

  return (
    <section className="bg-gray-200 min-h-screen dark:bg-zinc-950 px-5 pr-5">
      {/* Logo */}
      <Logo />

      {/* Page Heading */}
      <div className="heading flex justify-center text-4xl font-bold mt-6 mb-10 text-gray-800 dark:text-white">
        📈 Add to Your Portfolio
      </div>

      {/* Stocks Grid */}
      <div className="ml-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {stocksData?.stockData?.length > 0 ? (
          stocksData.stockData.map((stock) => (
            <div
              key={stock.symbol}
              onClick={() => handleStockClick(stock.symbol)}
              className="cursor-pointer"
            >
              <CardSpotlight className="flex justify-between items-center h-56 w-full max-w-[380px] rounded-xl p-5 transition-transform transform hover:scale-105 hover:shadow-2xl bg-white dark:bg-zinc-900 shadow-md dark:shadow-lg">
                <div className="flex items-center space-x-4">
                  <Image
                    src={stock.img}
                    height={80}
                    width={80}
                    alt="stocks_logo"
                    className="rounded-lg bg-gray-100 dark:bg-zinc-800 p-2"
                  />
                  <div>
                    <div className="text-xl font-semibold text-gray-800 dark:text-white">
                      {stock.stockName}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {stock.symbol}
                    </div>
                  </div>
                </div>

                {/* Stock Price & Change Details */}
                <div className="text-right">
                  <div
                    className={`text-xl font-bold ${
                      stock.price.o < stock.price.c
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    ${stock.price.c.toFixed(2)}
                  </div>
                  <div
                    className={`text-sm font-bold ${
                      stock.price.o < stock.price.c
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {(
                      ((stock.price.c - stock.price.o) / stock.price.o) *
                      100
                    ).toFixed(2)}
                    %
                  </div>
                </div>
              </CardSpotlight>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-lg text-gray-500 dark:text-gray-400">
            No stocks available
          </p>
        )}
      </div>

      {/* Stock Modal */}
      {isModalOpen && (
        <StockModal symbol={selectedStock?.symbol} onClose={handleCloseModal} />
      )}

      {/* Floating Dock */}
      <div className="fixed bottom-10 left-0 right-0 flex items-center justify-center h-12 w-full">
        <FloatingDock items={links} />
      </div>
    </section>
  );
};

export default BuySell;

export async function getServerSideProps(context) {
  try {
    const baseURL = process.env.NEXTAUTH_URL || "http://localhost:3000";

    const stockRes = await axios.get(`${baseURL}/api/top-stocks`, {
      params: { page: "top-stocks" },
    });

    return {
      props: {
        initialStocks: stockRes.data || { stockData: [] },
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        initialStocks: { stockData: [] }, // Empty fallback
      },
    };
  }
}
