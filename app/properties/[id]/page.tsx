type PropertyPageProps = {
  params: {
    id: string;
  };
};

function PropertyPage({ params }: PropertyPageProps) {
  return <div>PropertyPage {params.id}</div>;
}

export default PropertyPage;
