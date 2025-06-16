"use client";
import { startNewApplication } from "@/lib/backend/loan-application";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

interface NewApplicationButtonProps {
  user: User;
}

const NewApplicationButton = ({ user }: NewApplicationButtonProps) => {
  const router = useRouter();

  const onNewApplicationClick = async () => {
    const { data } = await startNewApplication(user);

    if (!data) {
      // couldnt create new application toast
      return;
    }

    router.push(`/application/${data[0].id}`);
  };

  return (
    <button
      onClick={onNewApplicationClick}
      className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 bg-[#eaedf1] text-[#101418] text-sm font-medium leading-normal"
    >
      <span className="truncate">Start New Application</span>
    </button>
  );
};

export default NewApplicationButton;
