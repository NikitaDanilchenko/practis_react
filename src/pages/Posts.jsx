import React, { useEffect, useState } from "react";
import MyButton from "../components/UI/button/MyButton";
import Loader from "../components/UI/Loader/Loader";
import Pagination from "../components/UI/pagination/Pagination";
import MyModal from "../components/UI/MyModal/MyModal";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import PostList from "../components/PostList";
import PostService from "../API/PostService";
import { getPagesCount } from "../utils/pages";
import { useFetching } from "../hooks/useFetching";
import {usePosts} from "../hooks/usePosts";



function Posts() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: "", query: "" });
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const sortedAndSearchPosts = usePosts(posts, filter.sort, filter.query);


  const [fetchPosts, isPostsLoading, postError] = useFetching( async (limit, page) => {
    const response = await PostService.getAll(limit, page);
    setPosts(response.data);
    const totalCount = response.headers['x-total-count']
    setTotalPages(getPagesCount(totalCount, limit))
  })

console.log(totalPages)

  useEffect(() => {
    fetchPosts(limit, page)
  }, [])

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };


  // Получаем post из дочернего компонента
  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  const changePage = (page) => {
    setPage(page);
    fetchPosts(limit, page)
  }

  return (
    <div className="App">
    <MyButton onClick={fetchPosts}>Get Post</MyButton>
      <MyButton style={{ marginTop: 30 }} onClick={() => setModal(true)}>
        Создать пользователя
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <hr style={{ margin: "15px 0" }} />
      <PostFilter filter={filter} setFilter={setFilter} />
      {/* {sortedAndSearchPosts.length !== 0 ? ( */}
      {postError && 
      <h1>Произошла ошибка ${postError}</h1>}
      {isPostsLoading
      ? <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}> 
        <Loader/>
      </div>
      : <PostList
      remove={removePost}
      posts={sortedAndSearchPosts}
      title="Посты про JS"
    />
      }
      <Pagination page={page} changePage={changePage} totalPages={totalPages}></Pagination>
      
      {/* ) : ( */}
      {/* <h1 style={{ textAlign: "center" }}>Посты не найдены!</h1> */}
      {/* )} */}

      {/* <PostList posts={posts2} title="Посты про Python" /> */}
    </div>
  );
}

export default Posts;
