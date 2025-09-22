import React, { useState } from "react";
import OrderApi from "../apis/orderApi"; // adjust path

const orderApi = new OrderApi("http://localhost:5000");

export default function OrderTest() {
  const [form, setForm] = useState(
    {
        "customer_id": "11111111-1111-1111-1111-111111111111",
        "delivery_address": "Road 9/A, House 45, Banani, Dhaka 1213",
        "items": [
          { "part_id": 1, "quantity": 2, "price_each": 8999},
          { "part_id": 2, "quantity": 1, "price_each": 12999}
        ],
        "total_amount": 21998,
        "tax": 1539.86,
        "net_amount": 23537.86,
        "payment_status": "pending",
        "payment_method": "cashondelivery"
    }
      
  );

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await orderApi.createOrder(form);
      if(response.url != null){
        window.location.replace(response.url);
      }
      setResult(response);
    } catch (error) {
      setResult(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Test Order Creation</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Customer ID</label>
          <input
            type="text"
            value={form.customer_id}
            onChange={(e) =>
              setForm({ ...form, customer_id: e.target.value })
            }
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Delivery Address</label>
          <input
            type="text"
            value={form.delivery_address}
            onChange={(e) =>
              setForm({ ...form, delivery_address: e.target.value })
            }
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Payment Method</label>
          <select
            value={form.payment_method}
            onChange={(e) =>
              setForm({ ...form, payment_method: e.target.value })
            }
            className="w-full border rounded p-2"
          >
            <option value="cashondelivery">Cash on Delivery</option>
            <option value="ssl">ssl</option>
            <option value="card">Card</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Creating..." : "Create Order"}
        </button>
      </form>

      {result && (
        <div className="mt-6 p-4 border rounded bg-gray-100">
          <h3 className="font-semibold">Response:</h3>
          <pre className="text-sm">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
