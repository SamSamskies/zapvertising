import { Zapvertisement } from "@/components/Zapvertisement";

export default function Nip19Entity({
  nip19Entity,
  durationInMs,
  minSatsAmount,
}) {
  return (
    <Zapvertisement
      nip19Entity={nip19Entity}
      durationInMs={durationInMs}
      minSatsAmount={minSatsAmount}
    />
  );
}

export const getServerSideProps = ({ query }) => {
  return { props: query };
};
