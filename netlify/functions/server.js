// require("dotenv").config();
// const express = require("express");
// const path = require('path')
// const app = express();
const serverless = require("serverless-http");
// const cors = require("cors");
// const corsOptions = require("../../config/corsOptions");
// const { updateDataProduct } = require("../../controllers/productController");


// // const PORT = process.env.PORT || 3500

// app.use(cors(corsOptions));

// app.set("view engine", "ejs")
// app.set('views', path.join(__dirname, '..', '..'));

// // timer dalam milidetik
// // 24 jam
// const timer = updateDataProduct(3600000)

// app.get("/", (req, res) => {
//   // const waktu = updateDataProduct()
  
//   res.render('index', {timer: timer})
// });

// app.use("/checkout", require("../../routes/checkout"));

// app.all("*", (req, res) => {
//   res.status(404);
//   res.json({ message: "Url not found cuyy" });
// });

// app.listen(PORT, () => {
//   console.log(`Sukses server berjalan di http://localhost:${PORT}`)
// })
const { newApp } = require("../../server");


const handler = serverless(newApp);

module.exports = { handler };
