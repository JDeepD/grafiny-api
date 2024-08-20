import { SEM } from "@prisma/client";
interface Semester {
  semNumber: SEM;
  departmentId: string;
}

export default Semester;
