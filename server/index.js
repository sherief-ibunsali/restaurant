const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
const corsOptions = {
  origin: "http://localhost:3000", // Allow requests from this origin
  methods: "GET,POST,PUT,DELETE", // Allowed methods
  allowedHeaders: "Content-Type,Authorization", // Allowed headers
};

app.use(cors(corsOptions));

const PHONE_PE_HOST_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox";
const MERCHANT_ID = "PGTESTPAYUAT143";

const SALT_KEY = "ab3ab177-b468-4791-8071-275c404d8ab0";

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/order", async (req, res) => {
  try {
    let merchantTransactionId = req.body.transactionId;
    const data = {
      merchantId: MERCHANT_ID,
      merchantTransactionId: merchantTransactionId,
      name: req.body.name,
      amount: req.body.amount * 100,
      redirectUrl: `http://localhost:9000/status?id=${merchantTransactionId}`,
      redirectMode: "POST",
      mobileNumber: req.body.phone,
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };

    const SALT_INDEX = 1;
    const payload = JSON.stringify(data);
    const bufferObj = Buffer.from(payload, "utf8");
    const base64EncodedPayload = bufferObj.toString("base64");
    const string = base64EncodedPayload + "/pg/v1/pay" + SALT_KEY;
    const sha256 = crypto.createHash("sha256").update(string).digest("hex");
    const checksum = sha256 + "###" + SALT_INDEX;

    const options = {
      method: "post",
      url: `${PHONE_PE_HOST_URL}/pg/v1/pay`,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
      },
      data: {
        request: base64EncodedPayload,
      },
    };

    await axios(options)
      .then((response) => {
        console.log(response.data);
        return res.json(response.data);
      })
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
  }
});

app.post("/status", async (req, res) => {
  const merchantTransactionId = req.query.id;
  const merchantId = MERCHANT_ID;
  const keyIndex = 1;
  const string =
    `/pg/v1/status/${merchantId}/${merchantTransactionId}` + SALT_KEY;
  const sha256 = crypto.createHash("sha256").update(string).digest("hex");
  const checksum = sha256 + "###" + keyIndex;
  const options = {
    method: "GET",
    url: `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchantId}/${merchantTransactionId}`,
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      "X-VERIFY": checksum,
      "X-MERCHANT-ID": `${merchantId}`,
    },
  };
  await axios(options).then(function (response) {
    if (response.data.success === true) {
      const url = "http://localhost:5173/success";
      return res.re4(url);
    } else {
      const url = "http://localhost:5173/fail";
      return res.re4(url);
    }
  });
});

app.listen(9000, () => {
  console.log("server");
});
