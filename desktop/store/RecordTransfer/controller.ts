import { api } from "@/app/service/api-client";
import { IncomeTypes, TransferTypes } from "@/lib/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchFinanceAccount } from "../financeAccountSlice/controller";

export const fetchTransfer = createAsyncThunk<TransferTypes[]>(
  "recordTransfer/fetchTransfer",
  async () => {
    const data = await api<TransferTypes[]>({
      endpoint: "/finance/fetch-transfer",
      method: "GET",
    });

    return data || [];
  }
);

export const recordTransfer = createAsyncThunk(
  "recordTransfer/recordTransfer",
  async (transfer: TransferTypes, thunAPI) => {
    const { dispatch } = thunAPI;

    const update = async () => {
      await dispatch(fetchTransfer()).unwrap();
      await dispatch(fetchFinanceAccount()).unwrap();
    };

    if (!transfer) return;

    await api<void, typeof transfer>({
      endpoint: "/finance/record-transfer",
      method: "POST",
      body: transfer,
    });
    return update();
  }
);
