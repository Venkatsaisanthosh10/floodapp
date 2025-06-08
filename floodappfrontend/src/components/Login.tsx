import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import { setRole } from '../store/userRoleSlice';
import { useDispatch } from 'react-redux';
import { setOfficialId } from '../store/UserOfficalID';
const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [officialIdInput, setOfficialIdInput] = useState('');
  const [isOfficial, setIsOfficial] = useState(false);
  const [errors, setErrors] = useState({
  username: '',
  password: '',
  officialId: ''
});

  const dispatch = useDispatch();

  const determineRole = (officialId: string) => {
    if (!officialId) return 'PUBLIC';
    
    const prefix = officialId.substring(0, 2).toUpperCase();
    switch (prefix) {
      case 'FP':
        return 'FIELD PERSONNEL';
      case 'CO':
        return 'COORDINATOR';
      case 'CC':
        return 'COMMAND CENTER';
      case 'SO':
        return 'SENIOR OFFICIAL';
      default:
        return 'PUBLIC';
    }
  };
  const navigate = useNavigate();
  
   const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = { username: '', password: '', officialId: '' };
    let hasError = false;

    if (!username) {
      newErrors.username = 'Username is required';
      hasError = true;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      hasError = true;
    }

    if (isOfficial && !officialIdInput) {
      newErrors.officialId = 'Official ID is required';
      hasError = true;
    }

    setErrors(newErrors);

    if (hasError) return;

    // Set the role based on Official ID
    const userRole = determineRole(officialIdInput);
    dispatch(setRole(userRole));
    
    dispatch(setOfficialId(officialIdInput));
    // Navigate on success
    navigate('/main');
  };
  return (
    <div className="login-container" data-official={isOfficial}>
      <div className="toggle-container">
        <button
          className={`toggle-button ${!isOfficial ? 'active' : ''}`}
          onClick={() => setIsOfficial(false)}
        >
          Public
        </button>
        <button
          className={`toggle-button ${isOfficial ? 'active' : ''}`}
          onClick={() => setIsOfficial(true)}
        >
          Officials
        </button>
      </div>

      <form className="login-form" onSubmit={handleSubmit}>
       {isOfficial && (
          <>
            <input
            type="text"
            placeholder="Enter Official ID"
            value={officialIdInput}
            onChange={e => setOfficialIdInput(e.target.value)}
          />
          {errors.officialId && <span className="error">{errors.officialId}</span>}
          </>
        )}
        <>
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        {errors.username && <span className="error">{errors.username}</span>}
        </>
        <>
         <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {errors.password && <span className="error">{errors.password}</span>}
        </>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;