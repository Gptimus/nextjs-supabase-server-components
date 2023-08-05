import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const Posts = async () => {
  const supabase = createServerComponentClient({ cookies });
  const { data: posts, error } = await supabase.from("posts").select();
  return (
    <div>
      <pre>{JSON.stringify(posts, null, 2)}</pre>
    </div>
  );
};

export default Posts;
