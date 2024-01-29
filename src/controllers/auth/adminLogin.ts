import * as Interfaces from "../../interfaces/index";
import * as Utils from "../../utils/index";
import * as admin from "firebase-admin";
import * as Error from "../../globals/errors";
import { AUTH_LEVEL } from "@prisma/client";

const adminLogin: Interfaces.Controllers.Async = async (req, res) => {
  try {
    const token = req?.headers?.authorization?.split(" ")[1] as string;
    const decodedValue = await admin.auth().verifyIdToken(token);
    if (decodedValue) {
      const existingUser = await Utils.prisma.user.findFirst({
        where: {
          email: decodedValue.email,
        },
        include: {
          profile: true,
        },
      });

      if (!existingUser) {
        const user = await Utils.prisma.user.create({
          data: {
            name: decodedValue.name,
            email: decodedValue.email as string,
            password: "",
            profilePic: decodedValue.picture,
            authorisationLevel: AUTH_LEVEL.ADMIN,
          },
          include: {
            profile: {
              select: {
                institution: {
                  select: {
                    name: true,
                    id: true,
                  },
                },
                scholarId: true,
                uploadedItems: true,
                uploadedItemIds: true,
                dislikedItems: true,
                dislikedItemIds: true,
                bookmarkedItems: true,
                bookmarkedItemsIds: true,
                likedItems: true,
                likedItemIds: true,
                year: true,
                userId: true,
                id: true,
              },
            },
          },
        });
        return res.json(Utils.Response.success({ msg: user }));
      }

      return res.json(Utils.Response.success({ msg: existingUser }));
    } else {
      return res.json(Error.Auth.invalidCredentials);
    }
  } catch (err) {
    return res.json(Utils.Response.error("Something went Wrong", 401));
  }
};

const superAdminLogin: Interfaces.Controllers.Async = async (req, res) => {
  try {
    const token = req?.headers?.authorization?.split(" ")[1] as string;
    const decodedValue = await admin.auth().verifyIdToken(token);
    if (decodedValue) {
      const existingUser = await Utils.prisma.user.findFirst({
        where: {
          email: decodedValue.email,
        },
        include: {
          profile: {
            select: {
              institution: {
                select: {
                  name: true,
                  id: true,
                },
              },
              scholarId: true,
              uploadedItems: true,
              uploadedItemIds: true,
              dislikedItems: true,
              dislikedItemIds: true,
              bookmarkedItems: true,
              bookmarkedItemsIds: true,
              likedItems: true,
              likedItemIds: true,
              year: true,
              userId: true,
              id: true,
            },
          },
        },
      });
      console.log(existingUser);
      if (!existingUser) {
        const user = await Utils.prisma.user.create({
          data: {
            name: decodedValue.name,
            email: decodedValue.email as string,
            password: "",
            profilePic: decodedValue.picture,
            authorisationLevel: AUTH_LEVEL.SUPERADMIN,
          },
          include: {
            profile: {
              select: {
                institution: {
                  select: {
                    name: true,
                    id: true,
                  },
                },
                scholarId: true,
                uploadedItems: true,
                uploadedItemIds: true,
                dislikedItems: true,
                dislikedItemIds: true,
                bookmarkedItems: true,
                bookmarkedItemsIds: true,
                likedItems: true,
                likedItemIds: true,
                year: true,
                userId: true,
                id: true,
              },
            },
          },
        });
        return res.json(Utils.Response.success({ msg: user }));
      }
      return res.json(Utils.Response.success({ msg: existingUser }));
    } else {
      return res.json(Error.Auth.invalidCredentials);
    }
  } catch (err) {
    return res.json(Utils.Response.error("Something went Wrong", 401));
  }
};

export { adminLogin, superAdminLogin };
