import { Wallet, X } from "lucide-react";
import React from "react";

interface Props {
  hasNoAccounts: boolean;
  setShowAddAccountModal: (value: React.SetStateAction<boolean>) => void;
  resetForm: () => void;
  handleAddAccount: (e: React.FormEvent<Element>) => void;
  formData: {
    acc_name: string;
    base_equity: string;
    is_funded: boolean;
  };
  setFormData: (
    value: React.SetStateAction<{
      acc_name: string;
      base_equity: string;
      is_funded: boolean;
    }>
  ) => void;
}
const InitializeAccount = ({
  formData,
  handleAddAccount,
  hasNoAccounts,
  resetForm,
  setShowAddAccountModal,
  setFormData,
}: Props) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0f0f0f] p-5 shadow-2xl">
        <div className="mb-5 flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/8 text-white/80">
              <Wallet size={18} />
            </div>

            <div>
              <h2 className="text-base font-semibold text-white">
                {hasNoAccounts ? "Initialize Account" : "Add Trading Account"}
              </h2>
              <p className="mt-1 text-sm text-white/45">
                {hasNoAccounts
                  ? "Create your first trading account to get started."
                  : "Add another account to track separately."}
              </p>
            </div>
          </div>

          {!hasNoAccounts && (
            <button
              onClick={() => {
                setShowAddAccountModal(false);
                resetForm();
              }}
              className="rounded-lg p-2 text-white/45 transition hover:bg-white/5 hover:text-white"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <form onSubmit={handleAddAccount} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-medium uppercase tracking-[0.12em] text-white/45">
              Account Name
            </label>
            <input
              type="text"
              value={formData.acc_name}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  acc_name: e.target.value,
                }))
              }
              placeholder="e.g. FTMO Swing"
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-white/20 focus:bg-white/[0.045]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium uppercase tracking-[0.12em] text-white/45">
              Initial Balance
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={formData.base_equity}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  base_equity: e.target.value,
                }))
              }
              placeholder="e.g. 10000"
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-white/20 focus:bg-white/[0.045]"
            />
          </div>

          <label className="flex cursor-pointer items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
            <div>
              <p className="text-sm font-medium text-white">Funded Account</p>
              <p className="text-xs text-white/45">
                Toggle this on if the account is funded.
              </p>
            </div>

            <input
              type="checkbox"
              checked={formData.is_funded}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  is_funded: e.target.checked,
                }))
              }
              className="h-4 w-4 accent-white"
            />
          </label>

          <button
            type="submit"
            className="w-full rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black transition hover:opacity-90"
          >
            {hasNoAccounts ? "Initialize Account" : "Add Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default InitializeAccount;
