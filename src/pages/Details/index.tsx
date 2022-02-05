import { useEffect } from "react";
import moment from "moment";

/** components */
import { ErrorBox, Layout, Loader } from "@/components";

/** custome hooks */
import { useQuery } from "@/lib/hooks";

/** store */
import { useAppDispatch, useAppSelector } from "@/store";
import ArticleStore from "@/store/articles";
import { useNavigate } from "react-router-dom";

const Detail = () => {
  const dispatch = useAppDispatch();
  const search = useQuery();
  const navigate = useNavigate();

  const p = search.get("p");
  const q = search.get("q");
  const url = search.get("url");

  const { article, loading, error } = useAppSelector((state) => state.articles);

  const handleBackToResults = () => {
    p && q ? navigate(`/?q=${q}&p=${p}`) : navigate(`/`);
  };

  useEffect(() => {
    if (url) {
      dispatch(
        ArticleStore.actions.fetchArticle({
          fq: `web_url:"${url}"`,
        })
      );
    }
  }, [dispatch, url]);

  if (loading) return <Loader />;
  if (error) return <ErrorBox error={error} />;

  return (
    <Layout>
      <div>
        <div className="mt-20">
          <div>
            <div>
              <button
                onClick={handleBackToResults}
                className="font-bold underline text-blue-600 cursor-pointer"
              >{`< Go to results page`}</button>
            </div>
          </div>
          {article && (
            <div>
              <div className="mt-8">
                <h2 className="font-bold text-4xl">{article.headline.main}</h2>
                <p className="italic mt-4">
                  {moment(article.pub_date).format("D.MM.YYYY")}
                </p>
              </div>

              <div className="mt-6">
                <p>{article.lead_paragraph}</p>
                <p>{article.abstract}</p>
              </div>

              <div className="mt-4">
                <a
                  href={article.web_url}
                  className="font-bold underline text-blue-600 cursor-pointer"
                  target="_blank"
                >{`Read the full article`}</a>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Detail;
