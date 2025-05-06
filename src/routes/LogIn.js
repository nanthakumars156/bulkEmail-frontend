import {useFormik} from  "formik";
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { API } from '../globalData';
import { useHistory } from "react-router-dom";
import loginIcon from  '../img/loginIcon.jpg'
import { FormHelperText } from '@mui/material';
import Link from '@mui/material/Link';

const formValidationSchema = yup.object({
    username: yup.string()
                .min(5,"Minimum length of username should be 5 chars")
                .max(12,"Max length of username should be 12 chars")
                .required("Mandatory field"),
    password : yup.string()
                    .min(8,"Minimum length of password should be 8 chars")
                    .max(12,"Max length of password should be 12 chars")
                    .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@!#%&]).{8,}$/g,'Password pattern did not match')
                    .required("Mandatory field"),
})



export function LogIn() {

    
    const history = useHistory();
    const {handleSubmit,values,handleBlur,handleChange,errors,touched,resetForm} = useFormik({
        initialValues : {username: "",password:""},
        validationSchema:formValidationSchema,
        onSubmit :(values) => {
            console.log("onSubmit", values);
            logInUser(values);
            resetForm();
            sessionStorage.setItem("currentUser",values.username);
            
        },
    });

    // const history = useHistory();
    
    const logInUser =async(newUser)=> {
        const tempLogIn = await fetch(`${API}/users/login`,{
            method:"POST",
            body:JSON.stringify(newUser),
            headers :{'content-type':'application/json'}
    
        })
        const result = await tempLogIn.json();
        console.log(result);
        alert(result.message);
        if(result.status==='success'){
            sessionStorage.setItem("token",result.token)
            console.log("token",result.token)
            history.push('/mailForm')
        }
        else if(result.status==='notUser'){
            history.push('/users/signup')
        }
        else {
            history.push('/users/login')
        }
        
    };

    return(
        <form onSubmit ={handleSubmit}>
            <div className="logInForm">
                <div className="login-headers">
                    < img className={"logIn-logo"} alt={"LogIn Logo"} src={loginIcon} width={200} height={200}/>  
                    <h3>Log In </h3>
                </div>

                <TextField
                    
                    id="username"
                    label="Username"
                    variant="outlined"
                    type='text'
                    value={values.username}
                    onChange={handleChange}
                    onBlur = {handleBlur}
                    placeholder="Please enter your username"
                    helperText = {errors.username && touched.username ? errors.username : ""}
                />
                
                <TextField
                    id="password"
                    label="Password"
                    autoComplete="true"
                    variant="outlined"
                    value={values.password}
                    onChange={handleChange}
                    onBlur = {handleBlur}
                    type="password"
                    placeholder="Please enter your password"
                    helperText = {errors.password && touched.password ? errors.password : ""}
                />
                
                <Button variant="contained" color="success" type="submit" style={{textTransform: 'none'}}>Log In</Button>
                <FormHelperText>Don't have an account? <Link href="/users/signup" style={{fontWeight: 'bold'}}>Sign Up</Link> here</FormHelperText>
            </div>
        </form>
    )
}

