import { useHistory } from 'react-router-dom';
import {LogOutSign} from '../logOutSign';
import Button from '@mui/material/Button';
import React from 'react';

function Listingpage() {
  const history = useHistory();

  const goToEmails = () => {
    history.push('/listing'); // Navigate to the listing page
  };

  return (
        <Button color='primary' variant='contained' onClick={goToEmails}>View Sent Emails / Listing page</Button>
  );
}




export function Broadcast(){
    const history = useHistory();
    const mailFormURL =()=>{history.push('/mailForm')}
    
    return(
        <div>
            <LogOutSign />
            <div className='broadcast'>
              <h1>Mail Sent Successfully</h1>
              
              <div>
                <Listingpage /> 
             </div><br/>

             <Button color='secondary' variant='contained' onClick={mailFormURL}>Send another Mail</Button>
            </div>
        </div>
    )
}