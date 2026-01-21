import { CardSlot } from "../../features/floating-card/CardSlot";

type HomeTwoColProps = {
  title: string;
  text: string;
  imgSrc: string;
  flip?: boolean;
};

export function HomeTwoCol({ title, text, imgSrc, flip = false }: HomeTwoColProps) {
  return (
    <section className="section">
      <div className={`wrap two-col ${flip ? "flip" : ""}`}>
        {flip ? (
          <>
            <div className="col-visual">
              <CardSlot imgSrc={imgSrc} />
            </div>
            <div className="col-text">
              <h2 className="h2">{title}</h2>
              <p className="p">{text}</p>
            </div>
          </>
        ) : (
          <>
            <div className="col-text">
              <h2 className="h2">{title}</h2>
              <p className="p">{text}</p>
            </div>
            <div className="col-visual">
              <CardSlot imgSrc={imgSrc} />
            </div>
          </>
        )}
      </div>
    </section>
  );
}
