const axios = require('axios');
const fs = require('fs');
const utils = require('../utils');
const _ = require('lodash');
const Bluebird = require('bluebird');

module.exports = {
  getEngineeringRoles(page = 0) {
    return axios.get(`https://www.themuse.com/api/public/jobs?api_key=21668591a6a8c731e1ba7c274cdb7ed9572559e33b6a84bedea0a015f49efd07&category=Engineering&level=Entry%20Level&level=Mid%20Level&page=${page}`)
      .then(res => res.data)
      .then(data => {
        if (data.page >= data.page_count-1) return data.results;
        return this.getEngineeringRoles(page + 1)
          .then(dealsTail => data.results.concat(dealsTail))
          .catch(err => {
            console.error(err);
            return data.results;
          });
      });
  },
  loadLocations() {
    let roles = JSON.parse(fs.readFileSync('./initial.json', 'utf8'));

    roles = roles.filter(r => _.get(r, 'locations[0].name', '').includes(',')).filter(r => r.name.toLowerCase().includes('software'));
    console.log('got the roles')
    let grouping = _.groupBy(roles, 'locations[0].name');
    console.log('got the grouping')
    let locations = Object.keys(grouping);
    console.log('got the locations')
    let locationObj = {};
    locations.forEach(location => {
      if (!location.includes(',')) return;
      locationObj[location] = utils.convertAddressToCoords(location);
    });
    console.log('got the promises')
    return Bluebird.props(locationObj)
      .then(locationObj => {
        console.log('got all the promise results')
        for (var location in grouping) {
          grouping[location].forEach(obj => {
            obj.location = {
              name: location,
              coordinates: locationObj[location]
            };
          });
        }
        console.log('writing to file')
        return fs.writeFileSync('./data.json', JSON.stringify(roles));
      })
  },
  saveRoles() {
    let roles = [];
    return this.getEngineeringRoles()
      .then(results => {
        return fs.writeFileSync('./initial.json', JSON.stringify(results));

      //   roles = results.filter(r => _.get(r, 'locations[0].name', '').includes(',')).filter(r => r.name.toLowerCase().includes('software'));
      //   console.log('got the roles')
      //   let grouping = _.groupBy(roles, 'locations[0].name');
      //   console.log('got the grouping')
      //   let locations = Object.keys(grouping);
      //   console.log('got the locations')
      //   let locationObj = {};
      //   locations.forEach(location => {
      //     if (!location.includes(',')) return;
      //     locationObj[location] = utils.convertAddressToCoords(location);
      //   });
      //   console.log('got the promises')
      //   return Bluebird.props(locationObj)
      // })
      // .then(roles => {
      //   console.log('got all the promise results')
      //   for (var location in grouping) {
      //     grouping[location].forEach(obj => {
      //       obj.location = {
      //         name: location,
      //         coordinates: locationObj[location]
      //       };
      //     });
      //   }
      //   console.log('writing to file')
      //   return fs.writeFileSync('./data.json', JSON.stringify(roles));
      })
  },
  loadRoles() {
    return JSON.parse(fs.readFileSync('./data.json', 'utf8'));
  }
}
