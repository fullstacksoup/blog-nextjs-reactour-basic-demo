
import React from 'react';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import dynamic from 'next/dynamic';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import style from '../../styles/tour.module.css'
import TextField from '@mui/material/TextField';
import BasicTable from "../../components/BasicTable";

const Tour = dynamic(
  () => import('reactour'),
  { ssr: false },
);

  
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const tourConfig = [
  {    
    selector: '[data-tut="reactour__iso"]',
    content: `This is a button`,    
  },
  {    
    selector: '[data-tut="reactour__finalbutton"]',
    content: `This is a text field...`,    
  },
  {
    selector: '[data-tut="reactour__box"]',
    content: ({ goTo }) => (
      <div>
        Table description
        <br /> 
        You can go back to the 1st step
        <br /> 
        <br /> 
        <Button color="primary" variant="outlined"
          onClick={() => goTo(0)}
          style={{
            display: "block",
            margin: "1em auto"
          }}
        >
          Go back to step 1
        </Button>
      </div>
    )
  },
  
];
export default function Index() {
  const accentColor = "#5cb7b7";

  const [isTourOpen, setTourOpen] = React.useState(false);

  const closeTour = () => {
    setTourOpen(false);
  };

  const openTour = () => {
    
    setTourOpen(true);
  };

  React.useEffect(() => {
    if(!localStorage.getItem('somekey')) {
      localStorage.setItem('somekey', 'true')
      setTourOpen(true)
    }
  }, [])
  

  return (
    <div>

      <Stack spacing={2} 
      mt={4}
      justifyContent="flex-start"
      alignItems="center">
      
      <Button variant="outlined" color="secondary" onClick={openTour}>
        Open Tour
      </Button>
      
      <Tour
        onRequestClose={closeTour}
        disableInteraction={false}
        steps={tourConfig}
        isOpen={isTourOpen}
        maskClassName={style.mask}
        className={style.helper}
        rounded={5}
        accentColor={accentColor}
        disableInteraction={true}
        
      />
        <Button
              data-tut="reactour__iso"
              autoFocus
              
              color="primary"
              variant="contained"
            >
              Save changes
          </Button>

          <TextField id="outlined-basic" label="Outlined" variant="outlined" data-tut="reactour__finalbutton"/>
          
          <Box
          data-tut="reactour__box"
          sx={{
              width: '50%',
              height: 500,
          }}>
            <BasicTable/>
          </Box>
                    
      </Stack>      
    </div>
  );
}
