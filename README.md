# React CRUD with Axios + API

## Create local JSON server
- Create `data.json` and insert data, e.g. from http://mockaroo.com 
- Don't forget to remove last comma (`,`) in the array!
### `data.json` format
```json
{
  "contacts":  // endpoint
  [
    {
      "id": 1, 
      "name": "Shayne Eliasson",
      "email": "seliasson0@fda.gov"
    },
    {
      ...
      // last item has no comma!
    }  
  ]
}
```
Start JSON server with NPX
```
npx json-server --port 3300 --watch data.json
```
- Check JSON server is running by going to http://localhost:3300/contacts
- JSON server data can have multiple endpoints by adding extra keys (e.g. "contacts") in the array
- For example, add a new "recipes" key in `data.json` and access it with http://localhost:3300/recipes 

## Create api modules
- Create ./api directory
- Create API.js
- Create axios instance in API.js
- Add `import API from './api/API.js'` to App.js file
- Test axios is able to connect to JSON server

## Start React app
- Add apiGetContacts to fetch data from the app and test it using `console.log()`
- Move apiGetContacts into `App.js`
- Add and useEffect and useState in `App.js` to download data upon App component mount
- Check component inspector to see state variables

## Create Components According to Functionality

### View
> `ViewContactList.js`
- Check props are correctly passed into component
- Create JSX to generate table with `.map` for each row item
- You can now view contact list in a table

### Add
> `App.js`
- Create hooks `[formItem, setFormItem] = useState`
- Create `handleSubmit` function for adding new contacts
- Create JSX to generate input form with button
- Create `newItem` state variable
- Add `onChange={handleInput}` for each input field
- Add `onClick={handleSubmit}` for submit button

### Delete
> `App.js`
- Create `deleteItem` function
> `ViewContactList.js`
- Create Delete button and `deleteItem` as `onClick` handler

### Edit
> `App.js`
- Create hooks `[isEditMode, setIsEditMode] = useState`
- Edit function has 2 parts
  - Edit contact form (`editItem`)
  - Update edited item in contactList (`updateItem`)
- Use isEditMode to switch between Add and Edit modes
- Modify `handleSubmit` function to add Edit mode functions
- Create Cancel button to clear form 
> `ViewContactList.js`
- Create Edit button and `props.editItem` as `onClick` handler
