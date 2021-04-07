import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type openProp = {
   open: boolean;
};
const SideBar = ({ open }: openProp) => {
   const sidebarAnim = {
      hidden: { opacity: 0 },
      show: { opacity: 1, transition: { duration: 0.5 } }
   };
   let large = useMedia('(min-width: 600px)');
   console.log(large);
   return (
      <motion.div
         variants={sidebarAnim}
         initial={false}
         animate={large || open ? 'show' : 'hidden'}
         className={`sm:flex w-1/3 bg-gray-200 border-r-2 border-gray-300 shadow-inner  p-5 sm:w-1/4 ${
            open ? 'flex' : 'hidden'
         } 
          `}>
         <div className='bg-gray-500 mt-5 h-4 my-2 w-full'>
            <h1 className='text-3xl font-bold text-gray-700 text-center'>
               LOGO
            </h1>
            <div className='flex mt-20 w-full flex-col p-2'>
               <div className='w-full py-2 px-2 bg-gray-300 hover:bg-gray-400'>
                  <a href='/home'> HOME</a>
               </div>
               <div className='w-full py-2 px-2 hover:bg-gray-400 '>
                  <a href='/home'> HOME</a>
               </div>
               <div className='w-full py-2 px-2 hover:bg-gray-400'>
                  <a href='/home'> HOME</a>
               </div>
            </div>
         </div>
      </motion.div>
   );
};

type Toggle = {
   toggle: () => void;
};

function useMedia(query: string) {
   const [matches, setMatches] = useState(window.matchMedia(query).matches);
   console.log(window.matchMedia(query));

   // cDM, cDU

   useEffect(() => {
      let media = window.matchMedia(query);
      if (media.matches !== matches) {
         setMatches(media.matches);
      }
      let listener = () => setMatches(media.matches);
      media.addEventListener('change', listener);
      return () => media.removeEventListener('change', listener);
   }, [query]);

   return matches;
}

const Header = ({ toggle }: Toggle) => {
   return (
      <div className='bg-gray-50 h-20 w-full flex items-center pl-5'>
         <motion.button
            onClick={toggle}
            className={`focus:outline-none sm:hidden`}>
            <svg
               xmlns='http://www.w3.org/2000/svg'
               className='h-6 w-6'
               fill='none'
               viewBox='0 0 24 24'
               stroke='currentColor'>
               <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 6h16M4 12h16M4 18h16'
               />
            </svg>
         </motion.button>
      </div>
   );
};

const Main = () => {
   return <div className='bg-gray-100  w-full  h-full '></div>;
};
function App() {
   const [open, isOpen] = useState(false);
   const toggle = () => {
      isOpen(!open);
      console.log(open);
   };
   return (
      <div className='flex h-screen bg-gray-100'>
         <SideBar open={open} />
         <div className='flex w-full  flex-col'>
            <Header toggle={toggle} />
            <Main />
         </div>
      </div>
   );
}

export default App;
