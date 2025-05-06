import { useHistory } from 'react-router-dom';
import {LogOutSign} from '../logOutSign';
import Button from '@mui/material/Button';
import SentEmailsTable from '../sentEmailsTabel';


export function Listing(){
    const history = useHistory();
    const mailFormURL =()=>{history.push('/mailForm')}
    
    return(
        <div>
            <LogOutSign />
            <div className='broadcast'>
              
              <Button color='secondary' variant='contained' onClick={mailFormURL}>Send another Mail</Button><br/>

              <SentEmailsTable/>
              
            </div>
        </div>
    )
}