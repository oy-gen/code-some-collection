export interface AppState {
  smartSearchHighlightState: SmartSearchHighlightState
}

export interface SmartSearchHighlightState {
  contractNumbers: string[];
  matchedContractNumbers:  string[] | null;
}