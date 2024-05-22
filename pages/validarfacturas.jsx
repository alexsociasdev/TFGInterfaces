import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { firestore } from '../utils/firebase';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';

const ValidarFacturas = () => {
  const router = useRouter();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersCollection = collection(firestore, 'orders');
        const q = query(ordersCollection, where('validated', '==', false));
        const ordersSnapshot = await getDocs(q);
        const ordersData = ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setOrders(ordersData);
      } catch (error) {
        console.error('Error al obtener las órdenes: ', error);
      }
    };

    fetchOrders();
  }, []);

  const handleBack = () => {
    router.push('/menuadmin');
  };

  const handleValidate = async (orderId) => {
    try {
      const orderRef = doc(firestore, 'orders', orderId);
      await updateDoc(orderRef, { validated: true });
      setOrders(orders.filter(order => order.id !== orderId));
      alert('Orden validada');
    } catch (error) {
      console.error('Error al validar la orden: ', error);
      alert('Error al validar la orden');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4 text-green-500">Validar facturas</h1>
      <div className="mb-4 w-full max-w-xs">
        {orders.map((order) => (
          <div key={order.id} className="flex items-center mb-4 p-2 border border-gray-300 rounded">
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-900">Pedido de {order.userEmail}</h2>
              <ul className="list-disc list-inside text-gray-800">
                {order.products.map((product) => (
                  <li key={product.id}>{product.nombre} - {product.precio}</li>
                ))}
              </ul>
              <p className="text-gray-800"><strong>Total:</strong> {order.totalPrice}</p>
            </div>
            <button
              onClick={() => handleValidate(order.id)}
              className="px-2 py-1 bg-green-500 text-white font-semibold rounded shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              Validar
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={handleBack}
        className="px-4 py-2 bg-gray-500 text-white font-semibold rounded shadow hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
      >
        Atrás
      </button>
    </div>
  );
};

export default ValidarFacturas;
