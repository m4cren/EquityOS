import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

export const useTodayNetWorth = () => {
  const todayNetWorth = useSelector((state: RootState) => state.todayNetworth);

  return todayNetWorth;
};
