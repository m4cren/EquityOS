import { Eye, EyeOff } from "lucide-react";
import { UseFormRegister } from "react-hook-form";
import { PasswordFormType, PasswordInputType } from "./Form";

interface Props {
   register: UseFormRegister<PasswordFormType>;

   label: keyof PasswordFormType;
   action: "change" | "new";
   setIsPasswordShown: React.Dispatch<React.SetStateAction<PasswordInputType>>;
   isPasswordShown: PasswordInputType;
}

const InputPinContainer = ({
   isPasswordShown,
   label,
   register,
   action,
   setIsPasswordShown,
}: Props) => {
   return (
      <div className="flex flex-col gap-[0.4vw]">
         <label htmlFor={label} className=" font-semibold">
            {label === "oldPIN" && action === "new"
               ? "New PIN"
               : label === "oldPIN" && action === "change"
                 ? "Old PIN"
                 : label === "newPIN" && action === "new"
                   ? "Confirm PIN"
                   : label === "newPIN" && action === "change"
                     ? "New PIN"
                     : label === "confirmPIN" && "Confirm PIN"}
         </label>
         <div className="relative  w-fit">
            <input
               {...register(label)}
               id={label}
               required
               type={isPasswordShown[label] ? "text" : "password"}
               className="outline-none text-[1vw] font-semibold text-[#d4d4d490] border-2 py-[0.3vw] pl-[1vw] border-[#2c2c2c] rounded-[0.5vw] w-[18rem]"
            />
            <span
               onClick={() =>
                  setIsPasswordShown({
                     ...isPasswordShown,
                     [label]: !isPasswordShown[label],
                  })
               }
               className="cursor-pointer absolute top-1/2 right-1 scale-75 opacity-80 -translate-x-1/2 -translate-y-1/2"
            >
               {!isPasswordShown[label] ? <Eye /> : <EyeOff />}
            </span>
         </div>
      </div>
   );
};

export default InputPinContainer;
