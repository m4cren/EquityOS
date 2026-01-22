import { PopupControllerType } from "@/hooks/usePopupController";
import { TaskTypeChoice, TaskTypes } from "@/store/taskSlice/types";
import classNames from "classnames";
import { Calendar, Logs, Plus, XIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { taskCategoryBg } from "./TodoList";
import { useEffect, useState } from "react";

interface Props {
  modalController: PopupControllerType;
  addTask: (title: string, deadline: string, type: TaskTypeChoice) => void;
}
const AddTask = ({ modalController, addTask }: Props) => {
  const { isClosing, handleClose } = modalController;
  const { register, handleSubmit } = useForm<TaskTypes>();
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 60000); // update every minute
    return () => clearInterval(id);
  }, []);

  const onSubmit = async (data: TaskTypes) => {
    if (!data?.deadline) return;

    // data.deadline is "YYYY-MM-DD"
    const [y, m, d] = String(data.deadline).split("-").map(Number);

    const deadline = new Date(now); // clone current time
    deadline.setFullYear(y);
    deadline.setMonth(m - 1);
    deadline.setDate(d);

    addTask(data.title, deadline.toISOString(), data.type);
    handleClose();
  };

  return (
    <div className="fixed bg-black/30 z-1000 backdrop-blur-[1.6vw] top-0 left-0 bottom-0 right-0 w-full h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={classNames(
          "relative flex flex-col items-center gap-[1.5vw]  bg-[#202020] w-[40vw] h-fit rounded-[1vw] p-[4vw]",
          {
            "popup-animation": !isClosing,
            "popclose-animation": isClosing,
          }
        )}
      >
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 cursor-pointer"
        >
          <XIcon size={18} />
        </button>
        <input
          {...register("title")}
          type="text"
          id="label"
          className="outline-none font-semibold text-2xl w-[27vw]"
          placeholder="What do you need to get done?"
          autoComplete="off"
          required
        />

        <div className="flex items-center gap-[3vw] justify-between w-[27vw]">
          <label
            htmlFor="category"
            className="text-[1vw] opacity-75 flex items-center gap-[0.4vw]"
          >
            <Logs size={20} />
            Category
          </label>
          <select
            {...register("type")}
            id="category"
            className="border border-[#d4d4d430] rounded-[0.35vw] px-[1vw] text-[0.9vw] py-[0.25vw]"
          >
            {Object.keys(taskCategoryBg).map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-[3vw] justify-between w-[27vw]">
          <label
            htmlFor="date"
            className="text-[1vw] opacity-75 flex items-center gap-[0.4vw]"
          >
            <Calendar size={20} />
            Due date
          </label>
          <input
            {...register("deadline")}
            type="date"
            required
            id="date"
            className="outline-none border border-[#d4d4d430] rounded-[0.35vw] px-[1vw] text-[0.9vw] py-[0.25vw]"
          />
        </div>
        <button
          type="submit"
          className="cursor-pointer text-[0.9vw] py-[0.4vw] bg-[#2c2c2c] rounded-[0.6vw] flex flex-col items-center justify-center w-[27vw]"
        >
          <Plus />
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
