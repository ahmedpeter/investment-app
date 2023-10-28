import React from 'react';
import {useState} from "react";
import { Link, useHistory } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import MiniLoader from '../../Util/Loader';
import BASE_URL from '../../Util/API';
import logo from '../../Assets/imgs/Git-logo.png';
import axios from 'axios';
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Countries from "../../Util/Countries.json";
// import logo from '../../Assets/imgs/logo.svg';
import './auth.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {ErrorToaster} from '../../Util/Toaster'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};


function Register() {
    // const [state , dispatch] = useStateValue();
    const [first_name, setFirstName] = useState("");
    const [regSuccessReg, setSuccessReg] = useState(false);
    const [last_name, setLastName] = useState("");
    const [email, setUsername] = useState("");
    const [financial_professional, setFinancialProfessional] = useState(false);
    const [regSuccessfulModal, setRegSuccessfulModal] = useState(false);
    const [phone_1, setContact] = useState("");
    const [country, setCountry] = useState("United States");
    const [open, setOpen] = useState(true);
    const handleClose = () => setOpen(false);
    const [user, setUser] = useState({ });
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const [toaster, setToaster] = useState(false);
    const [msg, setMessage] = useState("");
    const br = "<br/>";

    

    const submitHandler = async (e) => {
        setLoading(true);
        e.preventDefault();
        if(!email || !first_name || !last_name || !phone_1 || !country){
            setMessage("All fields are required!");
            setLoading(false);
            return false
        }
          axios
      .post(`${BASE_URL}/user/create`, { email, first_name, last_name, phone_1, country })
      .then((response) => {
        // check if username or telephone number exist in the db to avoid duplicates
        setLoading(false);
        console.log(response);
        const { data: { accessToken },} = response;
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('userInfo', JSON.stringify(response));
        // history.push('/app/dashboard');
        setSuccessReg(true);
        setRegSuccessfulModal(true);
      })
      .catch((err) => {
          // console.log(err);
          setMessage(`Oops! Something isn't right. Double checkup all fields`)
        setLoading(false);
      });

    }

    function onEnter(e){
        e.stopPropagation();
        if (e.key === 'Enter') {
            submitHandler();
        }
      }

    return (

      <div className="login">
            <div className="login__badge">
            <div className="logo__section">
                   
               </div>
            </div>
            <div className="login__section">
                <div className="register__container">
               <img src={logo} className="logo" alt="Logo" /> <br/>
                    <span className="sub-title">Creating an Account is as easy as ABC</span>
                    <form className="login__form" onSubmit={submitHandler}>
               <div className="form mb-lg mtb-10">
                        <input type="text" className="page-form f-11" placeholder=" "
                        value={first_name}
                        autoComplete="off"
                        onChange={(e)=> setFirstName(e.target.value)} required/>
                        <label htmlFor="username" className="label-name floating__label"> 
                            <span className="content-name">First Name</span>
                        </label>
                    </div>
                    <div className="form mb-lg mtb-10">
                        <input type="text" className="page-form f-11" placeholder=" "
                        value={last_name}
                        autoComplete="off"
                        onChange={(e)=> setLastName(e.target.value)} required/>
                        <label htmlFor="Last Name" className="label-name floating__label"> 
                            <span className="content-name">Last Name</span>
                        </label>
                    </div>
                    <div className="form mb-lg mtb-10">
                        <input type="email" className="page-form f-11" placeholder=" "
                        value={email}
                        autoComplete="off"
                        onChange={(e)=> setUsername(e.target.value)} required/>
                        <label htmlFor="username" className="label-name floating__label"> 
                            <span className="content-name">Email</span>
                        </label>
                    </div>
                    <div className="form mb-lg mtb-10">
                        <input type="number" className="page-form f-11" placeholder=" "
                        value={phone_1}
                        autoComplete="off"
                        onChange={(e)=> setContact(e.target.value)} required/>
                        <label htmlFor="Contact" className="label-name floating__label"> 
                            <span className="content-name">Phone Number</span>
                        </label>
                    </div>
               
                    <div className="form">
                <FormControl variant="standard" style={{textAlign : 'left!important'}}>
                  <InputLabel id="" className="label-name-select">
                    Region
                  </InputLabel>
                  <Select
                    labelId=""
                    id=""
                    label="country"
                    name="country"
                    onChange={(e)=> setCountry(e.target.value)} 
                    value={country}
                    color="success"
                  >
                    <MenuItem value="">
                      <em>Select Region</em>
                    </MenuItem>
                    {Countries.map((country) => {
                      return (
                        <MenuItem key={country.code} value={country.name}>
                          {" "}
                          {country.name}{" "}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </div>
               {msg && <p className="typical-error"> {msg}</p>}
                    {success && <p className="typical-success">{msg}</p>}
                <button type="submit" className="login-btn btn-primary" disabled={loading}>
                    {/* { loading && <MiniLoader/> } */}
                     { !loading && <span>Create Account</span>}
                     { loading && <span> Submitting...</span>}
                     </button>
                     {/* <p className="label-name">Don't have an account yet?</p> */}
                     <Link to="/login">
                     <span className="sub-title">Back to Login</span>
                     </Link>
                </form>
               
           </div>
                </div>
                
           
           <span className="sub-title copyright">Global Investment Trade! &copy; {new Date().getFullYear()}. All rights reserved</span>
                { toaster && <ToastContainer/>}

{regSuccessReg &&
                <Modal
                  open={open}
                  // onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                  >
                  <Box sx={style}>
                    <p> Awesome! Registration was successful. <br/>An email has been sent to {email} containing your password. Return to <Link to="/login">Login</Link></p>
                  </Box>

                </Modal>
              }

        </div>


   


    )
}

export default Register

