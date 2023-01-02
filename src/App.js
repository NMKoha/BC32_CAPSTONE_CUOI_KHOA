import {RouterProvider} from 'react-router-dom'
import './App.css';
import router from './Routes/router';
import { Suspense } from 'react';
import Loading from './components/Loading/Loading';


function App() {
  return (
    <Suspense fallback={<Loading/>}>
      <RouterProvider router={router}/>
    </Suspense>
   
  );
}

export default App;
