import LogoutIcon from '@mui/icons-material/Logout';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';

export function LogOutSign(){

    const history = useHistory();
    const logout = () => {
        sessionStorage.removeItem("currentUser");
        sessionStorage.removeItem("token");
        history.replace('/users/login')     // preventing routing to anypage using back button after logout
        
      };
    return(
        <div className='logOutDiv'>
            <Button 
                variant="contained" 
                type="button"  
                className="logoutButton" 
                style={{ textTransform : 'none'}} 
                onClick={logout}
            >

                <LogoutIcon />
                Log Out
            </Button>
        </div>
    )
}