import { Zapvertisement } from "@/components/Zapvertisement";

export default function Nip19Entity({ nip19Entity, durationInMs }) {
  return (
    <Zapvertisement nip19Entity={nip19Entity} durationInMs={durationInMs} />
  );
}

export const getServerSideProps = ({ query }) => {
  return { props: query };
};
