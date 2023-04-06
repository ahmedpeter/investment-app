import './App.css';
import AuthProvider from './Util/AuthContext'
import Application from './Components';
import axios from 'axios';
import "react-toastify/dist/ReactToastify.css"
// import { AppContext } from '../src/Util/AppContext';
// import refreshApi from "./Util/refreshApi";


function App() {


  const accessToken = localStorage.getItem('accessToken');
  axios.defaults.headers.common.Authorization = `Bearer ${accessToken || ''}`;



  return (
    // <AuthProvider>
      <Application />
  // </AuthProvider>
  );
}

export default App;
