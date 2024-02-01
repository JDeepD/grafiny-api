import * as Interfaces from "../../interfaces";
import * as Utils from "../../utils";
import * as Error from "../../globals/errors";

const toggleLikes: Interfaces.Controllers.Async = async (req, res) => {
  try {
    const { profileId } = req.params;
    const { itemIds } = req.body;

    if (!itemIds || !Array.isArray(itemIds) || itemIds.length === 0) {
      return res.json(Error.invalidDetails);
    }

    const profile = await Utils.prisma.profile.findUnique({
      where: { id: profileId },
      include: { likedItems: true },
    });

    if (!profile) {
      return res.status(404).json(Error.invalidDetails);
    }

    const likedItemIds = profile.likedItems.map((item) => item.id);

    const itemsToConnect = itemIds.filter(
      (itemId) => !likedItemIds.includes(itemId)
    );
    const itemsToDisconnect = likedItemIds.filter(
      (itemId) => !itemIds.includes(itemId)
    );

    await Utils.prisma.profile.update({
      where: { id: profileId },
      data: {
        likedItems: {
          connect: itemsToConnect.map((id) => ({ id })),
          disconnect: itemsToDisconnect.map((id) => ({ id })),
        },
      },
    });

    return res.json(
      Utils.Response.success({ msg: "Likes Updates Succesfully" })
    );
  } catch (err) {
    return res.json(Utils.Response.error("Something Went Wrong"));
  }
};

export default toggleLikes;
