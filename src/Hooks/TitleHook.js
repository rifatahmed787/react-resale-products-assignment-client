import { useEffect } from "react";

const TitleHook = (title) => {
  useEffect(() => {
    document.title = `${title}-Laptop Resale`;
  }, [title]);
};

export default TitleHook;
