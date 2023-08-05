import supabase from "@/app/utils/supabase";
import RealTimePosts from "./realtime-posts";

export const revalidate = 0;

const Posts = async () => {
  const { data: posts, error } = await supabase.from("posts").select();

  return <RealTimePosts serverPosts={posts ?? []} />;
};

export default Posts;
