import React, { useRef, useState } from "react";
// import Counter from "./components/counter";
// import ClassCounter from "./components/ClassCounter";
import "./styles/App.css";
// import PostItem from "./components/PostItem";
import PostList from "./components/PostList";
// import MyButton from "./components/UI/button/MyButton";
// import MyInput from "./components/UI/input/MyInput";
import PostForm from "./components/PostForm";
import MySelect from "./components/UI/select/MySelect";
function App() {
  // const [likes, setLikes] = useState(5);
  // const [value, setValue] = useState("ТЕКСТ В ИНПУТЕ");
  const [posts, setPosts] = useState([
    { id: 1, title: "aa", body: "ff" },
    { id: 2, title: "uu 2", body: "ss" },
    { id: 3, title: "dd 3", body: "dd" },
  ]);
  // const [posts2, setPosts2] = useState([
  //   { id: 1, title: "Python", body: "description" },
  //   { id: 2, title: "Python 2", body: "description" },
  //   { id: 3, title: "Python 3", body: "description" },
  // ]);

  // это состояние постов убираем после переноса формы в PostForm
  // const [post, setPost] = useState({ title: "", body: "" });

  // const bodyInputRef = useRef();
  // const addNewPost = (e) => {
  //   e.preventDefault();
  //   console.log(title);
  //   console.log(bodyInputRef.current.value);
  // };

  // const addNewPost = (e) => {
  //   e.preventDefault();
  //   setPosts([...posts, { ...post, id: Date.now() }]);
  //   setPost({ title: "", body: "" });
  // };
  const [selectedSort, setSelectedSort] = useState("");
  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
  };
  // Получаем post из дочернего компонента
  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  const sortPosts = (sort) => {
    setSelectedSort(sort);
    setPosts([...posts].sort((a, b) => a[sort].localeCompare(b[sort])));
  };

  return (
    <div className="App">
      {/* Добавляем форму в файл PostForm */}
      {/* <form> */}
      {/* {Управляемый компонент} */}
      {/* <MyInput
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
        /> */}

      {/* Обычный интут */}
      {/* <input ref={bodyInputRef} type="text"/>  */}

      {/* Неуправляемый/Неконтролируемый компонент */}
      {/* <MyInput ref={bodyInputRef} type="text" placeholder="Описание поста" /> */}
      {/* <MyButton onClick={addNewPost}>Создать пост</MyButton>
      </form> */}
      {/* После добавления формы в PostForm указываем тег */}
      <PostForm create={createPost} />
      <hr style={{ margin: "15px 0" }} />
      <div>
        <MySelect
          value={selectedSort}
          onChange={sortPosts}
          defaultValue="Сортировка"
          options={[
            { value: "title", name: "По названию" },
            { value: "body", name: "По описанию" },
          ]}
        />
      </div>
      {posts.length !== 0 ? (
        <PostList remove={removePost} posts={posts} title="Посты про JS" />
      ) : (
        <h1 style={{ textAlign: "center" }}>Посты не найдены!</h1>
      )}

      {/* <PostList posts={posts2} title="Посты про Python" /> */}
    </div>
  );
}

export default App;
