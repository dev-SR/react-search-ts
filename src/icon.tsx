import React, { useEffect, useState } from 'react';

export const SaveIcon = () => (
   <svg
      xmlns='http://www.w3.org/2000/svg'
      className='h-6 w-6 text-green-500'
      fill='none'
      viewBox='0 0 24 24 '
      stroke='currentColor'>
      <path
         strokeLinecap='round'
         strokeLinejoin='round'
         strokeWidth={2}
         d='M5 13l4 4L19 7'
      />
   </svg>
);
export const CloseIcon = () => (
   <svg
      xmlns='http://www.w3.org/2000/svg'
      className='h-6 w-6 text-red-500'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'>
      <path
         strokeLinecap='round'
         strokeLinejoin='round'
         strokeWidth={2}
         d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
      />
   </svg>
);
export const EditIcon = () => (
   <svg
      xmlns='http://www.w3.org/2000/svg'
      className='h-6 w-6 text-blue-500'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'>
      <path
         strokeLinecap='round'
         strokeLinejoin='round'
         strokeWidth={2}
         d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
      />
   </svg>
);
