import * as Interfaces from "../../interfaces";
import * as Utils from "../../utils";
import * as Error from "../../globals/errors";

const getAllSemester: Interfaces.Controllers.Async = async (req, res, next) => {
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

    const semesters = await Utils.prisma.semester.findMany({
      where: {
        departmentId: department.id,
      },
    });

    return res.json(
      Utils.Response.success({
        semesters,
      })
    );
  } catch (err) {
    return next(err);
  }
};

export default getAllSemester;
