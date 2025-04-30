import { useHistory } from 'react-router-dom';
import {LogOutSign} from '../logOutSign';
import Button from '@mui/material/Button';


export function Broadcast(){
    const history = useHistory();
    const mailFormURL =()=>{history.push('/mailForm')}
    
    return(
        <div>
            <LogOutSign />
            <div className='broadcast'>
              <h1>Mail Sent Successfully</h1>
              <Button color='secondary' variant='contained' onClick={mailFormURL}>Send another Mail</Button>
            </div>
        </div>
    )
}