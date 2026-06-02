"use client";

import { useTradingSystem } from "@/store/tradingSystem/useTradingSystem";
import SystemEditor from "./SystemEditor";
import CreateSystemModal from "./CreateSystemModal";

const System = () => {
  const { tradingSystem, errMsg, isPending } = useTradingSystem();

  const showCreateModal = !tradingSystem;
  return (
    <div className="min-h-screen p-6 text-white">
      {showCreateModal && <CreateSystemModal />}

      {errMsg && (
        <div className="mb-6 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">
          {errMsg}
        </div>
      )}

      {tradingSystem && (
        <SystemEditor
          key={JSON.stringify(tradingSystem)}
          tradingSystem={tradingSystem}
          isPending={isPending}
        />
      )}
    </div>
  );
};

export default System;
