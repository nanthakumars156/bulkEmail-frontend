import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';
import emailImage from '../img/bulkEmail.jpg'

export function Homepage(){
    const history = useHistory();
    const signUpURL= ()=>{history.push('/users/signup')};
    const loginURL= ()=>{history.push('/users/login')};
    return(
        <div>
            <div className='logBtns'>
                <Button color='secondary' variant='contained' onClick={signUpURL}>Sign Up</Button>
                <Button color='secondary' variant='contained' onClick={loginURL}>LogIn</Button>
            </div>
            <div className="home-page-content">
                <h1><span className="font-link homepageHeader">Bulk Email </span></h1> 
                < img className={"homepageLogo"} alt={"Homepage Logo"} src={emailImage} />  
            </div>
        </div>
        
    )
}


