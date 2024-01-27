import * as Interfaces from "../../interfaces";
import * as Utils from "../../utils";
import * as Error from "../../globals/errors";

const getAllDepartments: Interfaces.Controllers.Async = async (
  req,
  res,
  next
) => {
  try {
    const id: string = req.query.id as string;
    if (!id) {
      return res.json(Error.invalidDetails);
    }

    const institute = await Utils.prisma.institution.findFirst({
      where: {
        id,
      },
    });

    if (!institute) {
      return res.json(Error.invalidDetails);
    }

    const departments = await Utils.prisma.department.findMany({
      where: {
        instituteID: institute.id,
      },
      include: {
        semester: true,
      },
    });

    return res.json(
      Utils.Response.success({
        departments,
      })
    );
  } catch (err) {
    return next(err);
  }
};

export default getAllDepartments;
