import Notification from "@/utils/models/notification";
import connectDB from "@/utils/db";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "GET") {
    try {
      const { userId } = req.query;
      const notifications = await Notification.find({ userId }).sort({
        createdAt: -1,
      });

      return res.status(200).json({ success: true, data: notifications });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
