import { staticRequest } from "tinacms";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { Layout } from "../components/Layout";
import { useTina } from "tinacms/dist/edit-state";
import Link from "next/link";

const query = `{
  getBookmarksList{
    edges {
      node {
        data {
          title
          url          
        }
      }
    }
  }
}`;

export default function Home(props) {
  // data passes though in production mode and data is updated to the sidebar data in edit-mode
  const { data } = useTina({
    query,
    variables: {},
    data: props.data,
  });

  const bookmarksList = data.getBookmarksList.edges;

  return (
    <Layout>
      <div>
        {bookmarksList.map((bookmark) => (
          <div key={bookmark.node.id}>
            <Link href={bookmark.node.data.url}>
              <a>{bookmark.node.data.title}</a>
            </Link>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const variables = {};
  let data = {};
  try {
    data = await staticRequest({
      query,
      variables,
    });
  } catch (e) {
    // swallow errors related to document creation
    console.log(e)
  }

  return {
    props: {
      data,
      //myOtherProp: 'some-other-data',
    },
  };
};
