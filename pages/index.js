import {useEffect} from 'react'
import {staticRequest} from "tinacms";
import {Layout} from "../components/Layout";
import {useTina} from "tinacms/dist/edit-state";
import Link from "next/link";

const query = `{
  getBookmarksList{
    edges {
      node {
        id
        data {
          keyBinding
          title
          url
          site          
        }
      }
    }
  }
}`;

export default function Home(props) {
    // data passes though in production mode and data is updated to the sidebar data in edit-mode
    const {data} = useTina({
        query,
        variables: {},
        data: props.data,
    });

    const bookmarksList = data.getBookmarksList.edges;
    const codeToUrl = {}

    if (data) {
        for (let bookmark of bookmarksList) {
            if (bookmark.node.data.keyBinding) {
                codeToUrl[bookmark.node.data.keyBinding] = bookmark.node.data.url
            }
        }
    }

    useEffect(function onFirstMount() {
        function handleOnKeyDown(evt) {
            const url = codeToUrl[evt.key]
            if (url) {
                // TODO flash a confirmation here
                window.location.href = url
            }
        }

        window.addEventListener("keydown", handleOnKeyDown);
    }, []); // empty dependencies array means "run this once on first mount"

    return (
        <Layout>
            <div className="bg-white">
                <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                    <div
                        className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {bookmarksList.map((bookmark) => (
                            <div key={bookmark.node.id} className="group relative">
                                <div className="border-solid border-2">
                                    <p className="text-6xl font-extrabold font-serif group-hover:opacity-75 text-center py-10">
                                        {bookmark.node.data.site}
                                    </p>
                                </div>
                                <div className="mt-4 flex justify-between">
                                    <div>
                                        <h3 className="text-lg text-gray-700">
                                            <Link href={bookmark.node.data.url}>
                                                <a>({bookmark.node.data.keyBinding}) {bookmark.node.data.title}</a>
                                            </Link>
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
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
    } catch {
        // swallow errors related to document creation
    }

    return {
        props: {
            data,
            //myOtherProp: 'some-other-data',
        },
    };
};
