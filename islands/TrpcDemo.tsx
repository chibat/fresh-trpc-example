import { useState } from "preact/hooks";

import { Button } from "../components/Button.tsx";
import { trpc } from "../trpc/client.ts";

export default function Counter() {
  const [helloResponse, setHelloResponse] = useState('');
  const [posts, setPosts] = useState<{ name: string }[]>([]);

  const fetchPosts = () => trpc.postGet.query().then(setPosts);

  return (
    <div>
      <Button onClick={() => {
        trpc.hello.query().then(setHelloResponse);
      }}>Hello</Button>

      {helloResponse}

      <hr />

      <Button onClick={() => {
        trpc.postCreate.mutate({ name: `Random post ${Math.random()}` }).then(fetchPosts);
      }}>Create Random Post</Button>

      <hr />

      <Button onClick={fetchPosts}>Get Posts</Button>

      <ul>
        {posts.map((post, i) => <li key={i}>{post.name}</li>)}
      </ul>

    </div>
  );
}
