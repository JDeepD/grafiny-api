import * as Interfaces from "../../interfaces";
import * as Utils from "../../utils";
import * as Error from "../../globals/errors";

const toggleBookmark: Interfaces.Controllers.Async = async (req, res) => {
  try {
    const { profileId } = req.params;
    const { itemIds } = req.body;

    if (!itemIds || !Array.isArray(itemIds) || itemIds.length === 0) {
      return res.json(Error.invalidDetails);
    }

    const profile = await Utils.prisma.profile.findUnique({
      where: { id: profileId },
      include: { bookmarkedItems: true },
    });

    if (!profile) {
      return res.json(Error.invalidDetails);
    }

    const bookmarkedItemIds = profile.bookmarkedItems.map((item) => item.id);
    const itemsToConnect = itemIds.filter(
      (itemId) => !bookmarkedItemIds.includes(itemId)
    );
    const itemsToDisconnect = bookmarkedItemIds.filter(
      (itemId) => !itemIds.includes(itemId)
    );

    await Utils.prisma.profile.update({
      where: { id: profileId },
      data: {
        bookmarkedItems: {
          connect: itemsToConnect.map((id) => ({ id })),
          disconnect: itemsToDisconnect.map((id) => ({ id })),
        },
      },
    });

    return res.json(
      Utils.Response.success({ msg: "bookmarks updated Succesfully" })
    );
  } catch (err) {
    return res.json(Utils.Response.error("Something Went Wrong", 409));
  }
};

export default toggleBookmark;
