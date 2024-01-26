import * as Interfaces from "../../interfaces";
import * as Utils from "../../utils/index";
import * as Error from "../../globals/errors";

const deleteInstitute: Interfaces.Controllers.Async = async (
  req,
  res,
  next
) => {
  try {
    const id: string = req.query.institutename as string;

    if (!id) {
      return res.json(Error.invalidDetails);
    }
    const deletedInstitute = await Utils.prisma.institution.delete({
      where: {
        id,
      },
    });

    return res.json(
      Utils.Response.success({
        msg: deletedInstitute,
      })
    );
  } catch (err) {
    return next(err);
  }
};

export default deleteInstitute;
