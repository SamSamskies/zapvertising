export default function Nip19Entity({ nip19Entity }) {
  return <p>TODO: display latest zap amount and content for {nip19Entity}</p>;
}

export const getServerSideProps = ({ params }) => {
  const { nip19Entity } = params;

  return { props: { nip19Entity } };
};
