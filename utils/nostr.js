import { nip19 } from "nostr-tools";

export const isNpub = (nip19Entity) => {
  try {
    return nip19.decode(nip19Entity).type === "npub";
  } catch (error) {
    return false;
  }
};
