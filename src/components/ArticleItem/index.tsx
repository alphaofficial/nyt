import { FC } from "react";
import classNames from "classnames";

interface ArticleItemProps {
  article: any;
  loading: boolean;
  handleDetails: (url: string) => void;
}

const ArticleItem: FC<ArticleItemProps> = ({
  article,
  loading,
  handleDetails,
}) => (
  <div
    className={classNames(
      "bg-gray-100 py-4 px-4 last:border-b-0 border-b-2 border-gray-200 cursor-pointer hover:bg-gray-200",
      { "bg-gray-300": loading }
    )}
    onClick={() => handleDetails(article.web_url)}
  >
    <h3
      className={classNames("text-md", {
        "opacity-0": loading,
      })}
    >
      {article.headline.main}
    </h3>
  </div>
);

export default ArticleItem;
