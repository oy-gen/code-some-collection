import { getAllInsureNumbersFromDb } from "../../api/services/api-service.ts";
import {
  selectSmartHighlightingSearch,
  useStore,
} from "../../../../shared/store/use-store.ts";
import { useEffect } from "react";

export const useGetAllInsureNumbers = (): void => {
  const { insureNumbers, setInsureNumbersToStore } = useStore(
    selectSmartHighlightingSearch,
  );
  useEffect(() => {
    if (insureNumbers.length === 0) {
      const fetchData = async () => {
        const data = await getAllInsureNumbersFromDb();
        setInsureNumbersToStore(data);
      };
      fetchData();
    }
  }, [insureNumbers, setInsureNumbersToStore]);
};
