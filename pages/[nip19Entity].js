import { Zapvertisement } from "@/components/Zapvertisement";

export default function Nip19Entity({
  nip19Entity,
  durationInMs,
  minSatsAmount,
}) {
  return (
    <Zapvertisement
      nip19Entity={nip19Entity}
      durationInMs={durationInMs ? Number(durationInMs) : undefined}
      minSatsAmount={minSatsAmount ? Number(minSatsAmount) : undefined}
    />
  );
}

export const getServerSideProps = ({ query }) => {
  return { props: query };
};
