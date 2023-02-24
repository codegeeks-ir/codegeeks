import DefaultLayout from "layouts/DefaultLayout";
import PageLayout from "layouts/PageLayout";
import { getItem, getSlugs } from "lib/get-collection";
import { getPersianDate } from "lib/persian-long-date";

export default function ChallengePage({ data }) {
  return (
    <>
      <h1 className="mb-0">{data.title}</h1>
      <h5 className="card-subtitle mt-0 mb-2">{data.score}</h5>
      <div className="flex flex-row non-important mt-10 mb-20 p-0">
        <div className="w-1/2">
          <h5>زمان</h5>
          <p className="card-text my-0">
            {getPersianDate(data.date)}
          </p>
          <p className="card-text my-0">ساعت {data.date.split(" ")[1]}</p>
        </div>
      </div>
      <article dangerouslySetInnerHTML={{ __html: data.contentHtml }}></article>{" "}
    </>
  );
}

ChallengePage.getLayout = function getLayout(content) {
  return (
    <DefaultLayout>
      <PageLayout>{content}</PageLayout>;
    </DefaultLayout>
  );
};

export async function getStaticProps({ params }) {
  const data = await getItem(params.slug, "collections/challenges/challenges");
  return {
    props: {
      data,
    },
  };
}

export async function getStaticPaths() {
  const paths = getSlugs("collections/challenges/challenges");
  return { paths, fallback: false };
}
