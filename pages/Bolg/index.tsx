import Layout from "../../components/Layout"
import { format, parseISO } from 'date-fns';
import { PostType } from '../../types/post';
import Link from "next/link";
import { GetStaticProps } from "next";
import { getAllPosts } from "../../lib/api";
import { MaterialSymbolsArrowRightAltRounded } from "../../components/icons";
type IndexProps = {
    posts: PostType[];
};
const Bolg: React.FC<IndexProps> = ({ posts }: IndexProps) => {
    return (
        <Layout
            customMeta={{
                title: 'About - alby',
            }}
        >
            {posts.map((post) => (
                <article key={post.slug} className="mt-12">
                    <p className="mb-1 text-sm text-gray-700 dark:text-gray-400">
                        {format(parseISO(post.date as string), 'MMMM dd, yyyy')}
                    </p>
                    <h1 className="mb-2 text-xl">
                        <Link as={`/posts/${post.slug}`} href={`/posts/[slug]`}>
                            <a className=" text-blue-600 hover:text-blue-400">
                                {post.title}
                            </a>
                        </Link>
                    </h1>
                    <p className="mb-3">{post.description}</p>
                    <p>
                        <Link as={`/posts/${post.slug}`} href={`/posts/[slug]`}>
                            <div className="flex items-center  cursor-pointer text-blue-600 hover:text-blue-400">
                                <a className=" mr-2">Read More</a>
                                <MaterialSymbolsArrowRightAltRounded width={'2rem'} height={'2rem'}></MaterialSymbolsArrowRightAltRounded>
                            </div>
                        </Link>
                    </p>
                </article>
            ))}
        </Layout>
    )
}
export const getStaticProps: GetStaticProps = async () => {
    const posts = getAllPosts(['date', 'description', 'slug', 'title']);

    return {
        props: { posts },
    };
};
export default Bolg
