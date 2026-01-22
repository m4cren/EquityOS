import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { openPanel, closePanel } from "./sidePanelSlice";

export const useSidePanel = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isSidePanel = useSelector((state: RootState) => state.sidePanel);

  const handleOpenPanel = () => dispatch(openPanel());
  const handleClosePanel = () => dispatch(closePanel());

  return {
    isSidePanel,
    handleClosePanel,
    handleOpenPanel,
  };
};
