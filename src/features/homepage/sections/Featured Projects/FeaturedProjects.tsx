import Image from "next/image";
import Link from "next/link";
import styles from "./FeaturedProjects.module.css";

type FeaturedItem = {
  title: string;
  href: string;
  imgSrc: string;
  alt: string;
};

type FeaturedProjectsProps = {
  quote?: string;
  author?: string;
};

const items: FeaturedItem[] = [
  {
    title: "AI Money Coach",
    href: "/portfolio/ai-money-coach",
    imgSrc: "/ai-money-coach.png",
    alt: "AI Money Coach preview",
  },
  {
    title: "AI Lead Gen Engine",
    href: "/portfolio/ai-lead-gen",
    imgSrc: "/ai-lead-gen.png",
    alt: "AI Lead Gen Engine preview",
  },
  {
    title: "Recruitment OS",
    href: "/portfolio/recruitment-os",
    imgSrc: "/recruitment-os.png",
    alt: "Recruitment OS preview",
  },
];

export default function FeaturedProjects({
  quote = "The best way to predict the future is to create it.",
  author = "Peter Drucker",
}: FeaturedProjectsProps) {
  return (
    <section className={styles.wrap} aria-label="Featured AI Builds">
      <div
        className={styles.bg}
        style={{ backgroundImage: 'url("/quote-bg.png")' }}
        aria-hidden="true"
      />
      <div className={styles.bgOverlay} aria-hidden="true" />

      <div className={styles.shell}>
        <div className={styles.header}>
          <h2 className={styles.title}>Featured AI Builds</h2>
          <p className={styles.subtitle}>
            A few end to end systems I have designed, shipped, and iterated in the real world.
          </p>
        </div>

        <div className={styles.grid}>
          {items.map((item) => (
            <Link key={item.href} href={item.href} className={styles.card}>
              <div className={styles.media}>
                <Image
                    src={item.imgSrc}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 900px) 100vw, 33vw"
                    className={styles.img}
                    priority={false}
                    />
                <div className={styles.cardOverlay} />
                <div className={styles.caption}>
                  <span className={styles.cardTitle}>{item.title}</span>
                  <span className={styles.cta}>View build</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className={styles.quoteBlock}>
          <div className={styles.quoteCard}>
            <div className={styles.mark} aria-hidden="true">
              ”
            </div>

            {quote?.trim() ? (
              <>
                <p className={styles.text}>{quote}</p>

                {author?.trim() ? (
                  <div className={styles.authorRow}>
                    <span className={styles.authorLine} aria-hidden="true" />
                    <span className={styles.author}>{author}</span>
                  </div>
                ) : null}
              </>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
