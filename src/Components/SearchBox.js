import { ZooplaAutocomplete } from '../util/ZooplaAPI';
import React, { useEffect, useState, useContext } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import './SearchBox.css'
import MenuItem from '@mui/material/MenuItem';
import { ErrorContext } from '../util/Error';


export function SearchBox(props) {
    const errorContext = useContext(ErrorContext)
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState([])
    const [open, setOpen] = useState(false);
    const loading = open && options.length === 0;

    useEffect(() => {

        const delayDebounceFn = setTimeout(
            () => {
                if (inputValue !== '') {
                    ZooplaAutocomplete(inputValue, errorContext).then(
                        (data) => {
                            setOptions(data && data.suggestions || [])
                            console.log('making request')
                        }
                    )
                }
            }, 
            300
        )
      
        return () => clearTimeout(delayDebounceFn)

    }, [inputValue, errorContext])

    let bedOptions = [
        {
            value: 0,
            label: 'No minimum',
        },
        {
            value: 1,
            label: '1 Bedroom',
        },

    ];
    for (let i = 2; i < 10; i++) {
        bedOptions.push({
            value: i,
            label: `${i} Bedrooms`
        })
    }
    let priceOptions = [];

    for (let j = 50000; j < 1000000; j += 50000) {
        priceOptions.push({
            value: j,
            label: `£${j.toLocaleString()}`
        })
    }

    priceOptions.push(
        {
            value: 1000000,
            label: '1 million',
        }
    )

    const handleBedsChange = (event) => {
        props.setMinBeds(event.target.value);
    };

    const handlePriceChange = (event) => {
        props.setMaxPrice(event.target.value);
    };

    return (

        <div className='SearchBoxOutline'>
            <div className='SearchBoxMain'>
                <Autocomplete
                    open={open}
                    loading={loading}
                    onOpen={() => {
                        setOpen(true);
                    }}
                    onClose={() => {
                        setOpen(false);
                    }}
                    disablePortal
                    id="search-location"
                    label='Location'
                    options={!options ? [{ label: "Loading...", id: 0 }] : options}
                    value={props.locationValue}
                    filterOptions={(x) => x}
                    onInputChange={(event, newInputValue) => {
                        setInputValue(newInputValue);
                    }}
                    onChange={props.handleSelectArea}
                    getOptionLabel={(option) => option.value}
                    isOptionEqualToValue={
                        (option, value) => {
                            return option.identifier === value.identifier
                        }
                    }
                    sx={{ width: 300, border: 'none' }}
                    renderInput={(params) => <TextField {...params} label="Location" />}
                />

                <TextField
                    id="select-beds"
                    select
                    label="Minimum Bedrooms"
                    sx={{ width: '200px' }}
                    value={props.minBeds}
                    onChange={handleBedsChange}
                >

                    {bedOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField
                    id="select-price"
                    select
                    label="Maximum Price"
                    sx={{ width: '200px' }}
                    value={props.maxPrice}
                    onChange={handlePriceChange}
                >
                    {priceOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </div>
        </div>

    )
}




