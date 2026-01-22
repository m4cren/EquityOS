import { useSyncExternalStore } from "react";

export default function useMounted() {
  return useSyncExternalStore(
    () => () => {}, // subscribe (no-op)
    () => true, // client snapshot
    () => false // server snapshot
  );
}
