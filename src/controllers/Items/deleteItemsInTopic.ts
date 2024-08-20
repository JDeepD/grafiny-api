import * as Interfaces from "../../interfaces";
import * as Utils from "../../utils";
import * as Error from "../../globals/errors";

const deleteAllItemsInTopic: Interfaces.Controllers.Async = async (
  req,
  res,
  next
) => {
  try {
    const topicId = req.query.id as string;
    if (!topicId) {
      return res.json(Error.invalidDetails);
    }

    const topic = await Utils.prisma.topic.findFirst({
      where: {
        id: topicId,
      },
      include: {
        items: {
          include: {
            file: true,
          },
        },
      },
    });
    if (!topic) {
      return res.json(Error.invalidDetails);
    }
    const items = topic.items;

    if (items.length <= 0) {
      return res.json(Utils.Response.success({ msg: "No Items To Delete" }));
    }

    let item;
    let keys;
    for (let i = 0; i < items.length; i++) {
      item = items[i];
      keys = item.file.map((fileobj) => fileobj.key) as string[];
      await Utils.Delete.deleteFiles(keys);
      await Utils.prisma.items.delete({
        where: {
          id: item.id,
        },
      });
    }

    return res.json(
      Utils.Response.success({
        msg: "All Item Folders in Topic Deleted Succesfully",
      })
    );
  } catch (err) {
    return next(err);
  }
};

export default deleteAllItemsInTopic;
