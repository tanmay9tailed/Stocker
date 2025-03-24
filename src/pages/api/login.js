import connectDB from "@/utils/db";
import User from "@/utils/models/user";
import Stock from "@/utils/models/stock";
import Notification from "@/utils/models/notification";
import bcrypt from "bcryptjs";
import stockCache from "@/utils/stockCache"; // Correct path to cache

// Fetch latest stock data from API
const fetchStockData = async (symbol) => {
  const response = await fetch(
    `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${process.env.FINKEY}`
  );
  const data = await response.json();
  return data.c; // current price
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { email, password } = req.body;
      await connectDB();

      // Check if user exists
      const existingUser = await User.findOne({ email }).populate("stocks");
      if (!existingUser) {
        return res.status(401).json({ message: "User not found" });
      }

      // Validate password
      const isPasswordValid = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Store initial stock prices in cache after login
      const userStocks = existingUser.stocks;
      const stockPrices = {};
      for (const stock of userStocks) {
        const price = await fetchStockData(stock.symbol);
        stockPrices[stock.symbol] = price;
      }

      // Store prices in stockCache
      stockCache[existingUser._id] = stockPrices;

      return res.status(200).json({
        message: "Successful Login",
        user: existingUser,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
