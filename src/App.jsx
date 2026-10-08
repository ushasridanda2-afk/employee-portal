import { useEffect, useState } from "react";
import "./App.css";

function App() {

  const [employees, setEmployees] = useState([]);

  // Get Employee By ID
  const [eid, setEid] = useState("");
  const [employee, setEmployee] = useState(null);

  // Create Employee
  const [ename, setEname] = useState("");
  const [salary, setSalary] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  // Update Employee
  const [updateId, setUpdateId] = useState("");
  const [updateName, setUpdateName] = useState("");
  const [updateSalary, setUpdateSalary] = useState("");
  const [updateAge, setUpdateAge] = useState("");
  const [updateCity, setUpdateCity] = useState("");
  const [updateState, setUpdateState] = useState("");


  // ================= GET ALL EMPLOYEES =================

  const getAllEmployees = () => {

    fetch("http://localhost:8080/getEmpList")
      .then(response => response.json())
      .then(data => {
        setEmployees(data);
      })
      .catch(error => {
        console.log("Error:", error);
      });

  };


  // Page open ayyinappudu employees load avvali
  useEffect(() => {
    getAllEmployees();
  }, []);


  // ================= GET EMPLOYEE BY ID =================

  const getEmployeeById = () => {

    if (eid === "") {
      alert("Please enter Employee ID");
      return;
    }

    fetch(`http://localhost:8080/getEmp/${eid}`)
      .then(response => response.json())
      .then(data => {
        setEmployee(data);
      })
      .catch(error => {
        console.log("Error:", error);
        alert("Employee not found");
      });

  };


  // ================= CREATE EMPLOYEE =================

  const createEmployee = () => {

    const newEmployee = {

      ename: ename,
      salary: Number(salary),
      age: Number(age),
      city: city,
      state: state

    };

    fetch("http://localhost:8080/createEmp", {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(newEmployee)

    })

      .then(response => response.json())

      .then(data => {

        alert("Employee created successfully!");

        setEname("");
        setSalary("");
        setAge("");
        setCity("");
        setState("");

        getAllEmployees();

      })

      .catch(error => {

        console.log("Error:", error);
        alert("Employee creation failed");

      });

  };


  // ================= UPDATE EMPLOYEE =================

  const updateEmployee = () => {

    if (updateId === "") {

      alert("Please enter Employee ID");
      return;

    }

    const updatedEmployee = {

      ename: updateName,
      salary: Number(updateSalary),
      age: Number(updateAge),
      city: updateCity,
      state: updateState

    };

    fetch(`http://localhost:8080/updateEmp/${updateId}`, {

      method: "PUT",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(updatedEmployee)

    })

      .then(response => response.json())

      .then(data => {

        alert("Employee updated successfully!");

        setUpdateId("");
        setUpdateName("");
        setUpdateSalary("");
        setUpdateAge("");
        setUpdateCity("");
        setUpdateState("");

        getAllEmployees();

      })

      .catch(error => {

        console.log("Error:", error);
        alert("Employee update failed");

      });

  };


  // ================= DELETE EMPLOYEE =================

  const deleteEmployee = () => {

    if (eid === "") {

      alert("Please enter Employee ID");
      return;

    }

    fetch(`http://localhost:8080/delEmp/${eid}`, {

      method: "DELETE"

    })

      .then(response => response.text())

      .then(data => {

        alert(data);

        setEid("");
        setEmployee(null);

        getAllEmployees();

      })

      .catch(error => {

        console.log("Error:", error);
        alert("Employee deletion failed");

      });

  };


  // ================= HTML / UI =================

  return (

    <div className="container">

      <h1>Employee Portal</h1>


      {/* ================= GET EMPLOYEE ================= */}

      <div className="card">

        <h2>Get Employee By ID</h2>

        <input
          type="number"
          placeholder="Enter Employee ID"
          value={eid}
          onChange={(e) => setEid(e.target.value)}
        />

        <button onClick={getEmployeeById}>
          Get Employee
        </button>


        {employee && (

          <div className="employee">

            <h3>Employee Details</h3>

            <p>ID: {employee.eid}</p>
            <p>Name: {employee.ename}</p>
            <p>Salary: {employee.salary}</p>
            <p>Age: {employee.age}</p>
            <p>City: {employee.city}</p>
            <p>State: {employee.state}</p>

          </div>

        )}

      </div>


      {/* ================= CREATE EMPLOYEE ================= */}

      <div className="card">

        <h2>Create Employee</h2>

        <input
          type="text"
          placeholder="Enter Name"
          value={ename}
          onChange={(e) => setEname(e.target.value)}
        />

        <input
          type="number"
          placeholder="Enter Salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />

        <input
          type="number"
          placeholder="Enter Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter State"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />

        <br />

        <button onClick={createEmployee}>
          Create Employee
        </button>

      </div>


      {/* ================= UPDATE EMPLOYEE ================= */}

      <div className="card">

        <h2>Update Employee</h2>

        <input
          type="number"
          placeholder="Employee ID"
          value={updateId}
          onChange={(e) => setUpdateId(e.target.value)}
        />

        <input
          type="text"
          placeholder="New Name"
          value={updateName}
          onChange={(e) => setUpdateName(e.target.value)}
        />

        <input
          type="number"
          placeholder="New Salary"
          value={updateSalary}
          onChange={(e) => setUpdateSalary(e.target.value)}
        />

        <input
          type="number"
          placeholder="New Age"
          value={updateAge}
          onChange={(e) => setUpdateAge(e.target.value)}
        />

        <input
          type="text"
          placeholder="New City"
          value={updateCity}
          onChange={(e) => setUpdateCity(e.target.value)}
        />

        <input
          type="text"
          placeholder="New State"
          value={updateState}
          onChange={(e) => setUpdateState(e.target.value)}
        />

        <br />

        <button onClick={updateEmployee}>
          Update Employee
        </button>

      </div>


      {/* ================= DELETE EMPLOYEE ================= */}

      <div className="card">

        <h2>Delete Employee</h2>

        <input
          type="number"
          placeholder="Enter Employee ID"
          value={eid}
          onChange={(e) => setEid(e.target.value)}
        />

        <button onClick={deleteEmployee}>
          Delete Employee
        </button>

      </div>


      {/* ================= EMPLOYEE LIST ================= */}

      <div className="card">

        <h2>Employee List</h2>

        <table className="employee-table">

          <thead>

            <tr>

              <th>ID</th>
              <th>Name</th>
              <th>Salary</th>
              <th>Age</th>
              <th>City</th>
              <th>State</th>

            </tr>

          </thead>


          <tbody>

            {employees.map((employee) => (

              <tr key={employee.eid}>

                <td>{employee.eid}</td>
                <td>{employee.ename}</td>
                <td>{employee.salary}</td>
                <td>{employee.age}</td>
                <td>{employee.city}</td>
                <td>{employee.state}</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default App;