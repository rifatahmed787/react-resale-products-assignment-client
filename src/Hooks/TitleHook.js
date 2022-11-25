import { useEffect } from "react";

const TitleHook = (title) => {
  useEffect(() => {
    document.title = `${title}-Laptop Zone`;
  }, [title]);
};

export default TitleHook;
