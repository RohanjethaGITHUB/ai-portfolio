type CardSlotProps = {
  imgSrc: string;
  rot?: number;
  scale?: number;
};

export function CardSlot({ imgSrc, rot = 0, scale = 1 }: CardSlotProps) {
  return (
    <div
      className="card-slot"
      data-img={imgSrc}
      data-rot={String(rot)}
      data-scale={String(scale)}
      aria-hidden="true"
    />
  );
}
