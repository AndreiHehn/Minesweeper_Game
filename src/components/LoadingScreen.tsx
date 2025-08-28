/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from "react";
import { Container } from "../styles/LoadingScreen";
import Cell from "./Cell";
import { useTranslation } from "react-i18next";
import { AppContext } from "../lib/context";

const contents = ["1", "2", "3", "4", "flag"] as const;
const totalLoops = 3;

export default function LoadingScreen() {
  const { t } = useTranslation();
  const [cells, setCells] = useState<(string | undefined)[]>(
    Array(contents.length).fill(undefined)
  );
  const [loopCount, setLoopCount] = useState(0);
  const { loadingMessage } = useContext(AppContext);

  useEffect(() => {
    if (loopCount >= totalLoops) return;

    contents.forEach((content, index) => {
      setTimeout(() => {
        setCells((prev) => {
          const newCells = [...prev];
          newCells[index] = content;
          return newCells;
        });

        if (index === contents.length - 1) {
          setTimeout(() => {
            setCells(Array(contents.length).fill(undefined));
            setLoopCount((prev) => prev + 1);
          }, 500);
        }
      }, (index + 1) * 600);
    });
  }, [loopCount]);

  return (
    <Container>
      <article className="loading">
        <div className="cells">
          {cells.map((cellContent, idx) => (
            <Cell
              key={idx}
              enableClick={false}
              hiddenContent={cellContent as any}
              loadingCell
              index={0}
            />
          ))}
        </div>
        <h2 className="loadingText">{t(loadingMessage)}...</h2>
      </article>
    </Container>
  );
}
