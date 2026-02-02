"use client";

import { Calendar, Coins, Logs, Plus, UserCircle } from "lucide-react";

const ExpenseFormStatic = () => {
  const accounts = [
    { id: "1", name: "Cash Wallet", balance: 5000 },
    { id: "2", name: "Bank Account", balance: 12000 },
  ];

  const categories = [
    { id: "1", label: "Food" },
    { id: "2", label: "Transport" },
    { id: "3", label: "Entertainment" },
  ];

  return (
    <form className="flex flex-col gap-[1vw] w-[22vw]">
      <input
        type="text"
        placeholder="Where did the money go?"
        className="text-[1.5vw] font-semibold outline-none w-full"
      />

      {/* Account */}
      <div className="flex items-center justify-between">
        <label className="text-[1vw] opacity-75 flex items-center gap-[0.4vw]">
          <UserCircle size={20} />
          Account
        </label>
        <select className="text-[0.9vw] px-[0.6vw] py-[0.3vw] rounded-[0.4vw]">
          <option>Select account</option>
          {accounts.map((acc) => (
            <option key={acc.id}>{acc.name}</option>
          ))}
        </select>
      </div>

      {/* Category */}
      <div className="flex items-center justify-between">
        <label className="text-[1vw] opacity-75 flex items-center gap-[0.4vw]">
          <Logs size={20} />
          Category
        </label>
        <select className="text-[0.9vw] px-[0.6vw] py-[0.3vw] rounded-[0.4vw]">
          <option>Select category</option>
          {categories.map((cat) => (
            <option key={cat.id}>{cat.label}</option>
          ))}
        </select>
      </div>

      {/* Balance */}
      <div className="flex items-center justify-between -mb-[0.8vw]">
        <span className="text-[0.85vw] opacity-50">Current Balance:</span>
        <span className="text-[0.85vw] opacity-50">₱5,000</span>
      </div>

      {/* Amount */}
      <div className="flex items-center justify-between">
        <label className="text-[1vw] opacity-75 flex items-center gap-[0.4vw]">
          <Coins size={20} />
          Amount
        </label>
        <input
          type="number"
          placeholder="₱0"
          className="outline-none text-end w-[6vw] text-[1vw] font-semibold"
        />
      </div>

      <hr className="opacity-20 -mt-[0.6vw]" />

      {/* New Balance */}
      <div className="flex items-center justify-between -mt-[0.8vw]">
        <span className="text-[0.85vw] opacity-50">New Balance:</span>
        <span className="text-[0.85vw] opacity-50">₱5,000</span>
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

export default ExpenseFormStatic;
