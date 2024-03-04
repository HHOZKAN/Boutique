import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { cartActions } from '../../../features/cartSlice';
import { useNavigate } from 'react-router-dom';


export const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [address, setAdress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');

  const handleContinue = () => {
    if (address && city && postalCode && country) {
      dispatch(cartActions.saveShippingAddress({ address, city, postalCode, country }));
      navigate('/payment'); 
    } else {
      alert('Veuillez remplir tous les champs');
    }
  };
  
  return (
    <div className="">
      <div className="w-full max-w-3xl mx-auto p-8">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md border dark:border-gray-700">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-2">Adresse de livraison</h2>
            <div className="grid grid-cols-2 gap-4">
            </div>

            <div className="mt-4">
              <label htmlFor="address" className="block text-gray-700 dark:text-white mb-1">Adresse</label>
              <input type="text" id="address" className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                value={address}
                required
                onChange={(e) => setAdress(e.target.value)} />
            </div>

            <div className="mt-4">
              <label htmlFor="city" className="block text-gray-700 dark:text-white mb-1">Vile</label>
              <input type="text" id="city" className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                value={city}
                required
                onChange={(e) => setCity(e.target.value)} />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="mt-4">
                <label htmlFor="postalCode" className="block text-gray-700 dark:text-white mb-1">Code Postale</label>
                <input type="text" id="postalCode" className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                  value={postalCode}
                  required
                  onChange={(e) => setPostalCode(e.target.value)} />
              </div>
              <div className="mt-4">
                <label htmlFor="country" className="block text-gray-700 dark:text-white mb-1">Pays</label>
                <input type="text" id="country" className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                  value={country}
                  required
                  onChange={(e) => setCountry(e.target.value)} />
              </div>

            </div>
          </div>
          <div className="mt-8 flex justify-end">
            <button className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-700 dark:bg-teal-600 dark:text-white dark:hover:bg-teal-900" onClick={handleContinue}>CONTINUER VERS LE PAIEMENT</button>          </div>
        </div>
      </div>
    </div>
  );
};