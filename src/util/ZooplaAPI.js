import { fakeAPIRequest } from "./Error";
import { DummyAutocompleteData, DummySalesData } from "./DummyData";

function getFromZoopla(path, errorContext) {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'zoopla.p.rapidapi.com',
            'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_API_KEY
        }
    };
    return fetch(`https://zoopla.p.rapidapi.com/${path}`, options)
    .then(response => response.json())
    .catch(_ => {
        errorContext.addError()
    });
}

export function ZooplaSalesList (autocompleteResult, errorContext) {
    if(errorContext.useDummyData) {
        return fakeAPIRequest(DummySalesData);

    }
    return getFromZoopla(`properties/list?area=${autocompleteResult.value}&identifier=${autocompleteResult.identifier}&category=residential&listing_status=sale&order_by=age&ordering=descending&page_number=1&page_size=40`, errorContext).then((resp) => resp)
}

export function ZooplaAutocomplete (searchTerm, errorContext) {
    if(errorContext.useDummyData) {
        return fakeAPIRequest(DummyAutocompleteData).then((resp) => {
            return resp;
        })
    }
    return getFromZoopla(`auto-complete?search_term=${searchTerm}&search_type=listings`, errorContext).then((resp) => resp)
}

