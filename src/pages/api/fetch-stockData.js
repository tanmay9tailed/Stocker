export default async function GET(req, res) {

    try {
        const response = await fetch(
            `https://finnhub.io/api/v1/quote?symbol=${req.query.symbol}&token=${process.env.FINKEY}`
        );
        const data = await response.json();
        return res.status(200).json({ stockData: data });
    }
    catch (error) {
        console.log(error);
    }
}