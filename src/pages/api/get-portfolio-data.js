import User from "@/utils/models/user";
import dbConnect from "@/utils/db";
import Stock from "@/utils/models/stock";

export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case "GET":
            try {
                const { email } = req.query;
                if (!email) {
                    return res.status(400).json({ success: false, message: "Email is required." });
                }

                const user = await User.findOne({ email }).populate({
                    path: "stocks", // Populate the stocks array
                    model: "Stock", // Ensure it's using the Stock model
                    select: "symbol quantity" // Only select the symbol and quantity fields from Stock schema
                });
                if (!user) {
                    return res.status(404).json({ success: false, message: "User not found." });
                }

                const portfolio = user.stocks.map(stock => ({
                    symbol: stock.symbol,
                    quantity: stock.quantity,
                    // You can add additional fields here if needed
                }));

                return res.status(200).json({ success: true, data: portfolio });
            }
            catch (error) {
                console.error(error);
                res.status(400).json({ success: false });
            }
    }
}