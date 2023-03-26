const stripe = require('stripe')('sk_test_51MpOudGm81VMr6VhZ9p5XpJoWWy9FpfibFTwrvZkKr0GNhXcvozsT8xWLuWw2OoLgw19jw5S7Dp8bjMcut8wSZqO005jRPIm6G');

stripe.products.create({
  name: 'Starter Subscription',
  description: '$12/Month subscription',
}).then(product => {
  stripe.prices.create({
    unit_amount: 1200,
    currency: 'usd',
    recurring: {
      interval: 'month',
    },
    product: product.id,
  }).then(price => {
    console.log('Success! Here is your starter subscription product id: ' + product.id);
    console.log('Success! Here is your premium subscription price id: ' + price.id);
  });
});