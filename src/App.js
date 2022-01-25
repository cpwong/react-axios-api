import './App.css';
import { uniqueId } from 'lodash';
import { useState, useEffect } from 'react'
import { API, API2 } from './api/API.js'
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

  // Fetch contact data from API
  const apiGetContacts = async () => {
    
  }

  // Delete contact 
  const deleteItem = async (id) => { 
    const newList = contactList.filter( item => item.id !== id );
    setContactList(newList);
    setIsEditMode(false);   // For Edit function
    // Add async/wait for API.delete
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
    
    if (isEditMode) {
      const newList = contactList.map( item => item.id === formItem.id ? formItem : item );
      setContactList(newList);
      setIsEditMode(false);
      // Add async/await for API.put


    } else {
      const newItem = {...formItem, id: uniqueId('id')};
      const newList = [newItem, ...contactList];
      setContactList(newList);
      // Add async/await for API.post
           
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
    console.log('App.useEffect')
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
