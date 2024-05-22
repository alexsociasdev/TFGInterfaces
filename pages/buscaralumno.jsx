import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { firestore } from '../utils/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

const BuscarAlumno = () => {
  const router = useRouter();
  const [dni, setDni] = useState('');
  const [student, setStudent] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleSearch = async () => {
    setError(null);
    setStudent(null);
    setLoading(true);

    try {
      const q = query(collection(firestore, 'students'), where('studentDNI', '==', dni));
      const studentSnapshot = await getDocs(q);

      if (studentSnapshot.empty) {
        setError('No se encontró ningún alumno con este DNI.');
      } else {
        setStudent(studentSnapshot.docs[0].data());
      }
    } catch (error) {
      console.error('Error al buscar el alumno: ', error);
      setError('Error al buscar el alumno.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4 text-green-500">Buscar alumno</h1>
      <div className="mb-4 w-full max-w-xs">
        <label className="block text-gray-700">DNI</label>
        <input 
          type="text" 
          value={dni}
          onChange={(e) => setDni(e.target.value)}
          placeholder="DNI" 
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
        />
      </div>
      <div className="flex space-x-4">
        <button
          onClick={handleBack}
          className="px-4 py-2 bg-gray-500 text-white font-semibold rounded shadow hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
        >
          Atrás
        </button>
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-green-500 text-white font-semibold rounded shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          disabled={loading}
        >
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
      </div>
      {error && <p className="mt-4 text-red-500">{error}</p>}
      {student && (
        <div className="mt-4 p-4 border border-gray-300 rounded bg-white w-full max-w-xs">
          <h2 className="text-xl font-bold text-gray-900">Datos del Alumno</h2>
          <p className="text-gray-800"><strong>Nombre:</strong> {student.studentName}</p>
          <p className="text-gray-800"><strong>Apellidos:</strong> {student.studentLastName}</p>
          <p className="text-gray-800"><strong>Edad:</strong> {student.studentAge}</p>
          <p className="text-gray-800"><strong>Dirección:</strong> {student.studentAddress}</p>
          <p className="text-gray-800"><strong>DNI:</strong> {student.studentDNI}</p>
          <p className="text-gray-800"><strong>Nombre del tutor:</strong> {student.tutorName}</p>
          <p className="text-gray-800"><strong>Apellidos del tutor:</strong> {student.tutorLastName}</p>
          <p className="text-gray-800"><strong>Email del tutor:</strong> {student.tutorEmail}</p>
          <p className="text-gray-800"><strong>Teléfono del tutor:</strong> {student.tutorPhone}</p>
          <p className="text-gray-800"><strong>Matrícula:</strong> {student.enrollment}</p>
          <p className="text-gray-800"><strong>IBAN:</strong> {student.iban}</p>
          <p className="text-gray-800"><strong>Nombre de usuario:</strong> {student.username}</p>
        </div>
      )}
    </div>
  );
};

export default BuscarAlumno;
