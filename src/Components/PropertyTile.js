import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import KingBedIcon from '@mui/icons-material/KingBed';
import BathtubIcon from '@mui/icons-material/Bathtub';
import { Divider } from '@mui/material';
import Moment from 'react-moment';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IconButton } from '@mui/material';
import HouseDefault from './houseDefault.png'


// const Img = styled('img')({
//     margin: 'auto',
//     display: 'block',
//     maxWidth: '100%',
//     maxHeight: '100%',
// });

export default function PropertyTile(props) {
    let address = `${props.property.property_number} ${props.property.displayable_address}`
    let publishedDate = props.property.listing_date.split(" ")[0]
    let price = parseInt(props.property.price).toLocaleString()



    return (
        <Paper
            onMouseOver={props.onHover}
            onMouseOut={props.onUnHover}
            
            sx={{
                p: 2,
                margin: '5px',
                flexGrow: 1,
            }}
        >
            <Grid container spacing={2}
            onClick={props.onClick}
            >
                <Grid item>
                    <img 
                    alt='House'
                    src={props.property.images[0]['80x60'] ? props.property.images[0]['80x60'] : HouseDefault} />
                </Grid>
                <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                            <Typography gutterBottom variant="subtitle1" component="div">
                                {address}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                {props.property.title}
                            </Typography>
                        </Grid>
                        <Grid item container xs direction="row" spacing={2} >

                            <Grid item xs={4} container spacing={1} >
                                <Grid item >
                                    <KingBedIcon />
                                </Grid>
                                <Grid item >
                                    {props.property.num_bedrooms}
                                </Grid>
                            </Grid>
                            <Grid item xs={4} container spacing={1} >
                                <Grid item>
                                    <BathtubIcon />
                                </Grid>
                                <Grid item>
                                    {props.property.num_bathrooms}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container direction='column' spacing={5}>
                            <Grid item >
                                <Typography variant="subtitle1" component="div" color='primary'>
                                    £{price}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <img 
                                alt="Agent Logo"
                                src={props.property.agent_logo} width={'70px'} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Divider />
            <Grid container direction="row" paddingTop={1}>
                <Grid item xs={11}>
                    <Typography variant="subtitle2">
                        Listed: <Moment fromNow>{publishedDate}</Moment>
                    </Typography>
                </Grid>
                <Grid item xs={1}>
                    <IconButton aria-label="fingerprint" color="secondary" sx={{height:'20px'}} onClick={props.onLikeClick}>
                        {props.likedProperty.includes(props.property.listing_id) ? <FavoriteIcon /> :
                        <FavoriteBorderIcon /> }
                    </IconButton>
                </Grid>
            </Grid>
        </Paper>
    );
}