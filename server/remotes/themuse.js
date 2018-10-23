const axios = require('axios');
const fs = require('fs');

module.exports = {
  getEngineeringRoles(page = 0) {
    return axios.get(`https://www.themuse.com/api/public/jobs?category=Engineering&level=Entry%20Level&level=Mid%20Level&page=${page}`)
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
  saveRoles() {
    return this.getEngineeringRoles()
      .then(results => {
        return fs.writeFileSync('./data.json', JSON.stringify(results));
      })
  },
  loadRoles() {
    return JSON.parse(fs.readFileSync('./data.json', 'utf8'));
  },
  loadSoftwareRoles() {
    var allRoles = this.loadRoles();
    return allRoles.filter(r => r.name.toLowerCase().includes('software'));
  }
}
