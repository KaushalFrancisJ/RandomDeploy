import { useState, useRef } from 'react';
import './loginpage.css';
const LoginPage = ({ loginStat }) => {
  const passwdField = useRef();
  const [userName, setUser] = useState('');
  const [passwd, setPasswd] = useState('');

  function handleEnterUsername(e) {
    if (e.key == 'Enter') {
      passwdField.current.focus();
    }
  }

  function changeLogin() {
    if (userName.length < 6) {
      alert('Username at least 6 letters pls');
    } else if (passwd.length < 6) {
      alert('Password at least 6 letters pls.');
    } else {
      localStorage.setItem('loginStatus', true);
      loginStat(true);
    }
  }
  function handleEnterSubmit(e) {
    if (e.key == 'Enter') {
      changeLogin();
    }
  }
  localStorage.setItem('userName', userName);

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <input
        type="text"
        value={userName}
        onChange={(e) => setUser(e.target.value)}
        onKeyDown={handleEnterUsername}
        placeholder="Enter Username"
        className="login-input"
      />
      <input
        type="password"
        ref={passwdField}
        value={passwd}
        onChange={(e) => setPasswd(e.target.value)}
        onKeyDown={handleEnterSubmit}
        placeholder="Enter Password"
        className="login-input"
      />
      <button onClick={changeLogin} className="login-button">
        Login
      </button>
    </div>
  );
};

export default LoginPage;
