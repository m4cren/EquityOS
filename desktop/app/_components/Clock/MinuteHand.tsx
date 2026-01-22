const MinuteHand = ({ rotation }: { rotation: number }) => {
   return (
      <span
         style={{ transform: `rotate(${rotation}deg)` }}
         className={`  shadow-md  absolute  h-[100%] top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex justify-center  `}
      >
         <span className="h-[33%] shadow-md [box-shadow:0_0_6px_rgba(0,0,0,0.6)] w-[0.4vw] bg-[#ececec70] absolute top-[33%] left-1/2 -translate-y-1/2 -translate-x-1/2 rounded-t-full"></span>
      </span>
   );
};

export default MinuteHand;
