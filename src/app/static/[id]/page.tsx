import { supabase } from "@/app/utils/supabase";
import { notFound } from "next/navigation";

export async function generatedStaticParams() {
  const { data: posts } = await supabase.from("posts").select("id");

  return posts ?? [];
}

const Post = async ({ params: { id } }: { params: { id: string } }) => {
  const { data: post } = await supabase
    .from("posts")
    .select()
    .match({ id })
    .single();

  if (!post) {
    notFound();
  }
  return (
    <div>
      <pre>{JSON.stringify(post, null, 2)}</pre>
    </div>
  );
};

export default Post;
