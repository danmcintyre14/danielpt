import { useMemo } from "react";
import Button from "../Button/Button";
import WhatsAppIcon from "./WhatsAppIcon";
import styles from "./WhatsAppContact.module.css";

export default function WhatsAppContact({
  phone = "971526497126",
  message = "Hi Dan! I’d like to learn more about coaching.",
  headline = "Need quick help?",
  subhead = "Message me on WhatsApp and I’ll reply as soon as possible.",
  buttonText = "Chat on WhatsApp",
  onClick,
}) {
  const waLink = useMemo(() => {
    const encoded = encodeURIComponent(message);
    return `https://wa.me/${phone}?text=${encoded}`;
  }, [phone, message]);

  const handleClick = () => {
    if (typeof onClick === "function") {
      onClick({ channel: "whatsapp", phone, message });
    }
  };

  return (
    <section className={styles.section} aria-labelledby="whatsapp-title">
      <div className={styles.card}>
        <h2 id="whatsapp-title" className={styles.title}>
          {headline}
        </h2>
        <p className={styles.subhead}>{subhead}</p>
        <Button
          href={waLink}
          mode="filled"
          onClick={handleClick}
          className={styles.whatsappButton}
        >
          <WhatsAppIcon className={styles.inlineIcon} />
          {buttonText}
        </Button>
      </div>
    </section>
  );
}



