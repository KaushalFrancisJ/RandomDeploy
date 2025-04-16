import { useState } from 'react';
import './App.css';
import LoginPage from './components/loginpage/loginpage.jsx';
import MainPage from './components/mainpage/mainpage.jsx';

function App() {
  const [loginStatus, setLogin] = useState(
    localStorage.getItem('loginStatus') === 'true',
  );
  // console.log(loginStatus);

  return (
    <>
      {loginStatus ? (
        <MainPage loginStat={setLogin} />
      ) : (
        <LoginPage loginStat={setLogin} />
      )}
    </>
  );
}
export default App;

