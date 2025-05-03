import {useFormik} from  "formik";
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormHelperText } from '@mui/material';
import Link from '@mui/material/Link';
import { API } from '../globalData';
import { useHistory } from "react-router-dom";
import signupIcon from '../img/signup Icon.jpg';


const PASSWORD_REGEX = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@!#%&]).{8,}$/g ; 

const formValidationSchema = yup.object({
    username: yup.string()
                .min(5,"Minimum length of username should be 5 chars")
                .max(20,"Max length of username should be 20 chars")
                .required("Mandatory field"),
    password : yup.string()
                    .min(8,"Minimum length of password should be 8 chars")
                    .max(12,"Max length of password should be 12 chars")
                    .matches(PASSWORD_REGEX,'Password must be at least 8 characters long and include: 1 uppercase, 1 lowercase, 1 special character')
                    .required("Mandatory field"),
    confirmPassword: yup.string()
                    .min(8,"Minimum length of password should be 8 chars")
                    .max(12,"Max length of password should be 12 chars")
                    .matches(PASSWORD_REGEX,'Password must be at least 8 characters long and include: 1 uppercase, 1 lowercase, 1 special character')
                    .required("Mandatory field")
                    .when("password",{
                        is:val => (val && val.length ? true : false),
                        then:yup.string().oneOf([yup.ref('password')], 'Password does not match')
                    })
                    

})


export function SignUp() {

    const monthsName = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const {handleSubmit,values,handleBlur,handleChange,errors,touched,resetForm} = useFormik({
        initialValues : {username: "",password:"",confirmPassword:'',date:new Date(),displayDate:''},
        validationSchema:formValidationSchema,
        onSubmit :(values) => {
            // change the date format
            let d =  values.date ;
            let time = d.toLocaleTimeString();
            values.displayDate = `${d.getDate()}-${monthsName[d.getMonth()]}-${d.getFullYear()} ${time}`;
            console.log("onSubmit", values);
            addUser(values);
            resetForm();
        },
    });

    const history = useHistory();

   

    const addUser =async(newUser)=>{
        const tempAddUser = await fetch(`${API}/users/signup`,{
                    method:"POST",
                    body:JSON.stringify(newUser),
                    headers :{'content-type':'application/json'}
            
                })
        const response = await tempAddUser.json();  // getting server response from POST method and changing to json string
        console.log(response);
        alert(response.message)
        response.status ? history.push('/users/login') : history.push('/users/signup')  //based on boolean response from server, navigating to another page
        
    }
    

    return(
        <form onSubmit ={handleSubmit}>
            <div className="signUpForm">
                <div className="login-headers">
                    < img className={"signup-logo"} alt={"SignUp Logo"} src={signupIcon} width={200} height={200}/>  
                    {/* <h3>Sign Up </h3> */}
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
                    error = {errors.username && touched.username}
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
                    error = {errors.password && touched.password }
                    helperText = {errors.password && touched.password ? errors.password : ""}
                />
                <TextField
                    id="confirmPassword"
                    label="Confirm Password"
                    autoComplete="true"
                    variant="outlined"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur = {handleBlur}
                    type="password"
                    placeholder="Please re-enter your password"
                    error ={errors.confirmPassword && touched.confirmPassword}
                    helperText = {errors.confirmPassword && touched.confirmPassword ? errors.confirmPassword : ""}
                 />
                
                <Button variant="contained" color="success" type="submit" style={{textTransform: 'none'}}>Sign Up</Button>
                <FormHelperText>Already have an account? <Link href="/users/login" style={{fontWeight: 'bold'}}>LogIn</Link> here</FormHelperText>
                
            </div>
            
        </form>
    )
}

