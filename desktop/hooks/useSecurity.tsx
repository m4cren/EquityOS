import { checkIfPinExist } from "@/lib/security";
import { useEffect, useState } from "react";

export const useSecurity = () => {
  const [isExist, setExist] = useState<boolean>(false);
  useEffect(() => {
    const check = async () => {
      const is_exist = await checkIfPinExist();
      setExist(is_exist);
    };
    check();
  }, []);

  return isExist;
};
