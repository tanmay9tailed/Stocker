import { useState } from 'react'
import { useEffect } from 'react'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import axios from 'axios';


const BuyModal = ({symbol}) => {
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0);
    const { data: session , status} = useSession();
    const loading = status === 'loading';
    const router = useRouter();


    useEffect(() => {
            async function fetchStockData() {
                const response = await fetch(`/api/fetch-stockData?symbol=${symbol}`);
                const data = await response.json();
                setPrice(data.stockData.c);
                console.log(data.stockData.c);
            }
            fetchStockData();
        }, [symbol]);

        const handleSubmit = async (e) => {
            e.preventDefault();
            const response = await axios.post('/api/buy-stock', {
                symbol:symbol,
                quantity:quantity,
                email:session.user.email
            });
            if(response.status === 200){
                alert('Stock Bought Successfully');
                router.push('/portfolio');
                
            }
        }
    return (
        <form onSubmit={handleSubmit} method="POST" className="flex flex-col space-y-4">
                <label htmlFor="quantity">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="p-2 border border-gray-300 dark:border-zinc-800 rounded-lg"/>
                <div>Purhcase of:<span className="pl-3">${quantity*price}</span></div>

                <button type="submit" className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-700 duration-200 ">Buy</button>
            </form>
    )
}

export default BuyModal