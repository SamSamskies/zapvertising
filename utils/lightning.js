import { decode } from "light-bolt11-decoder";

export const getSatsAmount = (invoice) => {
  return (
    decode(invoice).sections.find(({ name }) => name === "amount").value / 1000
  );
};
