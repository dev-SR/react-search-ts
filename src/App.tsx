import React, { useEffect, useRef, useState } from 'react';

const ReducerButton = () => {};

type Country = {
   name: string;
};
type CountryList = Country[];

function App() {
   const [input, setInput] = useState('');
   const [countryListDefault, setCountryListDefault] = useState<CountryList>();
   const [countryList, setCountryList] = useState<CountryList>();
   const fetchData = async () => {
      return await fetch('https://restcountries.eu/rest/v2/all')
         .then((response) => response.json())
         .then((data) => {
            setCountryList(data);
            setCountryListDefault(data);
         });
   };

   const updateInput = async (input: string) => {
      const filtered = countryList?.filter((country) => {
         return country.name.toLowerCase().includes(input.toLowerCase());
      });
      setInput(input);
      setCountryList(filtered);
   };

   useEffect(() => {
      fetchData();
   }, []);

   return (
      <div className='h-screen flex flex-col bg-gray-900 text-gray-300 overflow-auto items-center '>
         <div className='w-1/2 mt-10'>
            <input
               value={input}
               placeholder='search country'
               className='p-2 ring-2 border focus:ring-red-500
                focus:border-red-500'
               onChange={(e) => updateInput(e.target.value)}
            />
         </div>
         <div className='w-1/2 mt-10'>
            {countryList?.map((data, index) => {
               if (data) {
                  return (
                     <div key={data.name}>
                        <h1>{data.name}</h1>
                     </div>
                  );
               }
               return null;
            })}{' '}
         </div>
      </div>
   );
}

export default App;
