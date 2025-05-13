import React, { useEffect } from 'react';
import { useAuth } from '../auth-context';
import { useNavigate } from 'react-router-dom';


function Logout(){
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(()=>{
    signout();
  }, []);
  const signout = () => {
    logout();
    navigate('/login');
  }

  return(
    <div>
        <h2>Logout</h2>
    </div>
  );

}

export default Logout;