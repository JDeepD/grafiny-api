import * as Interfaces from "../../interfaces";
import * as Utils from "../../utils";
import * as Error from "../../globals/errors";

const createSemester: Interfaces.Controllers.Async = async (req, res, next) => {
  try {
    const { departmentId, semNumber } = req.body as Interfaces.Semester;

    if (!departmentId || !semNumber) {
      return res.json(Error.invalidDetails);
    }

    const department = await Utils.prisma.department.findFirst({
      where: {
        id: departmentId,
      },
    });

    if (!department) {
      return res.json(Error.invalidDetails);
    }

    const existingSemester = await Utils.prisma.semester.findFirst({
      where: {
        semNumber,
        departmentId: department.id,
      },
    });

    if (existingSemester) {
      return res.json(
        Utils.Response.error(
          "Semester With This Sem Number/ Code Already Exists. Please Try a With Different Name",
          409
        )
      );
    }

    const semester = await Utils.prisma.semester.create({
      data: {
        semNumber,
        department: {
          connect: {
            id: department.id,
          },
        },
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

export default createSemester;
