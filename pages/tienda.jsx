import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { firestore, auth } from '../utils/firebase';
import { collection, addDoc } from 'firebase/firestore';

const Tienda = () => {
  const router = useRouter();
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleBack = () => {
    router.back();
  };

  const handlePurchase = async () => {
    if (selectedProducts.length === 0) return;

    try {
      const user = auth.currentUser;
      const totalPrice = selectedProducts.reduce((total, product) => total + parseFloat(product.precio.replace('€', '')), 0);

      await addDoc(collection(firestore, 'orders'), {
        userId: user.uid,
        userEmail: user.email,
        products: selectedProducts,
        totalPrice: totalPrice.toFixed(2) + '€',
        validated: false,
        createdAt: new Date(),
      });
      alert('Orden de compra enviada');
      setSelectedProducts([]);
    } catch (error) {
      console.error('Error al enviar la orden de compra: ', error);
      alert('Error al enviar la orden de compra');
    }
  };

  const handleSelectProduct = (producto) => {
    setSelectedProducts((prevSelected) => {
      if (prevSelected.some((p) => p.id === producto.id)) {
        return prevSelected.filter((p) => p.id !== producto.id);
      } else {
        return [...prevSelected, producto];
      }
    });
  };

  const productos = [
    {
      id: 1,
      nombre: 'Camiseta azul',
      precio: '10€',
      cantidad: '1 ud',
      imagen: '/img/logo.png',
    },
    {
      id: 2,
      nombre: 'Tiquet de comedor',
      precio: '10€',
      cantidad: '1 ud',
      imagen: '/img/logo.png',
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4 text-green-500">Comprar</h1>
      <div className="mb-4 w-full max-w-xs">
        {productos.map((producto) => (
          <div 
            key={producto.id} 
            className={`flex items-center mb-4 p-2 border border-gray-300 rounded cursor-pointer ${selectedProducts.some((p) => p.id === producto.id) ? 'bg-blue-100' : ''}`} 
            onClick={() => handleSelectProduct(producto)}
          >
            <img src={producto.imagen} alt={producto.nombre} className="w-16 h-16 object-cover rounded" />
            <div className="ml-4">
              <h2 className="text-lg font-semibold text-gray-900">{producto.nombre}</h2>
              <p className='text-gray-800'>{producto.precio}</p>
              <p className='text-gray-800'>{producto.cantidad}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex space-x-4">
        <button
          onClick={handleBack}
          className="px-4 py-2 bg-gray-500 text-white font-semibold rounded shadow hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
        >
          Atrás
        </button>
        <button
          onClick={handlePurchase}
          disabled={selectedProducts.length === 0}
          className={`px-4 py-2 font-semibold rounded shadow focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
            selectedProducts.length > 0 ? 'bg-green-500 text-white hover:bg-green-700 focus:ring-green-500' : 'bg-gray-400 text-gray-700 cursor-not-allowed'
          }`}
        >
          Comprar
        </button>
      </div>
    </div>
  );
};

export default Tienda;
