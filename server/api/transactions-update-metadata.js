const flexIntegrationSdk = require('sharetribe-flex-integration-sdk');

const integrationSdk = flexIntegrationSdk.createInstance({
  clientId: process.env.FLEX_INTEGRATION_CLIENT_ID,
  clientSecret: process.env.FLEX_INTEGRATION_CLIENT_SECRET,
});
//
module.exports = (req, res) => {
  const { location, location_address, orderId } = req.body;

  integrationSdk.transactions
    .updateMetadata(
      {
        id: orderId,
        metadata: {
          location: location,
          location_address: location_address,
        },
      },
      {
        expand: true,
      }
    )
    .then(res => {
      res.status(200).send(res.data);
      // res.data contains the response data
    })
    .catch(e => {
      res.send(e);
      console.log(e);
    });
};
