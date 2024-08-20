import { YEAR } from "@prisma/client";

interface Profile {
  scholarId: number;
  year: YEAR;
  instituteId: string;
}

export default Profile;
