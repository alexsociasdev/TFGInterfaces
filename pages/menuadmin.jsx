import React from 'react';
import { useRouter } from 'next/router';
import { auth } from '../utils/firebase';

const MenuAdmin = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      router.push('/');
    } catch (error) {
      console.error('Error al cerrar sesión: ', error);
      alert('Error al cerrar sesión');
    }
  };

  const navigateTo = (path) => {
    router.push(path);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4 text-green-500">Menú de administrador</h1>
      <div className="mb-4">
        <img src="/img/admin.jpg" alt="Perfil" className="w-24 h-24 object-cover rounded-full" />
      </div>
      <div className="mb-4 w-full max-w-xs">
        <button
          onClick={() => navigateTo('/validarfacturas')}
          className="w-full px-4 py-2 mb-4 bg-green-500 text-white font-semibold rounded shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >
          Validar Facturas
        </button>
        <button
          onClick={() => navigateTo('/buscaralumno')}
          className="w-full px-4 py-2 mb-4 bg-green-500 text-white font-semibold rounded shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >
          Buscar alumno
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

export default MenuAdmin;
