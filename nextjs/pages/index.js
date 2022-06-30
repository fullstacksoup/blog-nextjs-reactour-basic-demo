
import React from 'react';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import dynamic from 'next/dynamic';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import style from '../styles/tour.module.css'
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import BasicTable from '../components/BasicTable';
import Head from 'next/head';
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


  return (
    
    <div>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <title>Full Stack Soup - Reactour Demo</title>
      </Head>

      <Stack spacing={2} 
      mt={4}
      justifyContent="flex-start"
      alignItems="center">
      
      
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

      <Container maxWidth="lg">
        <Grid container spacing={4}>
            <Grid item xs={12} align="center">
              <Button variant="outlined" color="secondary" onClick={openTour}>
                Open Tour
              </Button>        
            </Grid>
            <Grid item xs={6}>
              <Button
                  data-tut="reactour__iso"
                  autoFocus
                  
                  color="primary"
                  variant="contained"
                >
                  Save changes
              </Button>
          
            </Grid>
            <Grid item xs={6}>
              <TextField id="outlined-basic" size="small" label="Outlined" variant="outlined" data-tut="reactour__finalbutton"/>
          
            </Grid>
            <Grid item xs={12}>
              <Box
              data-tut="reactour__box"
              sx={{
                  width: '100%',
                  height: 500,
              }}>
                <BasicTable/>
              </Box>
        
            </Grid>
        </Grid>
      </Container>
                                
      </Stack>      
    </div>
  );
}

