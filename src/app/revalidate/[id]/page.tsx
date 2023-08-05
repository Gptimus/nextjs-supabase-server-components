import { notFound } from "next/navigation";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const revalidate = 60;

export async function generatedStaticParams() {
  const supabase = createServerComponentClient({ cookies });
  const { data: posts } = await supabase.from("posts").select("id");

  return posts ?? [];
}

const Post = async ({ params: { id } }: { params: { id: string } }) => {
  const supabase = createServerComponentClient({ cookies });
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
