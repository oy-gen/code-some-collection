import { getAllInsureNumbersFromDb } from "../../api/services/api-service.ts";
import {
  selectSmartHighlightingSearch,
  useStore,
} from "../../../../shared/store/use-store.ts";
import { useEffect, useMemo } from "react";

export default function useGetAllInsureNumbers(): string[] {
  const { insureNumbers, setInsureNumbersToStore } = useStore(
    selectSmartHighlightingSearch,
  );
  useEffect(() => {
    if (insureNumbers.length === 0) {
      getAllInsureNumbersFromDb().then((data) => setInsureNumbersToStore(data));
    }
  }, [insureNumbers, setInsureNumbersToStore]);
  return useMemo(() => insureNumbers, [insureNumbers]);
}
