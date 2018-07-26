import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";
import * as cors from "cors";

admin.initializeApp(functions.config().firebase);

const app = express();
app.use(cors({ origin: true }));
// https://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
app.disable("x-powered-by");

app.get("/", async (req: express.Request, res: express.Response) => {
  res.send("Hello from Firebase!");
});

app.get("/users", async (req: express.Request, res: express.Response) => {
  res.json([{ name: "Pablo Colaiacovo", email: "pablo.colaiacovo@gmail.com" }]);
});

app.get("*", async (req: express.Request, res: express.Response) => {
  res.status(404).send("This route does not exist.");
});

export const api = functions.https.onRequest(app);
