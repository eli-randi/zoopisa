import { AppBar } from './Components/AppBar';
import { ZooplaSalesList } from './util/ZooplaAPI';
import React, { useState, useContext } from 'react';
import PropertyMap from './util/PropertyMap';
import { SearchBox } from './Components/SearchBox';
import { LandingPage } from './Components/LandingPage';
import { PropertyList } from './Components/PropertiesList';
import PropertyModal from './Components/PropertyModal';
import { Grid } from '@mui/material';
import './App.css'
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import Fab from '@mui/material/Fab';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useLocalStorage } from './util/LocalStorage';
import ErrorModal, { ErrorContext, ErrorProvider } from './util/Error';
import { LoadingCircle } from './util/Loading';
// import { DummySalesData } from './util/DummyData';

const theme = createTheme({
  typography: {
    fontFamily: 'Karla',
    subtitle1: {
      fontWeight: '500'
    }
  },
  palette: {
    primary: {
      light: '#DADAE0',
      main: '#6A687A'
    },
    secondary: {
      light: '#F6B57A',
      main: '#D77926',
      dark: '#B25C0E'
    }

  }
});


function Main() {
  const [selectedArea, setSelectedArea] = useState(null);
  const [minBeds, setMinBeds] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000000);
  const [hasSearched, setHasSearched] = useState(false)
  const [propertyResults, setPropertyResults] = useState(null)
  const [mapCenter, setMapCenter] = useState(null)
  const [propertyHovered, setPropertyHovered] = useState(null)
  const [selectedProperty, setSelectedProperty] = useState(null)
  const [likedProperty, setLikedProperty] = useLocalStorage('favHouses', [])
  const [openFavorites, setOpenFavorites] = useState(false)
  const [isLoading, setIsLoading] = useState(false);

  const errorContext = useContext(ErrorContext)

  // if(errorContext.useDummyData) {
  //   setPropertyResults(DummySalesData);

  // }

  const handleLikedProperty = (property) => {
    if (!likedProperty.includes(property)) {
      setLikedProperty([...likedProperty, property]);
    } else {
      let copyLiked = [...likedProperty];
      let index = copyLiked.indexOf(property);
      if (index !== -1) {
        copyLiked.splice(index, 1);
        setLikedProperty(copyLiked);
      }
      if (copyLiked.length === 0) {
        setOpenFavorites(false)
      }
    }
  }

  let propertiesToRender = propertyResults && propertyResults.listing.filter((property) => {
    return property.num_bedrooms >= minBeds && parseInt(property.price) <= maxPrice
  })

  if (openFavorites && !likedProperty == []) {
    propertiesToRender = propertiesToRender.filter(
      (property) => {
        return likedProperty.includes(property.listing_id)
      }
    )
  }

  const handleSelectArea = (e, autocompleteResult) => {
    setIsLoading(true);
    setSelectedArea(autocompleteResult)
    setHasSearched(true);
    ZooplaSalesList(autocompleteResult, errorContext).then((properties) => {
      setIsLoading(false);
      setPropertyResults(properties || [])
      setMapCenter(
        {
          lat: properties.latitude,
          lng: properties.longitude
        }
      );
      
    })
  }

  let similarHouses = selectedProperty && propertiesToRender.filter((property) => {
    property.distanceToSelected = Math.pow(property.latitude - selectedProperty.latitude, 2) + Math.pow(property.longitude - selectedProperty.longitude, 2);
    return (property.num_bedrooms === selectedProperty.num_bedrooms && parseInt(property.price) <= parseInt(selectedProperty.price) + 50000
      && parseInt(property.price) >= parseInt(selectedProperty.price) - 50000 && property.listing_id !== selectedProperty.listing_id
    )
  }
  ).sort((a, b) => (a.distanceToSelected > b.distanceToSelected) ? 1 : ((b.distanceToSelected > a.distanceToSelected) ? -1 : 0)).slice(0, 3)

  function handleFavoriteButton() {
    setOpenFavorites(!openFavorites)
  }


  function ShowFavouriteHouses() {
    if (likedProperty.length === 0) {
      return (
        null
      )
    }
    return (
      <Fab variant="extended" color='secondary' sx={{ position: 'absolute', bottom: 32, right: 32 }} onClick={() => {
        handleFavoriteButton()
      }}>
        <FavoriteIcon
        />
        {openFavorites ? 'Hide' : 'Show'} favourites
      </Fab>
    );
  }


  return (
    <Grid container direction='column' spacing={1}>
      <Grid xs={3} item>
        <SearchBox
          locationValue={selectedArea}
          handleSelectArea={handleSelectArea}
          setMaxPrice={setMaxPrice}
          setMinBeds={setMinBeds}
          minBeds={minBeds}
          maxPrice={maxPrice}
        />
      </Grid>
      <Grid item xs={6}>
        {hasSearched ?
          <>
            <div className='TopDivider'>
            </div>
            <Grid container direction='row' minHeight={'100%'}>
              <Grid item xs={6}>
                {isLoading ? <LoadingCircle /> :
                  <PropertyMap
                    listings={propertiesToRender}
                    center={mapCenter}
                    propertyHovered={propertyHovered}
                    setPropertyHovered={setPropertyHovered}
                    setSelectedProperty={setSelectedProperty}
                  />
                }

              </Grid>
              <Grid item xs={6} >
                {isLoading ? <LoadingCircle /> : 
                <>
                <PropertyList
                  key={propertiesToRender && propertiesToRender.listing_id}
                  propertiesToList={propertiesToRender}
                  setPropertyHovered={setPropertyHovered}
                  setSelectedProperty={setSelectedProperty}
                  setLikedProperty={handleLikedProperty}
                  likedProperty={likedProperty}
                  openFavorites={openFavorites}
                />
                <ShowFavouriteHouses />
                </>
                }

              </Grid>
            </Grid>
            <PropertyModal
              selectedProperty={selectedProperty}
              setSelectedProperty={setSelectedProperty}
              similarHouses={similarHouses}
              setLikedProperty={handleLikedProperty}
              likedProperty={likedProperty}
            />
          </>
          :
          <LandingPage />}
      </Grid>
    </Grid>

  );
}


function App() {
  return (
    <div style={{ height: '100vh' }}>
      <ErrorProvider>
        <AppBar
        />
        <ThemeProvider theme={theme}>
          <Main />
        </ThemeProvider>
        <div className='BottomDivider'>
        </div>
        <ErrorModal />
      </ErrorProvider>
    </div>

  );
}

export default App;

