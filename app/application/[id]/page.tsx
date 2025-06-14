interface ApplicationPageProps {
  params: {
    id: string;
  };
}

const ApplicationPage = async ({ params }: ApplicationPageProps) => {
  const { id } = params;

  return <div>ApplicationPage</div>;
};

export default ApplicationPage;
