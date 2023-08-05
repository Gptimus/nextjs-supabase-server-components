import supabase from "@/app/utils/supabase";

export const revalidate = 60;

const Posts = async () => {
  const { data: posts, error } = await supabase.from("posts").select();
  return (
    <div>
      <pre>{JSON.stringify(posts, null, 2)}</pre>
    </div>
  );
};

export default Posts;
