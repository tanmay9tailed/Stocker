import User from "@/utils/models/user";
import dbConnect from "@/utils/db";
import Stock from "@/utils/models/stock";

export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case "POST":
            try {
                const { symbol, quantity, email } = req.body;
                if (!symbol || !quantity || !email) {
                    return res.status(400).json({ success: false, message: "Missing required fields." });
                }

                const user = await User.findOne({ email:email });


                if (!user) {
                    return res.status(404).json({ success: false, message: "User not found." });
                }

                let stock = await Stock.findOne({ symbol, userId: user._id });
                
                 if (!stock) {
                    // If stock doesn't exist, create it and associate it with the user
                    stock = new Stock({ symbol, quantity, userId: user._id });
                    await stock.save();
                } else {
                    // If stock exists, update its quantity
                    stock.quantity = Number(stock.quantity) + Number(quantity);

                    await stock.save();
                }

                if (!user.stocks.includes(stock._id)) {
                    user.stocks.push(stock._id);
                    await user.save();
                }

                const userWithStocks = await User.findById(user._id).populate('stocks');

                return res.status(200).json({ success: true, data: userWithStocks });

            }
            catch (error) {
                console.error(error);
                res.status(400).json({ success: false });
            }
    }
}