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
import LoginPage from './Components/Login/Login.jsx';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute.jsx';
import Attendence from './Components/Attendence/Attendence.jsx';




let routers = createHashRouter([
  { path:'/',element:<Layout/> , children:[
    {index:true,element:<ProtectedRoute><Home/></ProtectedRoute>},
    {path:'group',element:<ProtectedRoute><Group/></ProtectedRoute>},
    {path:'login',element:<LoginPage/>},
    {path:'group/:ID',element: <ProtectedRoute><Session/></ProtectedRoute>},
    {path:'group/:ID/:sessionID',element:<ProtectedRoute><AttendenceStudents/> </ProtectedRoute>},
    {path:'students' , element: <ProtectedRoute><Students/></ProtectedRoute>},
    {path:'attendence' , element: <ProtectedRoute><Attendence/></ProtectedRoute>},
    {path:'students/:studentID' , element:<ProtectedRoute><SpecificStudent/></ProtectedRoute>},
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
