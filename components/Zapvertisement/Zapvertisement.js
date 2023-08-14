import { useEffect, useRef, useState } from "react";
import { SimplePool } from "nostr-tools";
import {
  encodeNpub,
  extractZapRequest,
  getFilter,
  getNormalizedName,
  getSatsAmount,
} from "@/utils";
import styles from "./Zapvertisement.module.css";

export const Zapvertisement = ({
  nip19Entity,
  durationInMs = 10000,
  minSatsAmount = 1,
}) => {
  const messageDisplayQueue = useRef([]);
  const [currentMessage, setCurrentMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const filter = getFilter(nip19Entity);

    if (!filter) {
      setError("Invalid NIP19 entity");
      return;
    }

    const pool = new SimplePool();
    const relays = [
      "wss://relay.nostr.band",
      "wss://relay.damus.io",
      "wss://nostr.wine",
      "wss://nos.lol",
      "wss://relay.snort.social",
    ];
    const sub = pool.sub(relays, [filter]);

    sub.on("event", async (event) => {
      const invoice = event.tags.find((t) => t[0] === "bolt11")[1];
      const satsAmount = getSatsAmount(invoice);

      if (satsAmount < minSatsAmount) {
        return;
      }

      const zapRequestEvent = extractZapRequest(event);
      const name = await getNormalizedName(encodeNpub(zapRequestEvent.pubkey));
      const imageUrlRegex =
        /(https?:\/\/.*\.(?:png|jpg|jpeg|jfif|gif|bmp|svg|webp))/gi;
      const text = zapRequestEvent.content.replace(imageUrlRegex, "");
      const image = zapRequestEvent.content.match(imageUrlRegex)?.[0];

      messageDisplayQueue.current.push({ name, text, image, satsAmount });
    });

    return () => {
      pool.close(relays);
    };
  }, [nip19Entity]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentMessage(null);

      if (messageDisplayQueue.current.length !== 0) {
        setCurrentMessage(messageDisplayQueue.current.shift());
      }
    }, durationInMs);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  if (error) {
    return <h1>{error}</h1>;
  }

  return currentMessage ? (
    <div className={styles.root}>
      <div className={styles.textContainer}>
        <p className={styles.p} style={{ fontSize: 64 }}>
          {currentMessage.name} zapped {currentMessage.satsAmount} sats⚡️
        </p>
        {currentMessage.text && (
          <p className={styles.p} style={{ fontSize: 88, marginTop: 8 }}>
            {currentMessage.text}
          </p>
        )}
      </div>
      {currentMessage.image && (
        <div
          style={{
            backgroundImage: `url("${currentMessage.image}")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundPosition: "top center",
            height: "calc(75vh - 16px)",
          }}
        />
      )}
    </div>
  ) : null;
};
