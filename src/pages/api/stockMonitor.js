import stockCache from "@/utils/stockCache";
import User from "@/utils/models/user";
import Notification from "@/utils/models/notification";
import connectDB from "@/utils/db";

const fetchStockData = async (symbol) => {
  const response = await fetch(
    `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${process.env.FINKEY}`
  );
  const data = await response.json();
  return data.c; // current price
};

const checkStockChanges = async () => {
  await connectDB();
  for (const userId in stockCache) {
    const stockPrices = stockCache[userId];
    for (const symbol in stockPrices) {
      const oldPrice = stockPrices[symbol];
      const newPrice = await fetchStockData(symbol);

      if (!newPrice) continue;

      const priceChangePercent = ((newPrice - oldPrice) / oldPrice) * 100;
      let message = null;

      if (priceChangePercent >= 5) {
        message = `${symbol} increased by more than 5%! 📈`;
      } else if (priceChangePercent <= -5) {
        message = `${symbol} decreased by more than 5%! 📉`;
      } else if (priceChangePercent >= 2) {
        message = `${symbol} increased by more than 2%. 🚀`;
      } else if (priceChangePercent <= -2) {
        message = `${symbol} dropped by more than 2%. 📉`;
      }

      // Send notification if there’s a significant change
      if (message) {
        await Notification.create({
          userId,
          message,
        });

        // Update the price in cache
        stockCache[userId][symbol] = newPrice;
      }
    }
  }
};

export default async function handler(req, res) {
  if (req.method === "GET") {
    await checkStockChanges();
    return res.status(200).json({ message: "Stock monitoring completed" });
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
