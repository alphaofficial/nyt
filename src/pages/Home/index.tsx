import { useEffect, useState } from "react";
import classNames from "classnames";
import { nanoid } from "nanoid";
import { BiSearch } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

/** components */
import { Layout } from "@/components";

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
  const { articles, loading } = useAppSelector((state) => state.articles);
  const [buttonClicked, setButtonClicked] = useState(false);

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
  }, [pageQuery, searchQuery]);

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
              <div
                key={nanoid()}
                className={classNames(
                  "bg-gray-100 py-4 px-4 last:border-b-0 border-b-2 border-gray-200 cursor-pointer hover:bg-gray-200",
                  { "bg-gray-300": loading }
                )}
                onClick={() =>
                  navigate(
                    `/details?web_url=${article.web_url}&p=${page}&q=${query}`
                  )
                }
              >
                <h3 className={classNames("text-md", { "opacity-0": loading })}>
                  {article.headline.main}
                </h3>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 mb-20">
          <div className="flex flex-row justify-between align-center">
            <button
              onClick={handlePreviousPage}
              className="underline text-blue-600 cursor-pointer"
            >{`< Prev page`}</button>
            <button
              onClick={handleNextPage}
              className="underline text-blue-600 cursor-pointer"
            >{`Next page >`}</button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
