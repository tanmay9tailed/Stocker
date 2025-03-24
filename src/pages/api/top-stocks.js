import stocks from "@/utils/stocks";
export default async function GET(req, res) {
    try {
        if (!stocks || stocks.length === 0) {
            return res.status(404).json({ error: "No stocks found" });
        }
        const stockData = await Promise.all(
            stocks.map(async (stock) => {
                const response = await fetch(
                    `https://finnhub.io/api/v1/quote?symbol=${stock.symbol}&token=${process.env.FINKEY}`
                );
                const data = await response.json();
                console.log(data)
                return {
                    stockName: stock.stockName,
                    symbol: stock.symbol,
                    price: data,
                    img:stock.imagePath
                };
            })
        );

        return res.status(200).json({ stockData:stockData });
    }
    catch (error) {
        console.log(error);
    }
}