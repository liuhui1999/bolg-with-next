import { format, parseISO } from 'date-fns';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import React from 'react';
import Layout from '../components/Layout';
import { getAllPosts } from '../lib/api';
import { PostType } from '../types/post';
import People from '@/components/People';
import copy from "clipboard-copy";

import { MaterialSymbolsAlternateEmail, MaterialSymbolsSettingsPhoneSharp, MdiGithubFace, RiWechat2Fill } from '../components/icons';
type IndexProps = {
  posts: PostType[];
};

export const Index = ({ posts }: IndexProps): JSX.Element => {
  const ContactWay = [
    { key: 'Email', text: '邮箱', value: '1003785694@qq.com', Icon: () => { return <MaterialSymbolsAlternateEmail></MaterialSymbolsAlternateEmail> } },
    { key: 'phone', text: '手机号', value: '13685328265', Icon: () => { return <MaterialSymbolsSettingsPhoneSharp></MaterialSymbolsSettingsPhoneSharp> } },
    { key: 'Github', text: 'Github', value: 'https://github.com/liuhui1999', Icon: () => { return <MdiGithubFace></MdiGithubFace> } },
    { key: 'Wechat', text: '微信', value: 'liuhui19991206', Icon: () => { return <RiWechat2Fill></RiWechat2Fill> } },
  ]
  // 点击复制触发的函数
  const handleCopy = (item: any) => {
    if (!item.value) return;
    if (item.key === 'Wechat' || item.key === 'phone' || item.key === 'Email') {
      copy(item.value)
    } else {
      window.open(item.value)
    }
  };
  return (
    <>
      <Layout>
        <div className=" relative">
          <div className='absolute   flex justify-center flex-col animate-slide-up   z-50'>
            <h1 className='mt-9'>Alby</h1>
            <span className='mt-9 w-3/4'>
              Hey, I am Alby, a Programmer workers who graduated in 2021.Working in QingDao.
            </span>

            <span className='mt-9 w-3/4'>
              I have two good work experiences. The first job was in an online learning and education platform Sass Web from March 2021 to March 2022, where I worked as a developer and communicated with customers to collect requirements; the second job was from April 2023 to now, I worked as a developer to provide software for internal employees. For example, the official website <a className='font-bold underline' href='http://www.qdhezheng.cn'>(www.qdhezheng.cn)</a>, and have travel development experience
            </span>
            <span className='mt-9 w-3/4'>
              A developer who is in the growth stage, loves to learn, likes to study cutting-edge technology, and dares to meet difficulties
            </span>
            <span className='mt-4 w-3/4'>Contact me</span>
            <div className='flex'>
              {
                ContactWay?.map((item, index) => {
                  return (
                    <div key={index} onClick={() => handleCopy(item)} className='text-lg flex justify-center items-center mt-4 mr-4 flex-row underline cursor-pointer hover:font-bold'>
                      <div className='flex items-center'>
                        <item.Icon></item.Icon>
                      </div>
                      <div className='flex flex-col ml-2'>
                        <span>{item.key}</span>
                      </div>
                    </div>
                  )
                })
              }
            </div >
          </div >
        </div>


        {/* {posts.map((post) => (
        <article key={post.slug} className="mt-12">
          <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
            {format(parseISO(post.date as string), 'MMMM dd, yyyy')}
          </p>
          <h1 className="mb-2 text-xl">
            <Link as={`/posts/${post.slug}`} href={`/posts/[slug]`}>
              <a className="text-gray-900 dark:text-white dark:hover:text-blue-400">
                {post.title}
              </a>
            </Link>
          </h1>
          <p className="mb-3">{post.description}</p>
          <p>
            <Link as={`/posts/${post.slug}`} href={`/posts/[slug]`}>
              <a>Read More</a>
            </Link>
          </p>
        </article>
      ))} */}
      </Layout>
      <People></People>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPosts(['date', 'description', 'slug', 'title']);

  return {
    props: { posts },
  };
};

export default Index;
