import './App.css';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import  { Toaster } from 'react-hot-toast';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Notfound from './Components/Notfound/Notfound';
import Students from './Components/Students/Students';
import Group from './Components/Groups/Groups.jsx';
import Session from './Components/Session/Session.jsx';
import AttendenceStudents from './Components/AttendenceStudents/AttendenceStudents.jsx';
import SpecificStudent from './Components/SpecificStudent/SpecificStudent.jsx';




let routers = createHashRouter([
  { path:'/',element:<Layout/> , children:[
    {index:true,element:<Home/>},
    {path:'group',element:<Group/>},
    {path:'group/:ID',element:<Session/>},
    {path:'group/:ID/:sessionID',element:<AttendenceStudents/>},
    {path:'students' , element:<Students/>},
    {path:'students/:studentID' , element:<SpecificStudent/>},
    {path:'*' , element:<Notfound/>}
  ]}
])



function App() {

return <>
  <RouterProvider router={routers}/>
  <Toaster></Toaster>
  </>
}

export default App;
