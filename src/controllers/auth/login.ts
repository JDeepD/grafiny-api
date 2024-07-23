import * as Interfaces from "../../interfaces/index";
import * as Utils from "../../utils/index";
import * as admin from "firebase-admin";
import * as Error from "../../globals/errors";

const login: Interfaces.Controllers.Async = async (req, res) => {
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
              uploadedItems: {
                select: {
                  id: true,
                  file: true,
                  name: true,
                  uploadedAt: true,
                  modifiedAt: true,
                  topic: true,
                  topicId: true,
                  bookmarkedBy: true,
                  bookmarkedByIds: true,
                  likedBy: true,
                  likedByIds: true,
                },
              },
              uploadedItemIds: true,
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

      if (!existingUser) {
        const user = await Utils.prisma.user.create({
          data: {
            name: decodedValue.name,
            email: decodedValue.email as string,
            password: "",
            profilePic: decodedValue.picture,
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
                uploadedItems: {
                  select: {
                    id: true,
                    file: true,
                    name: true,
                    uploadedAt: true,
                    modifiedAt: true,
                    topic: true,
                    topicId: true,
                    bookmarkedBy: true,
                    bookmarkedByIds: true,
                    likedBy: true,
                    likedByIds: true,
                  },
                },
                uploadedItemIds: true,
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
    console.log(err);
    return res.json(Utils.Response.error("Something went Wrong", 401));
  }
};

export default login;
