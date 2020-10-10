var braintree = require("braintree");

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "9p5qb2pnnmrkqy2x",
  publicKey: "pp78xxnd5hgpnmvz",
  privateKey: "a18f21f409c7a77c409d657ce449461d",
});

exports.getToken = (req, res) => {
  gateway.clientToken.generate({}, function (err, response) {
    if (err) {
      console.log("ERROR IN GETTOKEN - BACKEND");
      res.status(500).send(err);
    } else {
      res.send(response);
      console.log("RESPONSE FROM GETTOKEN - BACKEND", response);
    }
  });
};

exports.processPayment = (req, res) => {
  const nonceFromTheClient = req.body.paymentMethodNonce;
  const amountFromTheClient = req.body.amount;

  gateway.transaction.sale(
    {
      amount: { amountFromTheClient },
      paymentMethodNonce: nonceFromTheClient,
      options: {
        submitForSettlement: true,
      },
    },
    function (err, result) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(result);
      }
    }
  );
};
