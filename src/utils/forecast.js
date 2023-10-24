import request from 'request';

const forecast = (lat, lon, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=edeb10b6d5cdb8d5c5a32c59cf433736&query=' + lat + ',' + lon;

    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (response.body.error) {
            callback('Unable to find location', undefined);
        } else {
            callback(undefined, ' It is currently ' + response.body.current.temperature + ' degrees out.');
        }
    });
};

export default forecast;
