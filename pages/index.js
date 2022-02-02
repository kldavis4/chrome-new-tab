import {useEffect, useRef, useState} from 'react'
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
    const [selectedSite, setSelectedSite] = useState('');
    const textInput = useRef(null)
    useEffect(() => {
        textInput.current.focus();
    }, []);

    // data passes though in production mode and data is updated to the sidebar data in edit-mode
    const {data} = useTina({
        query,
        variables: {},
        data: props.data,
    });

    const bookmarksList = data.getBookmarksList.edges.sort((a, b) => {
        const codeA = (a.node.data.keyBinding && a.node.data.keyBinding.charCodeAt(0)) || -1
        const codeB = (b.node.data.keyBinding && b.node.data.keyBinding.charCodeAt(0)) || -1
        return codeA - codeB
    });
    const codeToBookmark = {}

    if (data) {
        for (let bookmark of bookmarksList) {
            if (bookmark.node.data.keyBinding) {
                codeToBookmark[bookmark.node.data.keyBinding] = bookmark.node.data
            }
        }
    }

    useEffect(function onFirstMount() {
        function handleOnKeyDown(evt) {
            const data = codeToBookmark[evt.key]
            if (data) {
                const url = data.url
                if (url) {
                    window.location.href = url
                }
                setSelectedSite(evt.key)
            }
        }

        window.addEventListener("keydown", handleOnKeyDown);
    }, []); // empty dependencies array means "run this once on first mount"

    return (
        <Layout>
            <div className="invisible"><form><input type="text" ref={textInput} /></form></div>
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
            {
                selectedSite !== '' && (
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t bg-slate-200">
                                    <h3 className="text-3xl">
                                        navigating to <span className="font-semibold">{codeToBookmark[selectedSite].title}</span>
                                    </h3>
                                </div>
                                <div className="relative p-6 flex-auto bg-slate-300">
                                    <img src="https://tina.io/img/rico-replacement.jpg"></img>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

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
