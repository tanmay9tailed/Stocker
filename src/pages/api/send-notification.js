import Notification from "@/utils/models/notification";

export default async function sendNotification(userId, symbol, price, priority) {
  try {
    const notification = new Notification({
      userId,
      symbol,
      price,
      type: priority === "high" ? "Price Change > 5%" : "Price Change > 2%",
    });
    await notification.save();
  } catch (error) {
    console.error("Error sending notification:", error);
  }
}
