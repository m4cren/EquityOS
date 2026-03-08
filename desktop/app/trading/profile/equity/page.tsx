import Body from "./_components/Body/Body";
import Head from "./_components/Head/Head";

const page = () => {
  return (
    <div className="flex flex-col gap-20 items-start mt-6 h-screen ">
      <Head />
      <Body />
    </div>
  );
};

export default page;
