import ReceiverPage from "./_components/reveiver";

const Page = ({ params }: { params: { letterId: string } }) => {
  return <ReceiverPage params={params} />;
};

export default Page;
