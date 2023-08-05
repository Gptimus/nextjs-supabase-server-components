import supabase from "@/app/utils/supabase";
import { notFound } from "next/navigation";
import RealTimePost from "./realtime-post";

export const revalidate = 0;

const Post = async ({ params: { id } }: { params: { id: string } }) => {
  const { data: post } = await supabase
    .from("posts")
    .select()
    .match({ id })
    .single();

  if (!post) {
    notFound();
  }
  return <RealTimePost serverPost={post} />;
};

export default Post;
