import styles from "./QuoteBand.module.css";

type QuoteBandProps = {
  quote: string;
  author?: string;
};

export default function QuoteBand({
  quote,
  author = "Rohan Jetha",
}: QuoteBandProps) {
 return (
  <section className={styles.band} aria-label="Quote section">
    <div className={styles.inner}>
      <p className={styles.quote}>&ldquo;{quote}&rdquo;</p>
      {author ? <div className={styles.author}>{author}</div> : null}
    </div>
  </section>
);
}
