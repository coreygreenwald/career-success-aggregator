const router = require('express').Router()
const {User} = require('../db/models')
const themuse = require('../remotes/themuse');
const utils = require('../utils');
const Bluebird = require('bluebird');

module.exports = router

router.get('/', async (req, res, next) => {
  return Bluebird.resolve()
    .then(() => {
      let roles = themuse.loadRoles();
      res.json(roles);
    })
    .catch(next)
})
