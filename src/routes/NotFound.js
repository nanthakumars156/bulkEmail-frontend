import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';

export function NotFound() {
  const history = useHistory();
    const goHome = () => {
        history.replace('/')     // preventing routing to anypage using back button after logout 
      };

    const goBack =()=>{
      history.goBack();     //Navigate the user to last url
    }
    
  const imgSrc = 'https://cdn.dribbble.com/users/605899/screenshots/4144886/media/47ae8417ee638d039a4b7300439ea061.gif'
  
  const bgStyle={ backgroundImage: `url(${imgSrc})` , 
                    backgroundPosition: 'center', 
                    backgroundRepeat:"no-repeat",
                    backgroundSize:"cover" ,
                    height:'100vh',
                  }
  return (
    <div style={bgStyle} className='notFound'>
      {/* Not found image added as background */}
      <Button 
                variant="contained" 
                type="button"  
                className="homeButton" 
                style={{marginRight: '2%',marginTop:'2%'}} 
                onClick={goHome}
                size='large'
                
            >
                
                <HomeIcon />
               
            </Button>
            <Button 
                variant="contained" 
                type="button"  
                className="backButton" 
                style={{marginRight: '2%',marginTop:'2%'}} 
                onClick={goBack}
                size='large'
                
            >
                <KeyboardBackspaceIcon />
                
               
            </Button>
    </div>
  );
}
