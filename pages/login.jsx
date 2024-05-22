import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { auth, firestore } from '../utils/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';

const Home = () => {
  const router = useRouter();
  const [identifier, setIdentifier] = useState(''); // Puede ser email o nombre de usuario
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = () => {
    router.push('/register');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let email = identifier;

      // Verifica si el identificador es un nombre de usuario
      if (!identifier.includes('@')) {
        const q = query(collection(firestore, 'students'), where('username', '==', identifier));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          email = querySnapshot.docs[0].data().tutorEmail;
        } else {
          throw new Error('Nombre de usuario no encontrado');
        }
      }

      await signInWithEmailAndPassword(auth, email, password);

      // Verifica si el usuario es admin
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDocs(query(collection(firestore, 'students'), where('tutorEmail', '==', email)));
        if (!userDoc.empty) {
          const userData = userDoc.docs[0].data();
          if (userData.username === 'admin' && password === 'admin2024') {
            router.push('/menuadmin');
          } else {
            router.push('/menuuser');
          }
        } else {
          throw new Error('Error al verificar el rol del usuario');
        }
      } else {
        throw new Error('Error al autenticar el usuario');
      }
    } catch (error) {
      console.error('Error al iniciar sesión: ', error);
      alert('Error al iniciar sesión: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4 bg-gray-100">
      <div className="mb-4">
        <img src="/img/logo.png" alt="Imagen" className="w-24 h-24 object-cover rounded" />
      </div>
      <form className="mb-4 w-full max-w-xs" onSubmit={handleLogin}>
        <input 
          type="text" 
          placeholder="Email o Nombre de usuario" 
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
        />
        <input 
          type="password" 
          placeholder="Contraseña" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
        />
        <div className="flex space-x-4">
          <button 
            type="submit"
            className={`px-4 py-2 bg-green-500 text-white font-semibold rounded shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 ${loading ? 'cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Cargando...' : 'Login'}
          </button>
          <button
            type="button"
            onClick={handleRegister}
            className="px-4 py-2 bg-green-500 text-white font-semibold rounded shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Home;
