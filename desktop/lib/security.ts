import { api } from "@/app/service/api-client";

export const checkIfPinExist = async (): Promise<boolean> => {
  const data: [] = await api({ endpoint: "/security", method: "GET" });

  if (data.length <= 0) {
    return false;
  } else {
    return true;
  }
};
