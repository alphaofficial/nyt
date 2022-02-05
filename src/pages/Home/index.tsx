import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import classNames from "classnames";
import { nanoid } from "nanoid";

/** components */
import {
  Layout,
  ArticleItem,
  Pagination,
  Loader,
  ErrorBox,
} from "@/components";

/** custome hooks */
import { useQuery } from "@/lib/hooks";

/** store */
import { useAppDispatch, useAppSelector } from "@/store";
import ArticleStore from "@/store/articles";

let timer: NodeJS.Timeout;
const Home = () => {
  const dispatch = useAppDispatch();
  const search = useQuery();
  const navigate = useNavigate();

  const pageQuery = search.get("p");
  const searchQuery = search.get("q");

  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);

  const { articles, loading, error } = useAppSelector(
    (state) => state.articles
  );

  const hasArticles = useMemo(() => articles.length > 0, [articles]);

  const handleSearch = async (e: any) => {
    const { value } = e.target;
    setQuery(value);
    clearTimeout(timer);
    timer = setTimeout(async () => {
      await dispatch(
        ArticleStore.actions.fetchArticles({ page, query: value })
      );
    }, 1500);
  };

  const handleDetails = (url: string) =>
    navigate(`/details?url=${url}&p=${page}&q=${query}`);

  const handleNextPage = () => {
    setPage((prevState) => prevState + 1);
    setButtonClicked(true);
  };

  const handlePreviousPage = () => {
    setPage((prevState) => (prevState > 1 ? prevState - 1 : 1));
    setButtonClicked(true);
  };

  useEffect(() => {
    if (buttonClicked) {
      dispatch(ArticleStore.actions.fetchArticles({ page, query }));
      setButtonClicked(false);
    }
  }, [dispatch, buttonClicked]);

  useEffect(() => {
    if (pageQuery && searchQuery) {
      setPage(+pageQuery);
      setQuery(searchQuery);
      dispatch(
        ArticleStore.actions.fetchArticles({
          page: +pageQuery,
          query: searchQuery,
        })
      );
    }
  }, [dispatch, pageQuery, searchQuery]);

  if (error) return <ErrorBox error={error} />;

  return (
    <Layout>
      <div>
        <div className="mt-20">
          <div>
            <h2 className="font-bold text-lg">Type search term in here:</h2>
          </div>
          <div className="w-full mt-2">
            <div className="flex flex-row align-center border-2 rounded-md relative py-4 px-4">
              <input
                type="text"
                className="focus:outline-none w-full bg-transparent"
                value={query}
                onChange={handleSearch}
              />
              <div className="absolute right-2 top-4">
                <BiSearch size={25} color="gray" />
              </div>
            </div>
          </div>
        </div>

        {loading && !hasArticles && <Loader />}

        {hasArticles && (
          <div className="mt-20">
            <div>
              <h2 className="font-bold">Result:</h2>
            </div>
            <div
              className={classNames(
                "w-full mt-2 border-2 rounded-md ease-in-out duration-300",
                {
                  "animate-pulse": loading,
                }
              )}
            >
              {articles.map((article: any) => (
                <ArticleItem
                  key={nanoid()}
                  article={article}
                  loading={loading}
                  handleDetails={handleDetails}
                />
              ))}
            </div>
          </div>
        )}

        {hasArticles && (
          <Pagination
            handleNextPage={handleNextPage}
            handlePreviousPage={handlePreviousPage}
          />
        )}
      </div>
    </Layout>
  );
};

export default Home;
