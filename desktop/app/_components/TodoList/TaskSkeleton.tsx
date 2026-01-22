const TaskSkeleton = () => {
  const skeletonCount = [1, 2, 3];

  return (
    <>
      {skeletonCount.map((_, index) => (
        <li
          key={index}
          className="animate-pulse relative bg-card rounded-md w-full px-[1.2vw] py-[1vw] flex flex-col gap-[0.65vw]"
        >
          <span className="w-[12vw] h-[2vw] rounded-[0.5vw] bg-[#d4d4d430]"></span>
          <span className="w-[6vw] h-[1.7vw] rounded-[0.5vw] bg-[#d4d4d430]"></span>
          <span className="w-[4vw] h-[1.2vw] rounded-[0.35vw] bg-[#d4d4d430]"></span>
          <span className="w-[1.6vw] h-[1.6vw] rounded-[0.35vw] bg-[#d4d4d430] absolute bottom-[1vw] right-[1vw]"></span>
        </li>
      ))}
    </>
  );
};

export default TaskSkeleton;
