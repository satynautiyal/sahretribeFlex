const { google } = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URL
);

module.exports = async (req, res) => {
  ////////////////
  const code = req.query.code;
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  /////////////

  // const { location, location_address, orderId } = req.body;
  // generate a url that asks permissions for Blogger and Google Calendar scopes
  //   const scopes = ['https://www.googleapis.com/auth/calendar'];

  //   const url = oauth2Client.generateAuthUrl({
  //     // 'online' (default) or 'offline' (gets refresh_token)
  //     access_type: 'offline',

  //     // If you only need one scope you can pass it as a string
  //     scope: scopes,
  //   });

  res.send('redirect');
};
