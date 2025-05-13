import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginRequest } from '../services/api';
import { useSelector } from 'react-redux';
import { fetchToken } from '../store/authSlice';
import { useAuth } from '../auth-context'; // Import the useAuth hook

function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Use navigate to redirect
  const dispatch = useDispatch();



  const token = useSelector((state) => state.auth.token) || sessionStorage.getItem('authToken');
  const error = useSelector((state) => state.auth.error);
  
  useEffect(() => {

    document.title= "Login";
    dispatch(fetchToken());
      if (token) {
        
      } else if (error) {
        console.log('Error:', error);
      } else {
        console.log('Token tidak ditemukan');
      }

      
    }, [token, error]);

  const handleLogin = async () => {

    if (username==='' || password==='') {
      Swal.fire({
        title : "Error",
        text : "Username dan password tidak boleh kosong",
        icon : "error"
      });
      return
    }

    const hasil = await loginRequest(token, username, password);
    if (hasil.code===200){
      login();
      navigate('/dashboard');
    }else{
      Swal.fire({
        title : 'Error',
        text : hasil.msg,
        icon : 'error'
      });
    }
  };

  return (
    <div className="login-box">
      <div className="login-logo">
        <a href="#">Admin<b>LTE</b> Login</a>
      </div>

      <div className="card">
        <div className="card-body login-card-body">
          <p className="login-box-msg">Sign in to start your session</p>

          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <div className="input-group-append">
              <div className="input-group-text">
                <span className="fas fa-user"></span>
              </div>
            </div>
          </div>

          <div className="input-group mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="input-group-append">
              <div className="input-group-text">
                <span className="fas fa-lock"></span>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <button
                type="button"
                className="btn btn-primary btn-block"
                onClick={handleLogin}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
