// src/components/MessageNoStories/MessageNoStories.tsx
import Link from "next/link";
import styles from "./MessageNoStories.module.css";

interface Props {
  text: string;
  buttonText: string;
  targetRoute: string;
}

const MessageNoStories = ({ text, buttonText, targetRoute }: Props) => {
  return (
    <div className={styles.wrapper}>
      <p className={styles.description}>{text}</p>
      <Link href={targetRoute} className={styles.actionButton}>
        {buttonText}
      </Link>
    </div>
  );
};

export default MessageNoStories;
