import User from "@/utils/models/user";
import Stock from "@/utils/models/stock";
import dbConnect from "@/utils/db";

export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case "POST":
            try {
                const { symbol, quantity, email } = req.body;

                // Validate the request body
                if (!symbol || !quantity || !email) {
                    return res.status(400).json({ success: false, message: "Missing required fields." });
                }

                // Find the user by email
                const user = await User.findOne({ email });

                if (!user) {
                    return res.status(404).json({ success: false, message: "User not found." });
                }

                // Find the stock record for the user
                let stock = await Stock.findOne({ symbol, userId: user._id });

                if (!stock) {
                    return res.status(404).json({ success: false, message: "Stock not found for the user." });
                }

                // Check if the user has enough stock to sell
                if (stock.quantity < quantity) {
                    return res.status(400).json({ success: false, message: "Not enough stock to sell." });
                }

                // Reduce the stock quantity
                stock.quantity = Number(stock.quantity) - Number(quantity);

                // If the quantity is 0 or less, delete the stock record
                if (stock.quantity <= 0) {
                    await stock.deleteOne();
                    // Also remove the reference to this stock from the user's stocks array
                    user.stocks = user.stocks.filter(stockId => stockId.toString() !== stock._id.toString());
                    await user.save();
                } else {
                    await stock.save();
                }

                // Return the updated user object with populated stocks
                const userWithStocks = await User.findById(user._id).populate("stocks");

                return res.status(200).json({ success: true, data: userWithStocks });

            } catch (error) {
                console.error(error);
                return res.status(500).json({ success: false, message: error.message });
            }

        default:
            res.setHeader("Allow", ["POST"]);
            return res.status(405).end(`Method ${method} Not Allowed`);
    }
}
