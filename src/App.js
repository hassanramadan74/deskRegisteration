import './App.css';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import  { Toaster } from 'react-hot-toast';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Notfound from './Components/Notfound/Notfound';
import Students from './Components/Students/Students';
import Group from './Components/Groups/Groups.jsx';
import Session from './Components/Session/Session.jsx';




let routers = createHashRouter([
  { path:'/',element:<Layout/> , children:[
    {index:true,element:<Home/>},
    {path:'group',element:<Group/>},
    {path:'group/:ID',element:<Session/>},
    {path:'students' , element:<Students/>},
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
