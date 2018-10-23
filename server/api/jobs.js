const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  res.json([{
    "name": 'I am a string',
    "companyName": 'I am a string',
    "requisitionId": 'I am a string',
    "title": 'I am a string',
    "description": 'I am a string',
    "addresses": [
      'I am a string'
    ],
    "applicationInfo": {
      key: 'value'
    },
    "jobBenefits": [
      'benefit1',
      'benefit2'
    ],
    "compensationInfo": {
      key: 'value'
    },
    "degreeTypes": [
      'blah1',
      'blah2'
    ],
    "department": 'I am a string',
    "employmentTypes": [
      'full-time'
    ],
    "incentives": 'I am a string',
    "languageCode": 'I am a string',
    "jobLevel": 'entryyy',
    "promotionValue": 0,
    "qualifications": 'I am a string',
    "responsibilities": 'I am a string',
    "postingRegion": 'region',
    "visibility": 'visibility',
    "jobStartTime": 'I am a string',
    "jobEndTime": 'I am a string',
    "postingPublishTime": 'I am a string',
    "postingExpireTime": 'I am a string',
    "postingCreateTime": 'I am a string',
    "postingUpdateTime": 'I am a string',
    "companyDisplayName": 'I am a string',
    "derivedInfo": {
      key: 'value'
    },
    "processingOptions": {
      key: 'value'
    }
  }])
})
