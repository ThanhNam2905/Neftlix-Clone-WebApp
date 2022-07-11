import { RefObject } from "react";

const useIsTruncated = (element: RefObject<HTMLParagraphElement>) => {
  if (!element.current) return false;
  return element.current.scrollHeight > element.current.clientHeight;
}

export default useIsTruncated;

