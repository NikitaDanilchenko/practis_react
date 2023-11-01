import React, { useRef, useState } from "react";
// import Counter from "./components/counter";
// import ClassCounter from "./components/ClassCounter";
import "./styles/App.css";
// import PostItem from "./components/PostItem";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";
function App() {
  // const [likes, setLikes] = useState(5);
  // const [value, setValue] = useState("ТЕКСТ В ИНПУТЕ");
  const [posts, setPosts] = useState([
    { id: 1, title: "Javascript", body: "description" },
    { id: 2, title: "Javascript 2", body: "description" },
    { id: 3, title: "Javascript 3", body: "description" },
  ]);
  // const [posts2, setPosts2] = useState([
  //   { id: 1, title: "Python", body: "description" },
  //   { id: 2, title: "Python 2", body: "description" },
  //   { id: 3, title: "Python 3", body: "description" },
  // ]);

  const [post, setPost] = useState({ title: "", body: "" });

  // const bodyInputRef = useRef();
  // const addNewPost = (e) => {
  //   e.preventDefault();
  //   console.log(title);
  //   console.log(bodyInputRef.current.value);
  // };

  const addNewPost = (e) => {
    e.preventDefault();
    setPosts([...posts, { ...post, id: Date.now() }]);
    setPost({ title: "", body: "" });
  };

  return (
    <div className="App">
      <form>
        {/* {Управляемый компонент} */}
        <MyInput
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
          type="text"
          placeholder="Название поста"
        />
        <MyInput
          value={post.body}
          onChange={(e) => setPost({ ...post, body: e.target.value })}
          type="text"
          placeholder="Название поста"
        />

        {/* Обычный интут */}
        {/* <input ref={bodyInputRef} type="text"/>  */}

        {/* Неуправляемый/Неконтролируемый компонент */}
        {/* <MyInput ref={bodyInputRef} type="text" placeholder="Описание поста" /> */}
        <MyButton onClick={addNewPost}>Создать пост</MyButton>
      </form>
      <PostList posts={posts} title="Посты про JS" />
      {/* <PostList posts={posts2} title="Посты про Python" /> */}
    </div>
  );
}

export default App;
