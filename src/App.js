import './App.css';
import { uniqueId } from 'lodash';
import { useState, useEffect } from 'react'
import { API } from './api/API.js'
import ViewContactList from './components/ViewContactList.js'

function App() {
  const blankForm = {
    id: null,
    name: '',
    email: ''
  }
  const [contactList, setContactList] = useState([]);   // View function
  const [formItem, setFormItem] = useState(blankForm);  // Add + Edit function
  const [isEditMode, setIsEditMode] = useState(false);  // Edit function

  const apiGetContacts = async () => {

    // const res = await API.get('contacts');
    // console.log('apiGetContacts, response:', res);
    const { status, data } = await API.get('/contacts');
    // console.log('apiGetContacts, data:', data);
    if (status === 200) {
      setContactList(data);
    }
  }
/*
  const apiGetStockPrices = async () => {
    // const { status, data } = await API.get('/qu/quote?symbol=MSFT')
    const { status, data } = await API.get('/hi/history?symbol=MSFT&interval=1d');
    if (status === 200) {
      console.log(data);
    }
  }
*/
  // Delete contact (Add async/wait for API)
  const deleteItem = async (id) => { 
    const newList = contactList.filter( item => item.id !== id );
    setContactList(newList);
    setIsEditMode(false); // For Edit function
    try {
      const response = await API.delete(`/contacts/${id}`);
      console.log('API.delete response:', response);
    } catch (err) {
      console.log('API.delete error:', err.message);
    }
  }
  // Edit contact form setup (1)
  const editItem = item => {
    console.log('editItem:', item);
    setFormItem({
      id: item.id,
      name: item.name,
      email: item.email
    })
    setIsEditMode(true);
  }
  // Handler for submit button
  const handleSubmit = async () => {
    console.log('handlerSubmit:');
    // Update edited item (PUT)
    if (isEditMode) {
      const newList = contactList.map( item => item.id === formItem.id ? formItem : item );
      setContactList(newList);
      setIsEditMode(false);
      try {
        const response = await API.put(`/contacts/${formItem.id}`, formItem);
        console.log('API.put response:', response);
      } catch (err) {
        console.log('API.put error:', err.message);
      }  
    } else {
    // Add new item (POST)
      const newItem = {...formItem, id: uniqueId('id')};
      const newList = [newItem, ...contactList];
      setContactList(newList);
      // console.log('addItem:', newItem, newList);
      try {
        const response = await API.post('/contacts', newItem)
        console.log('API.post response:', response);
      } catch (err) {
        console.log('API.post error:', err.message);
      }
    }
    setFormItem(blankForm);
  }
  // Handler for input field boxes
  const handleInput = e => {
    const { name, value } = e.target;
    const newItem = {...formItem, [name]: value}
    setFormItem(newItem)
  }
  // Handler for cancel button
  const handleCancel = e => {
    console.log('handleCancel');
    setFormItem(blankForm);
    setIsEditMode(false);  
  }

  // Load contact list when component is mounted
  useEffect( () => {
    apiGetContacts();
    // apiGetStockPrices();
  }, [])
  
  return (
    <div className="App container">
      <h1>React CRUD with Axios + API</h1>
      { /* Add conditional rendering for Edit function */
        isEditMode 
        ? <h2>Edit Contact</h2>
        : <h2>Add Contact</h2>
      }
      <form>
        <label>Name</label>
        <input type="text" 
          name="name" 
          value={formItem.name}
          onChange={handleInput} />
        <label>Email</label>
        <input type="email" 
          name="email" 
          value={formItem.email}
          onChange={handleInput} />
      </form>
      <br />
      <button onClick={handleSubmit} className="button primary">Submit</button>
      { /* Add conditional rendering for Edit function */
        isEditMode 
        ? <>
          <button onClick={handleCancel} className="button">Cancel</button>
          <ViewContactList 
            contactList={contactList} />
          </>
        : <> 
          <br />
          <ViewContactList 
          contactList={contactList} 
          deleteItem={deleteItem} 
          editItem={editItem} />
         </>
        }
    </div>
  );
}

export default App;
