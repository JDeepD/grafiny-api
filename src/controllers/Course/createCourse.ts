import * as Interfaces from "../../interfaces";
import * as Utils from "../../utils";
import * as Error from "../../globals/errors";

const createCourse: Interfaces.Controllers.Async = async (req, res, next) => {
  try {
    const { name, id, code } = req.body as Interfaces.Course;

    if (!name || !id || !code) {
      return res.json(Error.invalidDetails);
    }

    const semester = await Utils.prisma.semester.findFirst({
      where: {
        id,
      },
    });

    if (!semester) {
      return res.json(Error.invalidDetails);
    }

    const existingCourse = await Utils.prisma.course.findFirst({
      where: {
        code,
        semesterId: semester.id,
      },
    });

    if (existingCourse) {
      return res.json(
        Utils.Response.error(
          "Course With This code Already Exists In This semester Please Try a With Different Name",
          409
        )
      );
    }

    const course = await Utils.prisma.course.create({
      data: {
        name,
        code,
        semester: {
          connect: {
            id: semester.id,
          },
        },
      },
    });

    return res.json(
      Utils.Response.success({
        course,
      })
    );
  } catch (err) {
    return next(err);
  }
};

export default createCourse;
