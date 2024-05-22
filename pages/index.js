import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useRouter } from 'next/router'
import { Card, Button } from 'flowbite-react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/login'); 
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4 bg-gray-100">
      <h1 className="text-2xl font-bold text-green-500 mb-4">Bienvenido a la app del CIDE</h1>
      <div className="mb-4">
        <img src="/img/logo.png" alt="Imagen" className="w-64 h-64 object-cover rounded" />
      </div>
      <button
        onClick={handleLogin}
        className="px-4 py-2 bg-green-500 text-white font-semibold rounded shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Entrar
      </button>
    </div>
  );
}
