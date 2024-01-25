import * as Utils from "../utils";
//import { User } from "@prisma/client";
import * as admin from "firebase-admin";
const isAuthenticated = async (req: any, res: any, _next: any) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    //console.log(token)
    const decodedValue = await admin.auth().verifyIdToken(token);
    console.log(1111111111);
    if (decodedValue) {
      console.log(decodedValue);
      //return next();
    }
    return res.json({ mesg: "UnauthorisedVerified" });
  } catch (err) {
    console.log(err);
    return Utils.Response.error("Unauthorised", 400);
  }
};

export default isAuthenticated;
