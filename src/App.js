import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FormTable from './component/formtable';

axios.defaults.baseURL = 'http://localhost:7000/';

function App() {
  const [addSection, setAddSection] = useState(false);
  const [editSection , setEditSection] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
  });
  const [formDataEdit, setFormDataEdit ] = useState({
    name: '',
    email: '',
    mobile: '',
    id : ""
  });
  const [dataList, setDataList] = useState([]);

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post('/create', formData);
      console.log(data);
      if (data.data.success) {
        setAddSection(false);
        alert(data.data.message);
        getFetchData();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getFetchData = async () => {
    try {
      const data = await axios.get('/');
      console.log(data);
      if (data.data.success) {
        setDataList(data.data.data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    getFetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const data = await axios.delete('/delete/' + id);
      if (data.data.success) {
        getFetchData();
        alert(data.data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      const data = await axios.put('/update', formDataEdit);
      console.log(data);
      if (data.data.success) {
        setEditSection(false);
        alert(data.data.message);
        getFetchData();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEditOnChange = async (e) => {
    const { value, name } = e.target;
    setFormDataEdit((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  
  const handleEdit = (el) => {
    setFormDataEdit({
      name: el.name,
      email: el.email,
      mobile: el.mobile,
      id: el._id,
    });
    setEditSection(true);
  };

  return (
    <>
      <div className="container">
        <button className="btn btn-add" onClick={() => setAddSection(true)}>
          add
        </button>

        {addSection && (
          <FormTable
            handleSubmit={handleSubmit}
            handleOnChange={handleOnChange}
            handleclose={() => setAddSection(false)}
            rest={formData}
          />
        )}
        {
          editSection && (
            <FormTable
            handleSubmit={handleUpdate}
            handleOnChange={handleEditOnChange}
            handleclose={() => setEditSection(false)}
            rest={formDataEdit}
          />
          )
        }

        <div className="tableContainer">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {dataList.length ? (
                dataList.map((el) => (
                  <tr key={el._id}>
                    <td>{el.name}</td>
                    <td>{el.email}</td>
                    <td>{el.mobile}</td>
                    <td>
                    <button className="btn btn-edit" onClick={() => handleEdit(el)}>Edit</button>
                      <button
                        className="btn btn-delete"
                        onClick={() => handleDelete(el._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center' }}>
                    No data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default App;

// krishna
