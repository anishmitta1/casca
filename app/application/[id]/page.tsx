import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ApplicationStep } from "@/constants";
import { getApplication } from "@/lib/backend/loan-application";
import Form from "./form";
import FileUpload from "./file-upload";

interface ApplicationPageProps {
  params: {
    id: string;
  };
}

const ApplicationPage = async ({ params }: ApplicationPageProps) => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/auth/login");
  }

  const application = await getApplication(params.id);

  return (
    <div>
      {application.step === ApplicationStep.KYB && (
        <Form user={data.user} application={application} />
      )}

      {application.step === ApplicationStep.DOCUMENTS && <FileUpload />}
    </div>
  );
};

export default ApplicationPage;
