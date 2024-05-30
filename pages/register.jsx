'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { auth, firestore } from '../utils/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { HiInformationCircle } from "react-icons/hi";
import { Alert, Checkbox } from "flowbite-react";

const Register = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    studentName: '',
    studentLastName: '',
    studentAge: '',
    studentAddress: '',
    studentDNI: '',
    tutorName: '',
    tutorLastName: '',
    tutorEmail: '',
    tutorPhone: '',
    enrollment: '',
    iban: '',
    username: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    if (!formData.studentName) return 'El nombre del estudiante es obligatorio';
    if (!formData.studentLastName) return 'Los apellidos del estudiante son obligatorios';
    if (!formData.studentAge) return 'La edad del estudiante es obligatoria';
    if (!formData.studentAddress) return 'La dirección del estudiante es obligatoria';
    if (!formData.studentDNI) return 'El DNI del estudiante es obligatorio';
    if (!formData.tutorName) return 'El nombre del tutor es obligatorio';
    if (!formData.tutorLastName) return 'Los apellidos del tutor son obligatorios';
    if (!formData.tutorEmail) return 'El email del tutor es obligatorio';
    if (!formData.tutorPhone) return 'El teléfono del tutor es obligatorio';
    if (!formData.enrollment) return 'La matrícula es obligatoria';
    if (!formData.iban) return 'El IBAN es obligatorio';
    if (!formData.username) return 'El nombre de usuario es obligatorio';
    if (!formData.password) return 'La contraseña es obligatoria';
    return '';
  };

  const handleBack = () => {
    router.back();
  };

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    const updatedAddress = isChecked ? `${formData.studentAddress}#yes` : formData.studentAddress;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.tutorEmail, formData.password);
      const user = userCredential.user;

      await setDoc(doc(firestore, 'students', user.uid), {
        studentName: formData.studentName,
        studentLastName: formData.studentLastName,
        studentAge: formData.studentAge,
        studentAddress: updatedAddress,
        studentDNI: formData.studentDNI,
        tutorName: formData.tutorName,
        tutorLastName: formData.tutorLastName,
        tutorEmail: formData.tutorEmail,
        tutorPhone: formData.tutorPhone,
        enrollment: formData.enrollment,
        iban: formData.iban,
        username: formData.username,
      });

      alert('Usuario registrado exitosamente');
      router.push('/menuuser');
    } catch (error) {
      console.error('Error al registrar: ', error);
      setError('Error al registrar: ' + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4 text-green-500">Registro de Usuario
      </h1>
      {error && (
        <div className="w-full max-w-md mx-auto mb-4">
          <Alert color="failure" icon={HiInformationCircle} className="text-center p-4 text-xl">
            <span className="font-medium text-red-700">{error}</span>
          </Alert>
        </div>
      )}
      <form className="mb-4 w-full max-w-xs" onSubmit={handleRegister}>
        <div className="mb-4">
          <h5 className="text-xl font-bold mb-4 text-green-500">Datos del alumno</h5>
          <label className="block text-gray-700">Nombre</label>
          <input 
            type="text" 
            name="studentName"
            value={formData.studentName}
            onChange={handleChange}
            placeholder="Nombre" 
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
          />
          <label className="block text-gray-700">Apellidos</label>
          <input 
            type="text" 
            name="studentLastName"
            value={formData.studentLastName}
            onChange={handleChange}
            placeholder="Apellidos" 
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
          />
          <label className="block text-gray-700">Edad</label>
          <input 
            type="date" 
            name="studentAge"
            value={formData.studentAge}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
          />
          <label className="block text-gray-700">Dirección</label>
          <input 
            type="text" 
            name="studentAddress"
            value={formData.studentAddress}
            onChange={handleChange}
            placeholder="Dirección" 
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
          />
          <label className="block text-gray-700">DNI</label>
          <input 
            type="text" 
            name="studentDNI"
            value={formData.studentDNI}
            onChange={handleChange}
            placeholder="DNI" 
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
          />
        </div>
        <div className="mb-4">
          <h5 className="text-xl font-bold mb-4 text-green-500">Datos del tutor</h5>
          <label className="block text-gray-700">Nombre</label>
          <input 
            type="text" 
            name="tutorName"
            value={formData.tutorName}
            onChange={handleChange}
            placeholder="Nombre" 
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
          />
          <label className="block text-gray-700">Apellidos</label>
          <input 
            type="text" 
            name="tutorLastName"
            value={formData.tutorLastName}
            onChange={handleChange}
            placeholder="Apellidos" 
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
          />
          <label className="block text-gray-700">Email</label>
          <input 
            type="email" 
            name="tutorEmail"
            value={formData.tutorEmail}
            onChange={handleChange}
            placeholder="Email" 
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
          />
          <label className="block text-gray-700">Teléfono</label>
          <input 
            type="tel" 
            name="tutorPhone"
            value={formData.tutorPhone}
            onChange={handleChange}
            placeholder="Teléfono" 
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
          />
          <label className="block text-gray-700">Matrícula</label>
          <input 
            type="text" 
            name="enrollment"
            value={formData.enrollment}
            onChange={handleChange}
            placeholder="Matrícula"
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
          />
          <label className="block text-gray-700">IBAN</label>
          <input 
            type="text" 
            name="iban"
            value={formData.iban}
            onChange={handleChange}
            placeholder="IBAN" 
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
          />
        </div>
        <div className="mb-4">
          <h5 className="text-xl font-bold mb-4 text-green-500">Creación de usuario</h5>
          <label className="block text-gray-700">Nombre de usuario</label>
          <input 
            type="text" 
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Nombre de usuario" 
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
          />
          <label className="block text-gray-700">Contraseña</label>
          <input 
            type="password" 
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Contraseña" 
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
          />
            <label htmlFor="checkbox" className="block text-gray-700">
              Familia numerosa
            </label>
            <Checkbox
              id="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
            >
            </Checkbox>
        </div>
        <button
          onClick={handleBack}
          className="px-4 py-2 bg-gray-500 text-white font-semibold rounded shadow hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
        >
          Atrás
        </button>
        <button 
          type="submit"
          className="px-4 py-2 bg-green-500 text-white font-semibold rounded shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Register;
