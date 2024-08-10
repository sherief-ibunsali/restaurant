const express = require("express");
const port = 3002;
const axios = require("axios");
const app = express();
const uniqid = require("uniqid");
const sha256 = require("sha256");

const PHONE_PE_HOST_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox";
const MERCHANT_ID = "PGTESTPAYUAT";
const SALT_INDEX = 1;
const SALT_KEY = "ab3ab177-b468-4791-8071-275c404d8ab0";

app.get("/", (req, res) => {
  res.send("PhonePe app is working");
});

app.get("/pay", (req, res) => {
  const payEndpoint = "/pg/v1/pay";
  const merchantTransactionId = uniqid();
  const userId = 123;

  const payload = {
    merchantId: MERCHANT_ID,
    merchantTransactionId: merchantTransactionId,
    merchantUserId: userId,
    amount: 10000,
    redirectUrl: `http://localhost:3002/redirect-url/${merchantTransactionId}`,
    redirectMode: "REDIRECT",
    // callbackUrl: `http://localhost:3002/callback-url/${merchantTransactionId}`,
    mobileNumber: "9999999999",
    paymentInstrument: {
      type: "PAY_PAGE",
    },
  };

  const bufferObj = Buffer.from(JSON.stringify(payload), "utf8");
  const base64EncodedPayload = bufferObj.toString("base64");
  const xVerify = sha256(base64EncodedPayload + payEndpoint + SALT_KEY) + "###" + SALT_INDEX;

  const options = {
    method: "post",
    url: `${PHONE_PE_HOST_URL}${payEndpoint}`,
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      "X-VERIFY": xVerify,
    },
    data: {
      request: base64EncodedPayload,
    },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      res.send(response.data);
    })
    .catch(function (error) {
      console.error(error.response ? error.response.data : error.message);
      res.status(500).send(error.response ? error.response.data : error.message);
    });
});

app.listen(port, () => {
  console.log(`App started listening on port ${port}`);
});
