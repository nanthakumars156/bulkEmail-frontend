import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {useFormik} from  "formik";
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';
import { API } from '../globalData';
import isEmail from 'validator/lib/isEmail'
import {LogOutSign} from '../logOutSign'


// This validation will split the string based on the comma and check whether it is valid email address
const email_array_validation =  yup.array()
                                    .transform(function(value, originalValue) {
                                        if (this.isType(value) && value !== null) {
                                            return value;
                                        }
                                        return originalValue ? originalValue.split(/[\s,]+/) : [];
                                        })
                                    .of(yup.string()
                                        // .email(({ value }) => `${value} --> not a valid email; `)    // Instead of this default email checker ,email validator package is used 
                                        .required("To enter multiple emails the format should be like this: xyz@gmail.com,abc@gmail.com")
                                        .test("is-valid", (message) => `${message.value} To enter multiple emails the format should be like this: xyz@gmail.com,abc@gmail.com  `, (value) => value ? isEmail(value) : new yup.ValidationError("Invalid value")),
                                    )
                                  
                                    
    // Email validation using regex
    // email: yup.string()
    //     .min(5,"Minimum length of email should be 5 chars")
    //     .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, "Invalid Email Address")
    //     .required("Mandatory field"),


// Yup Form validation
const formValidationSchema = yup.object({
    name: yup.string().required("Mandatory Field").min(4,'Min 4 Chars').max(15,'Max 15 Chars'),
    to:email_array_validation.required("To enter multiple emails the format should be like this: xyz@gmail.com,abc@gmail.com"),
    cc:email_array_validation,
    bcc:email_array_validation,
    subject:yup.string().required("Mandatory Field").min(5,"Please tell us more 📝"),
    message:yup.string().required("Mandatory Field").min(5,"Please tell us more 📝")     
  });

//function to split the string and remove the null and change it to Array
  function toArray(str){
    if(str){
         str = str.split(',').filter(x => x);       //filter(x => x) returns the not null value in array 
         return str;
        }
    else return null;
}
function MailForm(){
    const monthsName = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const{handleSubmit,values,handleBlur,handleChange,errors,touched,resetForm} = useFormik({
        initialValues :{name:'',to:'',cc:'',bcc:'',subject:'',message:'',date:new Date(),mailSendAt:''},
        validationSchema : formValidationSchema,
        onSubmit:(newValue)=>{
            // newValue.to = toArray(newValue.to);
            let d =  newValue.date ;
            let time= new Date().toLocaleTimeString();
            newValue.mailSendAt = `${d.getDate()}-${monthsName[d.getMonth()]}-${d.getFullYear()} ${time}`;
            newValue.cc = toArray(newValue.cc);
            newValue.bcc = toArray(newValue.bcc);
            newValue.message = newValue.message.replaceAll("\n", "<br />");     // to replace the new line tag with html br element
            console.log('New User',newValue)
            addData(newValue);
            resetForm();
        }

    });
    
    const history = useHistory();
      
    // function to add the Data object to array 
    const addData = (newValue) => {
     
        fetch(`${API}/mailForm`,{
        method : "POST",
        body : JSON.stringify([newValue]),
        headers :{
            'content-type':'application/json',
            "x-auth-token": sessionStorage.getItem("token")
        }

        })  //returns a promise object
        .then(()=>history.push("/broadcast"))
    };


    const new_style = { width: '25%' };
    return(
        <form onSubmit={handleSubmit}>
            <LogOutSign />
            <div className='mailForm'>
                <div className='mailHeader'>
                    <h1>Bulk Email </h1>
                </div>

                <TextField
                    id="name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    label="Enter your Name"
                    variant="outlined"
                    onBlur={handleBlur}
                    style={new_style} 
                    error={errors.name && touched.name}
                    helperText = {errors.name && touched.name ? errors.name : ""}/>
                
                <TextField
                        id="to"
                        name="to"
                        value={values.to}
                        onChange={handleChange}
                        label="To "
                        variant="outlined"
                        placeholder='Enter emails ie., xyz@gmail.com,abc@gmail.com'
                        onBlur={handleBlur}
                        style={new_style} 
                        error={errors.to && touched.to}
                        helperText = {errors.to && touched.to ? errors.to : ""}/>

                <div className='emailBox'>
                    <TextField
                        id="cc"
                        name="cc"
                        value={values.cc}
                        onChange={handleChange}
                        label="CC "
                        variant="outlined"
                        placeholder='Enter emails ie., xyz@gmail.com,abc@gmail.com'
                        onBlur={handleBlur}
                        style={{width: '35%'} } 
                        error={errors.cc && touched.cc}
                        helperText = {errors.cc && touched.cc ? errors.cc : ""}/>
                    
                    <TextField
                        id="bcc"
                        name="bcc"
                        value={values.bcc}
                        onChange={handleChange}
                        label="BCC"
                        variant="outlined"
                        placeholder='Enter emails ie., xyz@gmail.com,abc@gmail.com'
                        onBlur={handleBlur}
                        style={{width: '35%'} }
                        error={errors.bcc && touched.bcc}
                        helperText = {errors.bcc && touched.bcc ? errors.bcc : ""}/>
                </div>
                <TextField
                    id="subject"
                    name="subject"
                    value={values.subject}
                    onChange={handleChange}
                    label="Enter mail subject"
                    variant="outlined"
                    onBlur={handleBlur}
                    style={new_style} 
                    error={errors.subject && touched.subject}
                    helperText = {errors.subject && touched.subject ? errors.subject : ""}/>
                <TextField
                    id="message"
                    name="message"
                    multiline
                    rows={6}
                    value={values.message}
                    onChange={handleChange}
                    label="Enter  message"
                    variant="outlined"
                    onBlur={handleBlur}
                    style={new_style} 
                    error={errors.message && touched.message}
                    helperText = {errors.message && touched.message ? errors.message : ""}/>

                {/* Using button from Material  */}
                <Button variant="contained" type="submit" style={new_style} className="formButton">Send Bulk Email</Button>
            </div>
        </form>
    )
}

export {MailForm};