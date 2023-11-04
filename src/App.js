import React, { useEffect, useState } from "react";
// import Counter from "./components/counter";
// import ClassCounter from "./components/ClassCounter";
import "./styles/App.css";
// import PostItem from "./components/PostItem";
import PostList from "./components/PostList";
// import MyButton from "./components/UI/button/MyButton";
import PostForm from "./components/PostForm";
// import MySelect from "./components/UI/select/MySelect";
// import MyInput from "./components/UI/input/MyInput";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/MyModal/MyModal";
import MyButton from "./components/UI/button/MyButton";
import { usePosts } from "./hooks/usePosts";
// import axios from "axios";
import PostService from "./API/PostService";

function App() {
  // const [likes, setLikes] = useState(5);
  // const [value, setValue] = useState("ТЕКСТ В ИНПУТЕ");
  const [posts, setPosts] = useState([
    // { id: 1, title: "aa", body: "ff" },
    // { id: 2, title: "uu 2", body: "ss" },
    // { id: 3, title: "dd 3", body: "dd" },
  ]);

  const [filter, setFilter] = useState({ sort: "", query: "" });

  const [modal, setModal] = useState(false);

  const sortedAndSearchPosts = usePosts(posts, filter.sort, filter.query);

  const [isPostsLoading, setIsPostsLoading] = useState(false);

  useEffect(() => {
    fetchPosts()
  }, [])

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  async function fetchPosts() {
    setIsPostsLoading(true);
    setTimeout(async () => {
      const posts = await PostService.getAll();
      setPosts(posts);
      setIsPostsLoading(false);
    }, 1000)
  
};

  // Получаем post из дочернего компонента
  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  return (
    <div className="App">
    <button onClick={fetchPosts}>Get Post</button>
      <MyButton style={{ marginTop: 30 }} onClick={() => setModal(true)}>
        Создать пользователя
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <hr style={{ margin: "15px 0" }} />
      <PostFilter filter={filter} setFilter={setFilter} />
      {/* {sortedAndSearchPosts.length !== 0 ? ( */}
      
      {isPostsLoading
      ? <h1>Идет загрузк.....</h1>
      : <PostList
      remove={removePost}
      posts={sortedAndSearchPosts}
      title="Посты про JS"
    />
      }

      
      {/* ) : ( */}
      {/* <h1 style={{ textAlign: "center" }}>Посты не найдены!</h1> */}
      {/* )} */}

      {/* <PostList posts={posts2} title="Посты про Python" /> */}
    </div>
  );
}

export default App;
