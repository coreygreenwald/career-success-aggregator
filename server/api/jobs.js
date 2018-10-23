const router = require('express').Router()
const {User} = require('../db/models')
const themuse = require('../remotes/themuse');

module.exports = router

router.get('/', async (req, res, next) => {
  res.json([themuse.loadSoftwareRoles()]);
})
