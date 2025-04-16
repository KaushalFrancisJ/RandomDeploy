import './detailscomponent.css';
function DetailsComponent({ details, functions }) {
  return (
    <div className="emp-card">
      <div>{details.empId}</div>
      <div>{details.empName}</div>
      <div>{details.empDes}</div>
      <div>{details.empDep}</div>
      <div>{details.empSal}</div>
      <div>
        <button onClick={() => functions.deleteEmployee(details.empId)}>
          Delete
        </button>
        <button onClick={() => functions.updateEmployee(details.empId)}>
          Update
        </button>
      </div>
    </div>
  );
}

export default DetailsComponent;
