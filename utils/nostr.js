import { nip19 } from "nostr-tools";

export const isNpub = (nip19Entity) => {
  try {
    return nip19.decode(nip19Entity).type === "npub";
  } catch {
    return false;
  }
};

export const encodeNpub = nip19.npubEncode;

export const decodeNpub = (npub) => {
  try {
    const { type, data } = nip19.decode(npub);

    return type === "npub" ? data : null;
  } catch {
    return null;
  }
};

export const extractZapRequest = (zapReceiptEvent) => {
  try {
    return JSON.parse(
      zapReceiptEvent.tags.find((t) => t[0] === "description")[1],
    );
  } catch {
    return null;
  }
};

const userProfileCache = {};

export const getUserProfile = async (npub) => {
  if (userProfileCache[npub]) {
    return userProfileCache[npub];
  }

  try {
    const res = await fetch(`/api/users/${npub}`);
    const userProfile = await res.json();

    userProfileCache[npub] = userProfile;

    return userProfile;
  } catch {
    return null;
  }
};

const truncateNip19Entity = (nip19Entity) => {
  return `${nip19Entity.substring(0, 8)}...${nip19Entity.substring(
    nip19Entity.length - 8,
  )}`;
};

export const getNormalizedName = async (npub) => {
  const userProfile = await getUserProfile(npub);
  console.log({ userProfile });

  return (
    userProfile?.display_name || userProfile?.name || truncateNip19Entity(npub)
  );
};
