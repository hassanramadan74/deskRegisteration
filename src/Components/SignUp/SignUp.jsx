import React, { useContext, useState } from 'react';
import Style from './SignUp.module.css';
import pic from '../SignUp/smiling-students-with-backpacks.jpg';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { UserContext } from '../../Context/userContext.js';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  let {setStudentToken}= useContext(UserContext);
  let navigate = useNavigate();
  const handleLogin = async () => {
    const payload = {
      phoneNumber: username,
      guardianPhoneNumber: password,
    };

    try {
      const response = await axios.post('https://registration-production-c3f5.up.railway.app/api/v2/auth/signup', payload);
      console.log(payload);
      console.log(response);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className={`${Style.parent} vh-100`}>
      <div className="row">
        <div className="col-md-8">
          <div className="d-flex justify-content-center align-items-center">
            <img src={pic} alt="students" width="70%" className="rounded-1" />
          </div>
        </div>
        <div className="col-md-4">
          <div className="py-5">
            <h1 className="text-center">Sign up</h1>
            <div className={`${Style.memo} d-flex justify-content-center align-items-center`}>
              <i className="fa-solid fa-circle-user fs-2 mx-3"></i>
              <input
                type="text"
                className={`${Style.meme} w-100`}
                placeholder="User"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className={`${Style.memo} d-flex justify-content-center align-items-center`}>
              <i className="fa-solid fa-lock fs-2 mx-3"></i>
              <input
                type="password"
                className={`${Style.meme} w-100`}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className={`${Style.memo} d-flex justify-content-center align-items-center`}>
              <button className={`${Style.btnOutlineInfo}  py-2 rounded-pill px-5 fw-bolder`}  onClick={handleLogin}>
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
