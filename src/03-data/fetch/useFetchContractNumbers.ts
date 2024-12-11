import { useEffect } from "react";
import { selectSmartHighlightingSearch, useStore } from "../store/useStore";

export const useFetchContractNumbers = () => {
  // Simulate an API fetch
  const { initializeContractNumbers } = useStore(selectSmartHighlightingSearch);

  useEffect(() => {
    try {
      const simulatedData = [
        "12C-bB3-3_cC",
        "_bCCb31-1Cac",
        "C-3B133A-1/A",
        "B3C-C-__Ca_C",
        "13-_3-C-ba-1",
        "1b12C2a_2-2b",
        "/cba2BC2_a/c",
        "231_c_-3A-a_",
        "321/13a--Cab",
        "c-_232-/2231",
        "b2-2Bb-/2c3C",
        "/a/c3c-c33bc",
        "/-CB-bC2-cB2",
        "-2B3abc/bBca",
        "1/2ca-c3-33c",
      ];

      // Update the store
      initializeContractNumbers(simulatedData);
    } catch (error) {
      console.error("an error occured", error);
    }
  }, [initializeContractNumbers]);
};
