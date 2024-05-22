import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { firestore, auth } from '../utils/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

const VerFacturas = () => {
  const router = useRouter();
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userEmail = user.email; // Obtener el correo electrónico del usuario
          console.log("Fetching invoices for user:", userEmail);

          const q = query(
            collection(firestore, 'orders'),
            where('userEmail', '==', userEmail),
            where('validated', '==', true)
          );

          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            const invoicesData = querySnapshot.docs.map(doc => doc.data());
            console.log("Invoices data:", invoicesData);
            setInvoices(invoicesData);
          } else {
            console.log("No invoices found for this user.");
            setInvoices([]);
          }
        } else {
          console.log("User not authenticated.");
        }
      } catch (error) {
        console.error("Error fetching invoices: ", error);
      }
    };

    fetchInvoices();
  }, []);

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4 text-green-500">Facturas</h1>
      <div className="mb-4 w-full max-w-xs">
        {invoices.length === 0 ? (
          <p className='text-green-500 text-center'>No hay facturas disponibles.</p>
        ) : (
          invoices.map((invoice, index) => (
            <div key={index} className="flex items-center mb-4 p-2 border border-gray-300 rounded">
              <div className="flex-1">
                {invoice.products.map((product, prodIndex) => (
                  <div key={prodIndex}>
                    <h2 className="text-lg font-semibold text-gray-900">{product.nombre}</h2>
                    <p className="text-gray-800">{product.precio}</p>
                  </div>
                ))}
              </div>
              <button
                onClick={() => {}}
                className="px-2 py-1 bg-blue-500 text-white font-semibold rounded shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Ver
              </button>
            </div>
          ))
        )}
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

export default VerFacturas;
