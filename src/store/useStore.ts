import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { AppState } from './AppStateModel';
import { contractNumbersInitialState } from './contractNumbersInitialState';

export const useStore = create<AppState>()(
  devtools(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (_set) => ({
      smartSearchHighlightState: {
        contractNumbers: contractNumbersInitialState,
        matchedContractNumbers: null,
      },
    }),
    {
      name: 'AppStore', // This name will appear in Redux DevTools
      enabled: true, // Optional; devtools are enabled by default in development
    }
  )
);
