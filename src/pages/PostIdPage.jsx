import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {useFetching} from "../hooks/useFetching"
import PostService from "../API/PostService";
import Loader from "../components/UI/Loader/Loader"
const PostIdPage = () => {
    const params = useParams();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [fetchPostById, isLoading, error] = useFetching( async (id) => {
        const response = await PostService.getById(id)
        setPost(response.data)
    })
    const [feychComments, isComLoading, comError] = useFetching( async (id) => {
        const response = await PostService.getCommentsPostById(id)
        setComments(response.data)
    })
    useEffect (() => {
        fetchPostById(params.id)
        feychComments(params.id)
    }, [])

    console.log(params);
    return (
        <div>
            <h1>Пользователь попал на страницу поста с ID = {params.id}</h1>
            {isLoading
                ? <Loader/>
            : <div> {post.id}. {post.title}</div>
            }
            <h1>
                Комментарии
            </h1>
            {isComLoading
            ? <Loader/>
            : <div>
                {comments.map( comm =>
                    <div style={{marginTop: 15}}>
                        <h5>
                            {comm.email}
                        </h5>
                        <div>
                            {comm.body}
                        </div>
                    </div>
                    )}
                </div>
        }
        </div>
    )
}

export default PostIdPage;