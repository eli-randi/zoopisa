import { fakeAPIRequest } from "./Error";
import { DummyAutocompleteData, DummySalesData } from "./DummyData";

function getFromZoopla(path, errorContext) {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'zoopla.p.rapidapi.com',
            'X-RapidAPI-Key': '891d444976msh34ff20d47fbaa31p1f82b9jsn9acd122c97c3'
        }
    };
    return fetch(`https://zoopla.p.rapidapi.com/${path}`, options)
    .then(response => response.json())
    .catch(_ => {
        console.log(errorContext.isError)
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
            console.log(resp)
            return resp;
        })
    }
    return getFromZoopla(`auto-complete?search_term=${searchTerm}&search_type=listings`, errorContext).then((resp) => resp)
}

