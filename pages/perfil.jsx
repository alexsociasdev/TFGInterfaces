import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { auth, firestore } from '../utils/firebase';
import { doc, getDoc } from 'firebase/firestore';

const Perfil = () => {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userDocRef = doc(firestore, 'students', user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          } else {
            console.error('No se encontró el documento del usuario');
          }
        } catch (error) {
          console.error('Error al obtener los datos del usuario:', error);
        }
      } else {
        console.error('No hay usuario autenticado');
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  const handleBack = () => {
    router.push('/menuuser');
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!userData) {
    return <p>No se encontraron datos del usuario.</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4 text-green-500">Perfil</h1>
      <div className="mb-4">
        <img src="/img/FotoPerfil.JPG" alt="Perfil" className="w-24 h-24 object-cover rounded-full" />
      </div>
      <div className="mb-4 w-full max-w-xs">
        <label className="block text-gray-700">Nombre</label>
        <input 
          type="text" 
          value={userData.studentName} 
          readOnly
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none text-black"
        />
        <label className="block text-gray-700">Apellidos</label>
        <input 
          type="text" 
          value={userData.studentLastName} 
          readOnly
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none text-black"
        />
        <label className="block text-gray-700">DNI</label>
        <input 
          type="text" 
          value={userData.studentDNI} 
          readOnly
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none text-black"
        />
        <label className="block text-gray-700">Fecha de Nacimiento</label>
        <input 
          type="date" 
          value={userData.studentAge} 
          readOnly
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none text-black"
        />
      </div>
      <div className="mb-4 w-full max-w-xs">
        <h5 className="text-xl font-bold mb-4 text-green-500">Datos del Tutor</h5>
        <label className="block text-gray-700">Nombre</label>
        <input 
          type="text" 
          value={userData.tutorName} 
          readOnly
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none text-black"
        />
        <label className="block text-gray-700">Apellidos</label>
        <input 
          type="text" 
          value={userData.tutorLastName} 
          readOnly
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none text-black"
        />
        <label className="block text-gray-700">Email</label>
        <input 
          type="email" 
          value={userData.tutorEmail} 
          readOnly
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none text-black"
        />
        <label className="block text-gray-700">Teléfono</label>
        <input 
          type="tel" 
          value={userData.tutorPhone} 
          readOnly
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none text-black"
        />
        <label className="block text-gray-700">Matrícula</label>
        <input 
          type="text" 
          value={userData.enrollment} 
          readOnly
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none text-black"
        />
        <label className="block text-gray-700">IBAN</label>
        <input 
          type="text" 
          value={userData.iban} 
          readOnly
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none text-black"
        />
      </div>
      <div className="mb-4 w-full max-w-xs">
        <h5 className="text-xl font-bold mb-4 text-green-500">Usuario</h5>
        <label className="block text-gray-700">Nombre de usuario</label>
        <input 
          type="text" 
          value={userData.username} 
          readOnly
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none text-black"
        />
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

export default Perfil;
