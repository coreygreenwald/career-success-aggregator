// Imports the Google APIs client library
const {google} = require('googleapis');
const projectId = process.env.GOOGLE_CLOUD_PROJECT;

// Acquires credentials
google.auth.getApplicationDefault((err, authClient) => {
  if (err) {
    console.error('Failed to acquire credentials');
    console.error(err);
    return;
  }

  if (authClient.createScopedRequired && authClient.createScopedRequired()) {
    authClient = authClient.createScoped([
      'https://www.googleapis.com/auth/jobs'
    ]);
  }

  // Instantiates an authorized client
  const jobService = google.jobs({
    version: 'v3',
    auth: authClient
  });

  // const requestMetadata = {
  //   userId: 'HashedUserId',
  //   sessionId: 'HashedSessionId'
  // }

  const requestMetadata = {
    "domain": "UNKNOWN",
    "sessionId": "UNKNOWN",
    "userId": "UNKNOWN",
  }

  const options = {
    searchMode: 'JOB_SEARCH',
    // requestMetadata: requestMetadata,
    // jobQuery: {
    //   query: 'Software Engineer'
    // },
    requestMetadata: requestMetadata,
    // jobQuery: { query: 'Software Engineer' },
  };

  const pathParams = {parent: `projects/*`}


  // Lists companies
  jobService.projects.jobs.search(pathParams, options,(err, result) => {
    if(err){
      console.log('ERROR', err);
    }
    console.log(result);
    // if (err) {
    //   console.error('Failed to retrieve companies! ' + err);
    //   throw err;
    // }
    // console.log(`Request ID: ${result.data.metadata.requestId}`);

    // const companies = result.data.companies || [];

    // if (companies.length) {
    //   console.log('Companies:');
    //   companies.forEach((company) => console.log(company.name));
    // } else {
    //   console.log(`No companies found.`);
    // }
  });
});


// const { OAuth2Client } = require('google-auth-library');
// async function main() {
//   const oAuth2Client = new OAuth2Client();
//   oAuth2Client.setCredentials({ access_token: 'Bearer notarealtoken'});
//   const url = 'https://www.googleapis.com/plus/v1/people?query=pizza';
//   const res = await oAuth2Client.request({ url });
//   console.log(res.data);
// }
// main().catch(console.error);