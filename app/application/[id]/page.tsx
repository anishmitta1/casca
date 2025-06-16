import { Input } from "@/components/ui/input";
import Form from "./form";

interface ApplicationPageProps {
  params: {
    id: string;
  };
}

const ApplicationPage = ({ params }: ApplicationPageProps) => {
  const { id } = params;

  return (
    <div>
      <Form />
    </div>
  );
};

export default ApplicationPage;
