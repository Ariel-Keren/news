import { IAPIResponse, IArticle } from "@/types";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import ArticleList from "@/components/ArticleList";
import Head from "next/head";

const Home: React.FC = () => {
  const [articles, setArticles] = useState<IArticle[] | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      const data = await fetch(
        `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${process.env.NEXT_PUBLIC_API_KEY}`
      );
      const json: IAPIResponse = await data.json();
      setArticles(
        json.results.filter((article) => article.section !== "admin")
      );
    };

    fetchNews();
  }, []);

  return (
    <>
      <Head>
        <title>The New York Times</title>
      </Head>
      <Header currentSection="home" />
      <ArticleList articles={articles ?? []} />
    </>
  );
};

export default Home;
