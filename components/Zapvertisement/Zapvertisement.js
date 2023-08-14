import { useEffect, useRef, useState } from "react";
import { SimplePool } from "nostr-tools";
import {
  decodeNpub,
  encodeNpub,
  extractZapRequest,
  getNormalizedName,
  getSatsAmount,
} from "@/utils";
import styles from "./Zapvertisement.module.css";

export const Zapvertisement = ({ nip19Entity }) => {
  const messageDisplayQueue = useRef([]);
  const [currentMessage, setCurrentMessage] = useState(null);

  useEffect(() => {
    const pubkey = decodeNpub(nip19Entity);

    // Currently, only supporting npub entities
    // TODO: add support for note, nevent, and zap.stream naddr entities
    if (!pubkey) {
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
    const sub = pool.sub(relays, [
      {
        kinds: [9735],
        "#p": [pubkey],
        since: Math.round(Date.now() / 1000),
      },
    ]);

    sub.on("event", async (event) => {
      const zapRequestEvent = extractZapRequest(event);
      const name = await getNormalizedName(encodeNpub(zapRequestEvent.pubkey));
      const imageUrlRegex =
        /(https?:\/\/.*\.(?:png|jpg|jpeg|jfif|gif|bmp|svg|webp))/gi;
      const text = zapRequestEvent.content.replace(imageUrlRegex, "");
      const image = zapRequestEvent.content.match(imageUrlRegex)?.[0];
      const invoice = event.tags.find((t) => t[0] === "bolt11")[1];
      const satsAmount = getSatsAmount(invoice);

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
    }, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

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
