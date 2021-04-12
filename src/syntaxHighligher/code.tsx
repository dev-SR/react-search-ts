import React, { useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';

export const appCode = `
import React, { useEffect, useRef, useState } from 'react';
import {
   BrowserRouter as Router,
   Route,
   Link,
   useParams,
   useLocation
} from 'react-router-dom';
import Code, { appCode } from './syntaxHighligher/code';

type Country = {
   name: string;
};
type CountryList = Country[];

const FilterCom = () => {
   const [input, setInput] = useState('');
   // 2 different state is mandatory:One for original  data and one for filtered
   // data so that we won't modify actual data after each filtration

   const [countryListDefault, setCountryListDefault] = useState<CountryList>();
   const [countryListFiltered,setCountryListFiltered] = useState<CountryList>();

   const updateInput = async (input: string) => {
      // filter original
      const filtered = countryListDefault?.filter((country) => {
         if (input === '')
            //filter((n) => n.includes('')); if arg is an empty string  -> returns all
            return country.name.toLowerCase().includes(input.toLowerCase());
         //or, return country.name.toLowerCase().match(new RegExp(''));// /(?:)/
         else {
            var regex = new RegExp(\`\${input.toLowerCase()}\`); //if in-> a , out-> /a/
            return country.name.toLowerCase().match(regex);
         }
      });
      setInput(input);
      // set filtered data to Filter Sate
      setCountryListFiltered(filtered);
   };

   const fetchData = async () => {
      return await fetch('https://restcountries.eu/rest/v2/all')
         .then((response) => response.json())
         .then((data) => {
            setCountryListFiltered(data);
            setCountryListDefault(data);
         });
   };
   useEffect(() => {
      fetchData();
   }, []);

   return (
      <div className='w-full overflow-y-auto flex justify-center'>
         <div className='w-1/2 '>
            <div className='mt-10'>
               <input
                  value={input}
                  placeholder='search country'
                  className='border-yellow-400 border-2 rounded-lg w-full focus:border-yellow-500 bg-gray-800 focus:outline-none px-2 py-2 text-gray-100 placeholder-gray-500 flex'
                  autoComplete='off'
                  onChange={(e) => updateInput(e.target.value)}
               />
            </div>
            <div className='mt-10 '>
               {countryListFiltered?.map((data, index) => {
                  if (data) {
                     return (
                        <div key={data.name}>
                           <h1>{data.name}</h1>
                        </div>
                     );
                  }
                  return null;
               })}
            </div>
         </div>
      </div>
   );
};

const Nav = () => {
   const l = useLocation();

   return (
      <div className='flex w-full h-16 bg-gray-800 justify-center items-center'>
         <div className='flex ml-10 space-x-4'>
            <Link
               to='/code'
               className={\`text-xl \${
                  l.pathname === '/code' ? 'border-b-2 border-blue-200' : ''
               }\`}>
               Code
            </Link>

            <Link
               to='/'
               className={\`text-xl \${
                  l.pathname === '/' ? 'border-b-2 border-blue-200' : ''
               }\`}>
               Home
            </Link>
         </div>
      </div>
   );
};

function App() {
   return (
      <div className='h-screen flex flex-col bg-gray-900 text-gray-300  items-center '>
         <Router>
            <Nav />
            <div className='w-full flex-1 overflow-y-hidden flex flex-col'>
               <Route path='/code' exact>
                  <div className='w-full overflow-y-auto flex justify-center'>
                     <div className='w-11/12 '>
                        <Code code={appCode} language='javascript' />
                     </div>
                  </div>
               </Route>
               <Route path='/' exact>
                  <FilterCom />
               </Route>
            </div>
         </Router>
      </div>
   );
}

export default App;

`;
export default function Code({
   code,
   language
}: {
   code: string;
   language: string;
}) {
   useEffect(() => {
      Prism.highlightAll();
   }, []);
   return (
      <div className='w-full'>
         <pre className=' rounded-xl'>
            <code className={`language-${language} `}>{code}</code>
         </pre>
      </div>
   );
}
