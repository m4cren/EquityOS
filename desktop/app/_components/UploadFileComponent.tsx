import { Upload } from "lucide-react";
import React from "react";

const UploadFileComponent = () => {
  return (
    <div className="flex items-center justify-center border-2 border-[#D1D5DC] dark:border-[#262626] border-dashed rounded-xl py-10">
      <input type="file" className="hidden"  />

      <div className="flex flex-col gap-2 items-center w-full">
        <button
          type="button"
          className="flex items-center gap-3 font-semibold text-sm border-1 dark:hover:bg-[#262626] transtion duration-150 border-black/10 dark:border-white/10 rounded-xl px-3 cursor-pointer hover:bg-[#E9EBEF] py-1 disabled:opacity-60"
        >
          <Upload size={16} /> Upload
        </button>
      </div>
    </div>
  );
};

export default UploadFileComponent;
