import * as Interfaces from "../../interfaces";
import * as Utils from "../../utils";

const getProfile: Interfaces.Controllers.Async = async (req, res, next) => {
  try {
    const email = req.query.email as string;
    const user = await Utils.prisma.user.findFirst({
      where: {
        email: email,
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

    const profile = user?.profile;
    return res.json(
      Utils.Response.success({
        profile,
      })
    );
  } catch (err) {
    return next(err);
  }
};

export default getProfile;
