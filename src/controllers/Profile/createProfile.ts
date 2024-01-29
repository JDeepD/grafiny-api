import * as Interfaces from "../../interfaces";
import * as Utils from "../../utils";
import * as Error from "../../globals/errors";
import { User } from "@prisma/client";

const createProfile: Interfaces.Controllers.Async = async (req, res, next) => {
  try {
    const { scholarId, year, instituteId } = req.body as Interfaces.Profile;
    if (!scholarId || !year || !instituteId) {
      return res.json(Error.invalidDetails);
    }
    const user = req.user as User;
    const existingProfile = await Utils.prisma.profile.findFirst({
      where: {
        OR: [{ userId: user.id }, { instituteId, scholarId }],
      },
      include: {
        institution: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });

    if (existingProfile) {
      return res.json(
        Utils.Response.success({
          profile: existingProfile,
        })
      );
    }

    const profile: Interfaces.Profile = await Utils.prisma.profile.create({
      data: {
        scholarId,
        year,
        user: {
          connect: {
            id: user.id,
          },
        },
        institution: {
          connect: {
            id: instituteId,
          },
        },
      },
      include: {
        institution: {
          select: {
            name: true,
          },
        },
      },
    });

    return res.json(
      Utils.Response.success({
        profile,
      })
    );
  } catch (err) {
    return next(err);
  }
};

export default createProfile;
