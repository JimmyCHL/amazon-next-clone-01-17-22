const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export default async (req, res, next) => {
  const { items, email } = req.body;
  //console.log(items, email);

  const transformItems = items.map((item) => ({
    description: item.description,
    quantity: 1,
    price_data: {
      currency: "usd",
      unit_amount: item.price * 100, //subcurrency
      product_data: {
        name: item.title,
        images: [item.image],
      },
    },
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_rates: ["shr_1KJSCVHCKpfawrrNEnklDBuI"],
    shipping_address_collection: {
      allowed_countries: ["GB", "US", "CA"],
    },
    line_items: transformItems,
    mode: "payment",
    success_url: `${process.env.HOST}/success`,
    cancel_url: `${process.env.HOST}/checkout`, //when cancel to go back this page
    metadata: {
      email,
      images: JSON.stringify(items.map((item) => item.image)),
    },
  });

  console.log(session);

  res.status(200).json({ id: session.id });
};
