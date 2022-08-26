import React, { useState } from 'react';
import HTMLReactParser from 'html-react-parser';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { Box, Divider, Chip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { Grid } from '@mui/material';
import KingBedIcon from '@mui/icons-material/KingBed';
import BathtubIcon from '@mui/icons-material/Bathtub';
import HouseSidingIcon from '@mui/icons-material/HouseSiding';

import PropertyTile from './PropertyTile';
import NoHouseDefault from '../../Assets/NoHouseDefault.png'

import './PropertyModal.css'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function PropertyModal(props) {
  const house = props.selectedProperty
  const similarHouses = props.similarHouses
  let address = house && `${house.property_number} ${house.displayable_address}`

  let images = []

  house && house.images.map((houseImage) => {
    return images.push({
      imgPath: houseImage['original']
    })
  })

  function SwipeableTextMobileStepper() {
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = images.length;

    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step) => {
      setActiveStep(step);
    };

    return (
      <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
        <Paper
          square
          elevation={0}
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: 50,
            pl: 2,
            bgcolor: 'background.default',
          }}
        >
        </Paper>
        <AutoPlaySwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {images.map((step, index) => (
            <div key={step.imgPath}>
              {Math.abs(activeStep - index) <= 2 ? (
                <Box
                  component="img"
                  sx={{
                    height: 255,
                    display: 'block',
                    maxWidth: 400,
                    overflow: 'hidden',
                    width: '100%',
                  }}
                  src={step.imgPath}
                />
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              Next
              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </Button>
          }
          backButton={
            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
              {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
              Back
            </Button>
          }
        />
      </Box>
    );
  }

  function ShowPropertyDetails() {
    return (
      props.selectedProperty &&
      <Grid container direction="column">
        <Grid container direction='row'>
          <Grid item xs={10}>
            <Typography>
              <h3>{address}</h3>
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography>
              <h3>£{parseInt(house.price).toLocaleString()}</h3>
            </Typography>
          </Grid>
        </Grid>
        <Grid item>
          <Typography>
            <h4 style={{ margin: '0px' }} >{house.title}</h4>
            <div style={{ height: '170px', contain: 'content', overflow: 'auto' }}>
              {HTMLReactParser(house.description)}
            </div>
          </Typography>

        </Grid>
        <Grid item xs>
          <Grid item container xs direction="row" spacing={2} marginTop='20px'>
            <Grid item xs={2} container spacing={1} >
              <Grid item >
                <KingBedIcon />
              </Grid>
              <Grid item >
                {house.num_bedrooms}
              </Grid>
            </Grid>
            <Grid item xs={2} container spacing={1} >
              <Grid item>
                <BathtubIcon />
              </Grid>
              <Grid item>
                {house.num_bathrooms}
              </Grid>
            </Grid>
            <Grid item xs={8} >
              {(house.floor_plan && house.floor_plan[0]) ? <Button sx={{ float: 'right' }} variant="outlined" startIcon={<HouseSidingIcon />} onClick={() => { window.open(house.floor_plan[0]) }}
              >
                Floorplan
              </Button> : null}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }

  function ShowSimilarHouses() {
    return (
      <Grid container direction='row' xs>
        {similarHouses && similarHouses.map((house) => {
          return (
            <Grid 
            key={house.listing_id}
            item xs>
              <PropertyTile
                property={house}
                onHover={null}
                onUnHover={null}
                onClick={() => props.setSelectedProperty(house)}
                onLikeClick={() => props.setLikedProperty(house.listing_id)}
                likedProperty={props.likedProperty}
              />
            </Grid>
          )
        })}
      </Grid>
    )
  }

  return (
    <div>
      <Dialog
        fullScreen
        hideBackdrop
        sx={{ marginTop: '50px' }}
        open={props.selectedProperty !== null}
        onClose={() => props.setSelectedProperty(null)}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative', backgroundColor: '#6A687A' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => props.setSelectedProperty(null)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Property Details
            </Typography>
          </Toolbar>
        </AppBar>
        <Box>
          <Grid container direction='column'>
            <Grid container direction="row">
              <Grid item xs={4} marginLeft={2}>
                {(house && house.images.length === 0) ? <img style={{width: '90%'}} src={NoHouseDefault} alt='No Images available'/> : <SwipeableTextMobileStepper />}
              </Grid>
              <Grid item xs={7.5}>
                <ShowPropertyDetails />
              </Grid>
            </Grid>
            {!similarHouses == null &&
              <Divider sx={{ marginBottom: '15px' }}>
                <Typography>
                  <Chip
                    color='secondary'
                    label="Similar properties"
                    size='big'
                  />
                </Typography>
              </Divider>
            }
            <Grid item>
            </Grid>
            <Grid item xs>
              <ShowSimilarHouses />
            </Grid>
          </Grid>
        </Box>
      </Dialog>
    </div>
  );
}
