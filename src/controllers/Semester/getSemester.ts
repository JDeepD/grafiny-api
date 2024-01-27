import * as Interfaces from "../../interfaces";
import * as Utils from "../../utils";
import * as Error from "../../globals/errors";

const getSemester: Interfaces.Controllers.Async = async (req, res, next) => {
  try {
    const id: string = req.query.id as string;
    if (!id) {
      return res.json(Error.invalidDetails);
    }
    const department = await Utils.prisma.department.findFirst({
      where: {
        id,
      },
    });

    if (!department) {
      return res.json(Error.invalidDetails);
    }

    const semester = await Utils.prisma.semester.findFirst({
      where: {
        departmentId: department.id,
      },
      include: {
        course: true,
      },
    });

    return res.json(
      Utils.Response.success({
        semester,
      })
    );
  } catch (err) {
    return next(err);
  }
};

export default getSemester;
