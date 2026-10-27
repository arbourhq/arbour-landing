export type ArticleImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  kind: "product" | "photo";
  credit?: { label: string; href: string };
};

type FigureBase = {
  afterSection: string;
  title: string;
  caption: string;
};

export type ArticleFigure = FigureBase &
  (
    | {
        kind: "screenshot";
        image: ArticleImage;
        focus?: { x: number; y: number; w: number; h: number };
      }
    | { kind: "steps"; items: { label: string; detail: string }[] }
    | { kind: "table"; columns: string[]; rows: string[][] }
    | {
        kind: "bars";
        items: { label: string; value: number; displayValue: string }[];
        sourceId: number;
      }
  );

export type ArticleVisuals = {
  cover: ArticleImage;
  takeaways: string[];
  figures: ArticleFigure[];
};
