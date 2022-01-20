import { buffer } from "micro";
const admin = require("firebase-admin");
// Secure a connection to FIREBASE from the backend
const serviceAccount = require("../../permission.json");

const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : admin.app();

// Establish connection to Stripe
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

/*
Run stripe listen --forward-to localhost:3000/api/webhook in the CMD
And you would get the signing secret(endpointSecret) to verify coming event is from Stripe or not
*/
const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

const fulfillOrder = async (session) => {
  console.log("fulfillOrder", session);

  return await app
    .firestore()
    .collection("users")
    .doc(session.metadata.email)
    .collection("orders")
    .doc(session.id)
    .set({
      amount: session.amount_total / 100, //from subunit dollar to regular dollar
      amount_shipping: session.total_details.amount_shipping / 100, // also from subcurrency to general currency
      images: JSON.parse(session.metadata.images),
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      console.log(`Success: Order ${session.id} had been added to the DB`);
    });
};

export default async (req, res, next) => {
  if (req.method === "POST") {
    const requestBuffer = await buffer(req);
    const payload = requestBuffer.toString();
    const sig = req.headers["stripe-signature"];

    let event;

    //Verify that the EVENT posted came from stripe
    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err) {
      console.log("ERROR", err.message);
      return res.status(400).send(`Webhook error: ${err.message}`);
    }

    console.log(event);

    // Handle the checkout.session.completed event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      // Fulfill the order...
      return fulfillOrder(session)
        .then(() => res.status(200))
        .catch((err) => res.status(400).send(`Webhook Error: ${err.message}`));
    }
  }
};

//Every API route can export a config object to change the default configs
export const config = {
  api: {
    bodyParser: false, // you can disable it if you want to consume it as a string
    externalResolver: true, //is an explicit flag that tells the server that this route is being handled by an external resolver like express or connect. Enabling this option disables warnings for unresolved requests.
  },
};
