import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { useRouter } from 'next/router';



const SellModal = ({symbol}) => {

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
            const response = await axios.post('/api/sell-stock', {
                symbol:symbol,
                quantity:quantity,
                email:session.user.email
            });
            
            if(response.status === 200){
                alert('Stock Sold Successfully');
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

                <button type="submit" className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-700 duration-200 ">Sell</button>
            </form>
    )
}

export default SellModal