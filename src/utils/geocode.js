import request from 'request';

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiYWhtZWRhbGxpZW4iLCJhIjoiY2xvMzZscmFoMXg2czJtbXh2bWJiN3k4dCJ9.5Ot5S3OgwTVtyYDfq4aThw';

    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location services!', undefined);
        } else if (response.body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined);
        } else {
            const data = {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            };
            callback(undefined, data);
        }
    });
};

export default geocode;
