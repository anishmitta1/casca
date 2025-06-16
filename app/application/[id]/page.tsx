import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ApplicationStep } from "@/constants";
import { getApplication } from "@/lib/backend/loan-application";
import Form from "./form";
import FileUpload from "./file-upload";
import Review from "./review";

interface ApplicationPageProps {
  params: Promise<{
    id: string;
  }>;
}

const ApplicationPage = async ({ params }: ApplicationPageProps) => {
  const { id } = await params;

  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/auth/login");
  }

  const application = await getApplication(id);

  return (
    <div>
      {application.step === ApplicationStep.KYB && (
        <Form user={data.user} application={application} />
      )}

      {application.step === ApplicationStep.DOCUMENTS && (
        <FileUpload application={application} />
      )}

      {application.step === ApplicationStep.REVIEW && (
        <Review application={application} />
      )}
    </div>
  );
};

export default ApplicationPage;
