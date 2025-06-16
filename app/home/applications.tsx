import { User } from "@/types";
import NewApplicationButton from "./new-application-button";
import { getApplications } from "@/lib/backend/loan-application";
import ApplicationsTable from "./applications-table";

interface ApplicationsProps {
  user: User;
}

const Applications = async ({ user }: ApplicationsProps) => {
  const applications = await getApplications();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <p className="tracking-light text-[32px] font-bold leading-tight min-w-72">
          Applications
        </p>

        <NewApplicationButton user={user} />
      </div>

      <ApplicationsTable applications={applications} />
    </div>
  );
};

export default Applications;
