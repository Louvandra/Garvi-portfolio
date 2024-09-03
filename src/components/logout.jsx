import React, {useContext} from 'react';
import { AuthContext } from './AuthProvider';
import {auth} from '../firebase';
import { useNavigate } from 'react-router-dom';


const Admin = () => {
    const {user} = useContext(AuthContext);
    const Navigate = useNavigate()

    const handleLogout = () => {
        auth.signOut();
        Navigate('/');
    }
 if (user == null) {
  return <Navigate to="/"/>
 }
  return (
    
       
       
<button onClick={handleLogout } className='bg-sky-500 text-white py-2 px-4 rounded'>
    LogOut

</button>
        
  )
}

export default Admin