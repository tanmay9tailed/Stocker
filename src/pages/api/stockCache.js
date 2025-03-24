import axios from "axios";

const stockCache = {};

export const getStockPrice = (symbol) => {
  return stockCache[symbol] || null;
};

export const setStockPrice = (symbol, price) => {
  stockCache[symbol] = price;
};

export const compareAndSendNotification = async (newData) => {
  for (const stock of newData) {
    const { symbol, price, stockName } = stock;
    const oldPrice = getStockPrice(symbol);

    // If price changes, trigger a notification
    if (oldPrice !== price) {
      console.log(`Price change detected for ${symbol}: ${oldPrice} → ${price}`);
      setStockPrice(symbol, price);

      // Trigger notification API only if there’s a change
      await sendNotificationToUser(stockName, symbol, price, oldPrice);
    }
  }
};

// Send Notification API
const sendNotificationToUser = async (stockName, symbol, newPrice, oldPrice) => {
  try {
    await axios.post(`${process.env.APP_URL}/api/send-notification`, {
      stockName,
      symbol,
      newPrice,
      oldPrice,
    });
    console.log(`📢 Notification sent for ${symbol}`);
  } catch (error) {
    console.error("Error sending notification:", error);
  }
};
