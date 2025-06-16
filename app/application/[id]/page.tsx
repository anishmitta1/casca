interface ApplicationPageProps {
  params: {
    id: string;
  };
}

const ApplicationPage = ({ params }: ApplicationPageProps) => {
  const { id } = params;

  return <div>ApplicationPage {id}</div>;
};

export default ApplicationPage;
