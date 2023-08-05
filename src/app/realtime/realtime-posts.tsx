"use client";

import { useEffect, useState } from "react";
import supabase from "@/app/utils/supabase";

type Post = {
  id: string;
  created_at: string;
  title: string;
};

const RealTimePosts = ({ serverPosts }: { serverPosts: Post[] }) => {
  const [posts, setPosts] = useState(serverPosts);
  useEffect(() => {
    const channel = supabase
      .channel("realtime.posts")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "posts",
        },
        (payload) => {
          setPosts([...posts, payload.new as Post]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [posts, setPosts]);
  return <pre>{JSON.stringify(posts, null, 2)}</pre>;
};

export default RealTimePosts;
