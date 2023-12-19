import CommonQuery from "@/lib/queries/common.query";
import { useSuspenseQuery } from "@tanstack/react-query";
import PostBox from "./post-box";

const CatButtons = () => {
  const { data } = useSuspenseQuery(CommonQuery.getCat);

  return Promise.resolve(data).then((cats) =>
    cats.map((cat) => (
      <PostBox
        key={cat.id}
        text={cat.name}
        className={`font-${cat.code}`}
        style={{ fontFamily: cat.code }}
      />
    )),
  );
};

export default CatButtons;
