const axios = require('axios');
const { geocoding } = require('../../secrets').development;
const utils = {};

utils.convertAddressToCoords = (address) => {
    const [city, state] = address.split(', ');
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${city.replace(/ /g, '+')},+${state.replace(/ /g, '+')}&key=${geocoding}`)
        .then(res => res.data)
        .then(data => {
            let loc = data.results[0].geometry.location;
            let result = [loc.lat, loc.lng];
            return result;
        })
        .catch(err => console.log(err));
}

module.exports = utils;
