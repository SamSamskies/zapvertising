import styles from "./Zapvertisement.module.css";

const exampleZapEvent = {
  content: "https://media.tenor.com/jDJkh3w0wTAAAAAC/gregzaj1-ln_strike.gif",
  created_at: 1691890578,
  id: "ded90a44b5fc6d71515ac7aeb0557e1fc5282e27b93ddc1e8b38d66a2498a8a9",
  kind: 9734,
  pubkey: "830b7a3bd56a4b48facfeefcc82ccd2516c6519c081c60413e24904ca3e6f364",
  sig: "a244b0567ece429b2da40d5863a62c0bd9eee36dd977c77ed2e3f513fb056fd90ff02b851031e921a57c07d37371dbb3ab8a2a05d6aaaf6dbe8398a4ccecbe7a",
  tags: [
    ["p", "139137969c1c56bf8306cd71272f681ed54206be15eeceb9eb98956d2fd9f7ef"],
    ["e", "9a1c6bb236b3b502fc6e7f6c5b46b628700566419a5564f87e10bb0468dea295"],
  ],
};

export const Zapvertisement = ({ nip19Entity }) => {
  return (
    <div
      style={{
        textAlign: "center",
        backgroundColor: "transparent",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          padding: "0 24px",
          marginBottom: 16,
          marginLeft: "auto",
          marginRight: "auto",
          borderRadius: 24,
          height: "25vh",
          width: "fit-content",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#565869",
        }}
      >
        <p className={styles.p} style={{ fontSize: 32 }}>
          {nip19Entity} zapped 69 sats⚡️
        </p>
        <p className={styles.p} style={{ fontSize: 64, marginTop: 8 }}>
          Vamos 🚀
        </p>
      </div>
      <div
        style={{
          backgroundImage: `url("${exampleZapEvent.content}")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          backgroundPosition: "top center",
          height: "calc(75vh - 16px)",
        }}
      />
    </div>
  );
};
