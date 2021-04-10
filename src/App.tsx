import React, { useEffect, useState } from 'react';
import { SaveIcon, EditIcon, CloseIcon } from './icon';
const API_HOST = 'http://localhost:4000';
const INVENTORY_API_URL = `${API_HOST}/inventory`;

type DATA = {
   id: 1;
   product_name: string;
   product_category: string;
   unit_price: string;
};
type EDITMODE = {
   status: boolean;
   rowKey: number | null;
};
type onEDIT = {
   id: number;
   currentUnitPrice: string;
};

type updateINVENTORY = {
   id: number;
   newUnitPrice: string;
};
type SAVE = {
   id: number;
   newUnitPrice: string;
};

function App() {
   const [data, setData] = useState<DATA[]>([]);
   const [inEditMode, setInEditMode] = useState<EDITMODE>({
      status: false,
      rowKey: null
   });
   const [unitPrice, setUnitPrice] = useState('');

   const fetchInventory = () => {
      fetch(`${INVENTORY_API_URL}`)
         .then((res) => res.json())
         .then((json) => setData(json));
   };
   useEffect(() => {
      fetchInventory();
   }, []);

   const onEdit = ({ id, currentUnitPrice }: onEDIT) => {
      setInEditMode({
         status: true,
         rowKey: id
      });
      setUnitPrice(currentUnitPrice);
   };

   const updateInventory = ({ id, newUnitPrice }: updateINVENTORY) => {
      fetch(`${INVENTORY_API_URL}/${id}`, {
         method: 'PATCH',
         body: JSON.stringify({
            unit_price: newUnitPrice
         }),
         headers: {
            'Content-type': 'application/json; charset=UTF-8'
         }
      })
         .then((response) => response.json())
         .then((json) => {
            // reset inEditMode and unit price state values
            onCancel();
            // fetch the updated data
            fetchInventory();
         });
   };

   const onSave = ({ id, newUnitPrice }: SAVE) => {
      updateInventory({ id, newUnitPrice });
   };

   const onCancel = () => {
      // reset the inEditMode state value
      setInEditMode({
         status: false,
         rowKey: null
      });
      // reset the unit price state value
      setUnitPrice('');
   };

   return (
      <div className='max-w-7xl mx-auto sm:px-6 lg:px-8'>
         <div className='flex flex-col'>
            <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
               <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
                  <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'></div>

                  <table className='table'>
                     <thead>
                        <tr>
                           <th scope='col' className='th'>
                              Product Name
                           </th>
                           <th scope='col' className='th'>
                              Product Category
                           </th>
                           <th scope='col' className='th'>
                              Unit Price
                           </th>
                           <th scope='col' className='th'>
                              Action
                           </th>
                        </tr>
                     </thead>
                     <tbody className='tbody' x-max='1'>
                        {data.map((item) => (
                           <tr key={item.id}>
                              <td className='td-bold'>{item.product_name}</td>
                              <td className='td-thin'>
                                 {item.product_category}
                              </td>
                              <td className='td-thin'>
                                 {inEditMode.status &&
                                 inEditMode.rowKey === item.id ? (
                                    // SHOW INPUT
                                    <input
                                       className='bg-gray-200 p-1 text-black'
                                       value={unitPrice}
                                       onChange={(event) =>
                                          setUnitPrice(event.target.value)
                                       }
                                    />
                                 ) : (
                                    item.unit_price
                                    // SHOW PRICE
                                 )}
                              </td>
                              <td className='td-thin'>
                                 {inEditMode.status &&
                                 inEditMode.rowKey === item.id ? (
                                    <React.Fragment>
                                       <button
                                          onClick={() =>
                                             onSave({
                                                id: item.id,
                                                newUnitPrice: unitPrice
                                             })
                                          }>
                                          <SaveIcon />
                                       </button>

                                       <button
                                          style={{ marginLeft: 8 }}
                                          onClick={() => onCancel()}>
                                          <CloseIcon />
                                       </button>
                                    </React.Fragment>
                                 ) : (
                                    <button
                                       onClick={() =>
                                          onEdit({
                                             id: item.id,
                                             currentUnitPrice: item.unit_price
                                          })
                                       }>
                                       <EditIcon />
                                    </button>
                                 )}
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
      </div>
   );
}
export default App;
