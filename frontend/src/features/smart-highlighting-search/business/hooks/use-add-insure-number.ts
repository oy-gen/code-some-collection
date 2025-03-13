import { postNewInsureNumberToDb } from "../../api/services/api-service.ts";
import {
  selectSmartHighlightingSearch,
  useStore,
} from "../../../../shared/store/use-store.ts";

export function useAddInsureNumber(): (newInsureNumber: string) => void {
  const { addInsureNumberToStore } = useStore(selectSmartHighlightingSearch);

  return (newInsureNumber: string) => {
    if (!newInsureNumber) {
      return;
    }
    postNewInsureNumberToDb(newInsureNumber).then((response: string | null) => {
      if (response === null) {
        return;
      }
      addInsureNumberToStore(response);
    });
  };
}
