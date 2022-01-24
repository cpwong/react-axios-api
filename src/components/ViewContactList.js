import React from 'react'
import { uniqueId } from 'lodash';

export default function ViewContactList(props) {
  // Add the default values when creating Edit function
  const { contactList, deleteItem = 0, editItem = 0 } = props;

  return(
    <div>
      <h2>Contact List</h2>
      <table className='striped'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Edit/Delete</th>
          </tr>
        </thead>
        <tbody>
        {
          contactList.length > 0 
          ? contactList.map( c => 
            <tr key={uniqueId('a')}>
              <td>{c.id}</td>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>
              { /* Add conditional rendering when creating Edit function */ 
                deleteItem && editItem 
                ? <>
                  <button className='button icon-only' onClick={() => editItem(c)}>📝</button>
                  <button className='button icon-only' onClick={() => deleteItem(c.id)}>❌</button>
                  </>  
                : null
              }
              </td>
            </tr> )
          : <tr><td colSpan="5">No items in the list</td></tr>
        }
        </tbody>
      </table>
    </div>
  )
}