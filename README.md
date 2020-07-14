#UI Integration
Lightning Out on NodeApp 

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)


This is a sample lightning component running on Heroku .
https://my-ui-integration.herokuapp.com/ (replace with your heroku app)

The connected Salesforce org can be an lwc-recipes scratch org, or an org with the components deployed


callback URL for the connected app is https://<yourapp>.herokuapp.com/oauth/_callback.
Add the customer key and customer secret to the config as
CONSUMER_KEY
CONSUMER_SECRET

The LIGHTNING_URL needs to be the URL of the org hosting the lwc-recipes components. You can use URL.getCanonicalURL in anonymous apex, or you can get it from the URL when you launch the developer console. 

Line 3 of ldOut.ejs needs to reference the source of the lightning out script
<script src="https://{yoursalesforcedomain}.lightning.force.com/lightning/lightning.out.js"></script>

Follow the [instructions for Lightning Out setup](https://developer.salesforce.com/docs/atlas.en-us.lightning.meta/lightning/lightning_out_requirements.htm)

CORS settings need to be set in the Salesforce org for the Lighting Out components to render, like
![Salesforce CORS Setup](readmeassets/CORS.png?raw=true "CORS Setup")
You may use a wildcard for protyping purposes
![Salesforce CORS Setup](readmeassets/CORS2.png?raw=true "CORS Setup")
