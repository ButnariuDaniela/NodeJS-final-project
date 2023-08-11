import * as express from "express";
import * as bodyParser from "body-parser";
import * as path from "path";
import * as admin from "firebase-admin";
import * as config from "./config/config.json";
import { ServiceAccount } from "firebase-admin";
import ShopRoute from "./routes/shop.route";
import ProductRoute from "./routes/product.route";
import AuthRoute from "./routes/auth.route";
import { DataBase } from "./db";

const app = express();
DataBase.init();
admin.initializeApp({
  credential: admin.credential.cert(config as ServiceAccount),
});

app.use(bodyParser.json({ limit: "25mb" }));
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", new ShopRoute().routes);
app.use("/", new ProductRoute().routes);
app.use("/", new AuthRoute().routes);

app.get('*', function(req, res){
  console.log(req.headers)
  res.status(404);
  res.send({error: "route not found"})
  // res.sendFile(__dirname+'/public/error.html');
})

//init static content
const publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

//init server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server is running ...`));
