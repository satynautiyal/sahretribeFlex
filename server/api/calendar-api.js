const { google } = require('googleapis');
const dayjs = require('dayjs');

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URL
);
const calendar = google.calendar({
  version: 'v3',
  auth: process.env.API_KEY,
});
exports.redirectGoogle = async (req, res) => {
  ////////////////
  // const code = req.query.code;
  // const { tokens } = await oauth2Client.getToken(code);
  // oauth2Client.setCredentials(tokens);
  /////////////

  // const { location, location_address, orderId } = req.body;
  // generate a url that asks permissions for Blogger and Google Calendar scopes
  const scopes = ['https://www.googleapis.com/auth/calendar'];

  const url = oauth2Client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: 'offline',

    // If you only need one scope you can pass it as a string
    scope: scopes,
  });

  res.redirect(url);
};

exports.redirectAfter = async (req, res) => {
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

exports.createCalendarEvent = async (req, res) => {
  // const oauth2Client = new google.auth.OAuth2(
  //   process.env.CLIENT_ID,
  //   process.env.CLIENT_SECRET,
  //   process.env.REDIRECT_URL
  // );
  // const { location, location_address, orderId } = req.body;
  // generate a url that asks permissions for Blogger and Google Calendar scopes
  const scopes = ['https://www.googleapis.com/auth/calendar'];

  // const code = req.query.code;
  // const { tokens } = await oauth2Client.getToken(code);
  // oauth2Client.setCredentials(tokens);

  // const url = oauth2Client.generateAuthUrl({
  //   // 'online' (default) or 'offline' (gets refresh_token)
  //   access_type: 'offline',

  //   // If you only need one scope you can pass it as a string
  //   scope: scopes,
  // });

  calendar.events.insert({
    calendarId: 'primary',
    auth: oauth2Client,
    requestBody: {
      summary: 'This is a test event',
      description: 'BLA bla',
      start: {
        dateTime: dayjs(new Date())
          .add(1, 'day')
          .toISOString(),
        timeZone: 'Europe/Minsk',
      },
      end: {
        dateTime: dayjs(new Date())
          .add(1, 'day')
          .toISOString(),
        timeZone: 'Europe/Minsk',
      },
    },
  });

  res.send({ msg: 'Done' });
};
