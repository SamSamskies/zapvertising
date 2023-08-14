import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { getUserProfile, isNpub } from "@/utils";

export default function Qrcode({ nip19Entity }) {
  const willFetchProfile = isNpub(nip19Entity);
  const [profileImageUrl, setProfileImageUrl] = useState(
    "https://pbs.twimg.com/profile_images/1604195803748306944/LxHDoJ7P_400x400.jpg",
  );

  useEffect(() => {
    if (!willFetchProfile) {
      return;
    }

    try {
      getUserProfile(nip19Entity).then(({ picture }) => {
        if (picture) {
          setProfileImageUrl(picture);
        }
      });
    } catch {}
  }, [willFetchProfile]);

  return (
    <QRCodeSVG
      includeMargin
      size={800}
      imageSettings={{
        src: profileImageUrl,
        height: 112,
        width: 112,
        excavate: true,
      }}
      value={`nostr:${nip19Entity}`}
    />
  );
}

export const getServerSideProps = ({ params }) => {
  const { nip19Entity } = params;

  return { props: { nip19Entity } };
};
