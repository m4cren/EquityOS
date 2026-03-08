"use client";
import { createContext, PropsWithChildren, useContext, useState } from "react";

type ShowAmountContextType = {
   isBalanceShown: boolean;
   setIsBalanceShown: React.Dispatch<React.SetStateAction<boolean>>;
};
const ShowAmountContext = createContext<ShowAmountContextType | null>(null);

export const ShowAmountProvider = ({ children }: PropsWithChildren) => {
   const [isBalanceShown, setIsBalanceShown] = useState<boolean>(false);

   return (
      <ShowAmountContext.Provider value={{ isBalanceShown, setIsBalanceShown }}>
         {children}
      </ShowAmountContext.Provider>
   );
};

export const useShowAmountContext = () => {
   const context = useContext(ShowAmountContext);
   if (!context) {
      throw new Error("useAppContext must be used within AppProvider");
   }
   return context;
};
