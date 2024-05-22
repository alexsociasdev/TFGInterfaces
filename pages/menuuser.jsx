import React from 'react';
import { useRouter } from 'next/router';

const MenuUser = () => {
  const router = useRouter();

  const handleLogout = () => {
    router.push('/');
  };

  const handleFacturas = () => {
    router.push('/verFacturas');
  };

  const handlePedidos = () => {
    router.push('/tienda');
  };

  const handlePerfil = () => {
    router.push('/perfil');
  };


  return (
    <div className="flex flex-col items-center justify-center h-screen p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4 text-green-500">Menú de usuario</h1>
      <div className="mb-4 w-full max-w-xs">
        <button
          onClick={handleFacturas}
          className="w-full px-4 py-2 mb-4 bg-blue-500 text-white font-semibold rounded shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Facturas
        </button>
        <button
          onClick={handlePedidos}
          className="w-full px-4 py-2 mb-4 bg-blue-500 text-white font-semibold rounded shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Pedidos
        </button>
        <button
          onClick={handlePerfil}
          className="w-full px-4 py-2 mb-4 bg-blue-500 text-white font-semibold rounded shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Perfil
        </button>
      </div>
      <button
        onClick={handleLogout}
        className="w-full px-4 py-2 mt-4 bg-red-500 text-white font-semibold rounded shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
      >
        Salir
      </button>
    </div>
  );
};

export default MenuUser;
