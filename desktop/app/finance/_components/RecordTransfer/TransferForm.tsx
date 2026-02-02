"use client";

import { Calendar, Plus, Send, Wallet } from "lucide-react";

const TransferFormStatic = () => {
  const accounts = [
    { id: "1", name: "Cash Wallet", balance: 5000 },
    { id: "2", name: "Bank Account", balance: 12000 },
    { id: "3", name: "Savings", balance: 30000 },
  ];

  return (
    <form className="flex flex-col gap-[1.5vw] w-[28vw]">
      {/* Amount */}
      <input
        type="number"
        placeholder="Amount to transfer ₱0"
        className="text-[1.5vw] font-semibold outline-none w-full"
      />

      {/* From Account */}
      <div className="flex items-center justify-between">
        <label className="text-[1vw] opacity-75 flex items-center gap-[0.4vw]">
          <Send size={20} />
          From Account
        </label>
        <select className="text-[0.9vw] px-[0.6vw] py-[0.3vw] rounded-[0.4vw]">
          <option>Select from account</option>
          {accounts.map((acc) => (
            <option key={acc.id}>{acc.name}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center justify-between -mt-[1vw]">
        <span className="text-[0.85vw] opacity-50">Current Balance:</span>
        <span className="text-[0.85vw] opacity-50">₱5,000</span>
      </div>

      <hr className="opacity-20 -mt-[1vw]" />

      <div className="flex items-center justify-between -mt-[1vw]">
        <span className="text-[0.85vw] opacity-50">New Balance:</span>
        <span className="text-[0.85vw] opacity-50">₱4,000</span>
      </div>

      {/* To Account */}
      <div className="flex items-center justify-between">
        <label className="text-[1vw] opacity-75 flex items-center gap-[0.4vw]">
          <Wallet size={20} />
          To Account
        </label>
        <select className="text-[0.9vw] px-[0.6vw] py-[0.3vw] rounded-[0.4vw]">
          <option>Select to account</option>
          {accounts.map((acc) => (
            <option key={acc.id}>{acc.name}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center justify-between -mt-[1vw]">
        <span className="text-[0.85vw] opacity-50">Current Balance:</span>
        <span className="text-[0.85vw] opacity-50">₱12,000</span>
      </div>

      <hr className="opacity-20 -mt-[1vw]" />

      <div className="flex items-center justify-between -mt-[1vw]">
        <span className="text-[0.85vw] opacity-50">New Balance:</span>
        <span className="text-[0.85vw] opacity-50">₱13,000</span>
      </div>

      {/* Date */}
      <div className="flex items-center justify-between">
        <label className="text-[1vw] opacity-75 flex items-center gap-[0.4vw]">
          <Calendar size={20} />
          Date
        </label>
        <input
          type="date"
          className="outline-none border border-[#d4d4d430] rounded-[0.35vw] px-[1vw] text-[0.9vw] py-[0.25vw]"
        />
      </div>

      <button
        type="button"
        className="cursor-pointer text-[0.9vw] py-[0.4vw] bg-[#2c2c2c] rounded-[0.6vw] flex flex-col items-center justify-center"
      >
        <Plus />
        Record
      </button>
    </form>
  );
};

export default TransferFormStatic;
