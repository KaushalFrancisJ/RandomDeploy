import React, { createContext, useContext, useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
// import './component/popup.css';
import Popup1 from './component/popup.jsx';
import './App.css';

const LocalArray = createContext(null);

const CloseCall = createContext(null);
// arr.forEach((task) => addTaskDom(task));
let taskId = localStorage.getItem('taskId');

const AddContent = () => <div className="content">Hello</div>;
const AddActions = () => {
  const { close, action } = useContext(CloseCall);
  return (
    <div className="actions">
      <button
        className="button cancelButton"
        onClick={() => {
          console.log('modal closed ');
          close();
        }}
      >
        Cancel
      </button>
      <Popup
        trigger={<button className="button addButton"> {action} </button>}
        position="top center"
        nested
      >
        <span>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae magni
          omnis delectus nemo, maxime molestiae dolorem numquam mollitia,
          voluptate ea, accusamus excepturi deleniti ratione sapiente!
          Laudantium, aperiam doloribus. Odit, aut.
        </span>
      </Popup>
    </div>
  );
};
const RemoveContent = () => <div className="content">hello</div>;
const RemoveActions = () => <div className="content">hello</div>;

const ModalContent = () => {
  const { close, action } = useContext(CloseCall);
  if (action == 'Delete') {
    return (
      <>
        <RemoveContent />
        <RemoveActions />
      </>
    );
  } else {
    return (
      <>
        <AddContent />
        <AddActions />
      </>
    );
  }
};

const Modal = ({ action, btnClass }) => (
  <Popup
    trigger={
      <button className={`button ${btnClass}`}>
        {' '}
        {action == 'Submit'
          ? 'Add Task'
          : action == 'Update'
          ? 'Update'
          : action == 'Delete' && 'Delete'}{' '}
      </button>
    }
    modal
  >
    {(close) => (
      <CloseCall.Provider value={{ close, action }}>
        <div className="modal">
          <button className="close cancelButton" onClick={close}>
            &times;
          </button>
          <h1 className="header">
            {action == 'Submit'
              ? 'Add Task'
              : action == 'Update'
              ? 'Update'
              : action == 'Delete' && 'Delete Task?'}
          </h1>
          <ModalContent />
        </div>
      </CloseCall.Provider>
    )}
  </Popup>
);

function App() {
  const [arr, updateArray] = useState(
    JSON.parse(localStorage.getItem('tasks')) || [],
  );

  const removeElement = () => {
    updateArray(arr.filter((item) => item.taskId !== taskObject.taskId));
    localStorage.setItem('tasks', JSON.stringify(arr));
  };

  const addElement = () => {
    let taskObject = {
      taskId: taskId++,
      taskName,
      taskDesc,
    };
    localStorage.setItem('taskId', taskId);
    taskObject.taskName = taskName;
    taskObject.taskDesc = taskDesc;
    addTaskDom(taskObject);
    // console.log(taskObject);
    arr.push(taskObject);
    localStorage.setItem('tasks', JSON.stringify(arr));
  };

  return (
    <LocalArray.Provider value={arr}>
      <Modal action={'Submit'} btnClass={'addButton'} />
      <Modal action={'Update'} btnClass={'addButton'} />
      <Modal action={'Delete'} btnClass={'cancelButton'} />

      <Popup1 action={'Update'} bgColor={'green'} textColor={'white'} />
      <Popup1 action={'Submit'} bgColor={'green'} textColor={'white'} />
    </LocalArray.Provider>
  );
}

export default App;
