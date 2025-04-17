import './mainpage.css';
import DetailsComponent from './detailsComponent/detailscomponent';
import { useState, useEffect } from 'react';

const MainPage = ({ loginStat }) => {
  const [empDetails, setEmpDetails] = useState(
    JSON.parse(localStorage.getItem('details')) || [],
  );
  let empId = localStorage.getItem('empId');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2; // Display 2 employees per page
  const totalPages = Math.ceil(empDetails.length / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const [empIdState, setEmpId] = useState(empId);
  const [empName, setEmpName] = useState('');
  const [empDes, setEmpDes] = useState('');
  const [empDep, setEmpDep] = useState('');
  const [empSal, setEmpSal] = useState('');

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEmployees = empDetails.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    localStorage.setItem('details', JSON.stringify(empDetails));
  }, [empDetails]);

  function deleteEmployee(id) {
    const updated = empDetails.filter((emp) => emp.empId !== id);
    setEmpDetails(updated);
  }
  function updateEmployee(id) {
    document.getElementById('updateTask').classList.toggle('hidden');
    const tempObj = empDetails.find((emp) => emp.empId == id);
    setEmpId(id);
    setEmpName(tempObj.empName);
    setEmpDep(tempObj.empDep);
    setEmpDes(tempObj.empDes);
    setEmpSal(tempObj.empSal);
  }
  function updateEmployeeInList(id, updatedData) {
    setEmpDetails((prev) =>
      prev.map((emp) => (emp.empId === id ? { ...emp, ...updatedData } : emp)),
    );
  }
  function addEmployee(name, des, dep, sal) {
    const empObj = {
      empId: empId++,
      empName: name,
      empDes: des,
      empDep: dep,
      empSal: sal,
    };

    localStorage.setItem('empId', empId);
    setEmpDetails((prev) => [...prev, empObj]);
  }

  const userName = localStorage.getItem('userName');
  return (
    <div className="main-container">
      <div className="main-header">
        <h2>{`Hello ${userName}`}</h2>
        <button
          onClick={() => {
            localStorage.setItem('loginStatus', false);
            loginStat(false);
          }}
        >
          Logout
        </button>
      </div>

      <button
        onClick={() =>
          document.getElementById('addTask').classList.toggle('hidden')
        }
      >
        Add Employee
      </button>
      <div id="addTask" className="modal-overlay form-section hidden">
        <div className="modal-content">
          <input
            placeholder="Emp Name"
            value={empName}
            onChange={(e) => setEmpName(e.target.value)}
          />
          <input
            placeholder="Emp Designation"
            value={empDes}
            onChange={(e) => setEmpDes(e.target.value)}
          />
          <input
            placeholder="Emp Department"
            value={empDep}
            onChange={(e) => setEmpDep(e.target.value)}
          />
          <input
            placeholder="Emp Salary"
            type="number"
            value={empSal}
            onChange={(e) => setEmpSal(e.target.value)}
          />
          <div>
            <button
              onClick={() => {
                if (empName == '' || empSal == '') {
                  alert('Employee Name or Salary is missing. Pls fill them.');
                } else {
                  addEmployee(empName, empDes, empDep, empSal);

                  setEmpName('');
                  setEmpDep('');
                  setEmpDes('');
                  setEmpSal('');
                  document.getElementById('addTask').classList.toggle('hidden');
                }
              }}
            >
              Submit Employee
            </button>
            <button
              onClick={() =>
                document.getElementById('addTask').classList.add('hidden')
              }
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      <div id="updateTask" className="modal-overlay form-section hidden">
        <div className="modal-content">
          <input
            placeholder="Emp Name"
            value={empName}
            onChange={(e) => setEmpName(e.target.value)}
          />
          <input
            placeholder="Emp Designation"
            value={empDes}
            onChange={(e) => setEmpDes(e.target.value)}
          />
          <input
            placeholder="Emp Department"
            value={empDep}
            onChange={(e) => setEmpDep(e.target.value)}
          />
          <input
            placeholder="Emp Salary"
            type="number"
            value={empSal}
            onChange={(e) => setEmpSal(e.target.value)}
          />
          <div>
            <button
              onClick={() => {
                if (empName == '' || empSal == '') {
                  alert('Employee Name or Salary is missing. Pls fill them.');
                } else {
                  document
                    .getElementById('updateTask')
                    .classList.toggle('hidden');
                  updateEmployeeInList(empIdState, {
                    empName,
                    empDes,
                    empDep,
                    empSal,
                  });
                  setEmpName('');
                  setEmpDep('');
                  setEmpDes('');
                  setEmpSal('');
                }
              }}
            >
              Update Employee
            </button>
            <button
              onClick={() => {
                document.getElementById('updateTask').classList.add('hidden');
                setEmpName('');
                setEmpDep('');
                setEmpDes('');
                setEmpSal('');
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      {currentEmployees.map((element) => (
        <DetailsComponent
          key={element.empId}
          details={element}
          functions={{ deleteEmployee, updateEmployee }}
        />
      ))}
      <div
        className="pagination-buttons"
        style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          marginTop: '2rem',
        }}
      >
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Prev
        </button>
        <div
          className="pagination-numbers"
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.5rem',
            // marginTop: '2rem',
          }}
        >
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => setCurrentPage(number)}
              className={`page-btn ${currentPage === number ? 'active' : ''}`}
            >
              {number}
            </button>
          ))}
        </div>

        <button
          disabled={indexOfLastItem >= empDetails.length}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MainPage;
