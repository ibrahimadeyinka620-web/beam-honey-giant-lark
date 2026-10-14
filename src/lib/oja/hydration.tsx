import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useOja } from "@/lib/oja/store";

const HydrationContext = createContext(false);

export function OjaProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let live = true;
    const finish = () => {
      if (live) setReady(true);
    };
    void Promise.resolve(useOja.persist.rehydrate()).then(finish, finish);
    return () => {
      live = false;
    };
  }, []);
  return <HydrationContext.Provider value={ready}>{children}</HydrationContext.Provider>;
}

export function useHydrated() {
  return useContext(HydrationContext);
}
