const Skeleton = () => {
   return (
      <div className={` w-fit flex flex-col items-center  animate-pulse`}>
         <div className="aspect-square scale-80 flex justify-center ">
            <div className="relative overflow-hidden rounded-full  shadow-xl  bg-card  w-[25vw] h-[25vw]  flex"></div>
         </div>
         <div className="flex flex-row gap-[0.5vw] items-center   justify-around">
            <div className="relative bg-card flex  py-[6.5vw] rounded-[0.7vw] w-[9vw]"></div>
            <div className="relative bg-card flex w-[9vw] py-[6.5vw] rounded-[0.7vw]"></div>
         </div>
      </div>
   );
};

export default Skeleton;
