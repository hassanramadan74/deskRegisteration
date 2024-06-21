import React from 'react';
import Style from './LayoutStudent.module.css';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer'
import { Offline, Online } from "react-detect-offline";
export default function LayoutStudent() {

  
  return <>
    <div>
  <Outlet/>
  </div>
  <div>
    <Offline>
      <div className="network">
      Only shown offline (surprise!)
      </div>
      </Offline>

  <Footer/>
  </div>
  </>
}
