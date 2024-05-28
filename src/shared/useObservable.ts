import { useEffect, useState } from "react";
import { BaseStore } from "./baseStore";

export const useObservable = <T>(store: BaseStore<T>): T => {
  const [state, setState] = useState<T>(store.getValue());

  useEffect(() => {
    if (!store) {
      return;
    }
    const subscriber = store.getObservable()?.subscribe(setState);
    return () => {
      subscriber?.unsubscribe();
    };
  }, [store]);

  return state;
};
