import { Weight } from "../components/Weight";

export const BalanceScalesPage: React.FC = () => {
  return (
    <>
      <h1>Scale balancing</h1>
      <Weight weight={10}></Weight>
      <Weight weight={300}></Weight>
    </>
  );
};
