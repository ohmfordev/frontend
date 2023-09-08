import { useState } from "react";

import "./App.css";
import Axios from "axios";
function App() {
  const [employeeList, setEmployeeList] = useState([]);


  const [userList, setuserList] = useState([]);

  const [name, SetName] = useState("");
  const [age, SetAge] = useState(0);
  const [country, SetCountry] = useState("");
  const [position, SetPosition] = useState("");
  const [wage, SetWage] = useState(0);
  const [newWage, SetNewWage] = useState(0);

  const getEmployees = () => {
    Axios.get("http://localhost:3001/employees").then((res) => {
      setEmployeeList(res.data);

      console.log("data getEmployyee List :",res.data)
    });
  };
  const getUserAll = () => {
    Axios.get("http://localhost:7000/users").then((res) => {
      setuserList(res.data);

      console.log("data User List :",res.data)
    });
  };

  const updateEmployeeWage = (id) => {
    Axios.put("http://localhost:3001/update", {
      wage: newWage,
      id: id,
    }).then((response) => {
      setEmployeeList(
        employeeList.map((val) => {
          return val.id == id
            ? {
                id: val.id,
                name: val.name,
                country: val.country,
                age: val.age,
                position: val.position,
                wage: newWage,
              }
            : val;
        })
      );
    });
  };

  const deleteEmployee = (id) => {
    console.log("Delete:", id);
    
    Axios.delete(`http://localhost:3001/delete/${id}`)
      .then((response) => {
        setEmployeeList(
          employeeList.filter((val) => {
            return val.id !== id;
          })
        );
      })
      .catch((error) => {
        console.error('An error occurred:', error.message);
        // Handle the error as needed
      });
  };

 
  const addEmployees = () => {
    Axios.post("http://localhost:3001/create", {
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage,
    }).then(() => {
      setEmployeeList([
        ...employeeList,
        {
          name: name,
          age: age,
          country: country,
          position: position,
          wage: wage,
        },
      ]);
    });
  };

  return (
    <div className="App container">
      <h1> Employee   Information</h1>
      <div className="information">
        <form action="">
          <div className="mb-3">
            <label htmlFor="name" className="form-lable">
              Name:
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              onChange={(event) => {
                SetName(event.target.value);
              }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="age" className="form-lable">
              Age:
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter age"
              onChange={(event) => {
                SetAge(event.target.value);
              }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="country" className="form-lable">
              Country :
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter country"
              onChange={(event) => {
                SetCountry(event.target.value);
              }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="position" className="form-lable">
              Position :
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Position"
              onChange={(event) => {
                SetPosition(event.target.value);
              }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="Wage" className="form-lable">
              Wage :
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Wage"
              onChange={(event) => {
                SetWage(event.target.value);
              }}
            />
          </div>

          <button className="btn btn-success" onClick={addEmployees}>
            {" "}
            Add Employee
          </button>
        </form>
      </div>
      <hr />
      <div className="employees">
        <button className="bth btn-primary" onClick={getEmployees}>
          {" "}
          Show Emplpyees
        </button>
        {employeeList.map((val) => {
          return (
            <>
              <div className="employee card">
                <div className="card-body text-left">
                  <p className="card-text">Name: {val.name} </p>
                  <p className="card-text">Age: {val.age} </p>
                  <p className="card-text">Country: {val.country} </p>
                  <p className="card-text">position: {val.position} </p>
                  <p className="card-text">Wage: {val.wage} </p>
                  <div className="d-flex">
                    <input
                      type="number"
                      style={{ width: "300px" }}
                      placeholder="15000..."
                      className="form-control"
                      onChange={(event) => {
                        SetNewWage(event.target.value);
                      }}
                    />
                    <button
                      className="btn btn-warning"
                      onClick={() => {
                        updateEmployeeWage(val.id);
                      }}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        deleteEmployee(val.id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>


      <button className="bth btn-primary" onClick={getUserAll}>
          {" "}
          Show UserList
        </button>
    </div>
  );
}

export default App;
