import { Zapvertisement } from "@/components/Zapvertisement";

export default function Nip19Entity({ nip19Entity }) {
  return <Zapvertisement nip19Entity={nip19Entity} />;
}

export const getServerSideProps = ({ params }) => {
  const { nip19Entity } = params;

  return { props: { nip19Entity } };
};
