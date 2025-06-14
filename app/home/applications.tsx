import { User } from "@supabase/supabase-js";
import NewApplicationButton from "./new-application-button";

interface ApplicationsProps {
  user: User;
}

const Applications = ({ user }: ApplicationsProps) => {
  console.log(user);
  return (
    <div className="flex items-center justify-between">
      <p className="text-[#101418] tracking-light text-[32px] font-bold leading-tight min-w-72">
        Applications
      </p>

      <NewApplicationButton user={user} />
    </div>
  );
};

export default Applications;
