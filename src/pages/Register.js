import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebaseConfig';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Register.css';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Store error messages here
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/login'); // Redirect to login page after successful registration
    } catch (error) {
      setErrorMessage('Registration failed: ' + error.message);
    }
  };

  return (
    <div className="register-container">
      <div className="card register-card">
        <div className="card-body">
          <h2 className="card-title text-center">Register</h2>
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control mb-3"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control mb-3"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Register</button>
          </form>
          {errorMessage && <p className="error-message text-danger mt-3 text-center">{errorMessage}</p>} {/* Enhanced error message */}
          <p className="text-center mt-3">
            Already registered? <Link to="/login" className="text-primary">Login here</Link> {/* Link styled */}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
