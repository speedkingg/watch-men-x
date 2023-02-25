import { useEffect, useState } from "react";
import { Image } from "../types/image";

export function useImage(image: Image) {
  const [originalUrl, setOriginalUrl] = useState<string | undefined>(undefined);
  const [url, setUrl] = useState<string | undefined>(undefined);
  const [target, setTarget] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (image.path === undefined) return;
    if (typeof image.path === "object") {
      if (image.targetNum === undefined || image.path.length - 1 < image.targetNum) return;
      setOriginalUrl(image.path[image.targetNum]);
      setUrl(image.path[image.targetNum]);
    } else {
      setOriginalUrl(image.path);
      setUrl(image.path);
    }

    setTarget(image.targetNum);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image.path, image.targetNum]);

  // 画像番号が変わったら画像URLを更新する
  useEffect(() => {
    if (typeof image.path !== "object" || target === undefined) return;
    setUrl(image.path[target]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  const increment = (): void => {
    if (target === undefined || !image.path) return;
    image.path.length - 1 === target
      ? setTarget(0)
      : setTarget((t) => (t !== undefined ? t + 1 : t));
  };

  const decrement = (): void => {
    if (target === undefined || !image.path) return;
    target === 0
      ? setTarget(image.path.length - 1)
      : setTarget((t) => (t !== undefined ? t - 1 : t));
  };

  const reset = (): void => {
    image.targetNum !== undefined && setTarget(image.targetNum);
  };

  return { originalUrl, url, increment, decrement, reset };
}
