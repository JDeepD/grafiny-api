import * as Utils from "../utils";
import * as admin from "firebase-admin";
const isAuthenticated = async (req: any, res: any, next: any) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedValue = await admin.auth().verifyIdToken(token);

    if (decodedValue) {
      const user = await Utils.prisma.user.findFirst({
        where: { email: decodedValue.email },
      });
      req.user = user;
      return next();
    }
    return res.json(Utils.Response.error("Unauthorised", 401));
  } catch (err) {
    return res.json(Utils.Response.error("Unauthorised", 401));
  }
};

export default isAuthenticated;
