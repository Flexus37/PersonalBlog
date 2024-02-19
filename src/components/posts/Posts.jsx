import { useEffect, useState } from 'react';
import { useGetAllContentQuery, useDeleteContentMutation, useDeleteContentFilesMutation} from '../../services/api/apiSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { getDocCount } from '../../services/firebase/FirestoreService';
import { useSelector } from 'react-redux'

import './posts.scss';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import EmptyMessage from '../emptyMessage/EmptyMessage';

const Posts = ({pageId}) => {

    // const [deletingPostId, setDeletingPostId] = useState('');
    const [isAnimationComplete, setIsAnimationComplete] = useState(true);
    const [postsLimit, setPostsLimit] = useState(10);
    const [docCount, setDocCount] = useState(null);
    const [postEnded, setPostEnded] = useState(false);
    const [isUserOwnPage, setIsUserOwnPage] = useState(false);
    const [showEmptyMessage, setShowEmptyMessage] = useState(true);

    const {userId} = useSelector(state => state.userInfo);

    const {
        data: posts = [],
        isLoading: isDataLoading,
        isError: isDataError
    } = useGetAllContentQuery({userId: pageId, contentType: 'posts', contentLimit: postsLimit});

    useEffect(() => {
        if (pageId === userId) {
            setIsUserOwnPage(true);
        }
    }, [])

    useEffect(() => {
        async function fetchData() {
            const count = await getDocCount({userId: pageId, contentType: 'posts'});
            setDocCount(count);
        }

        fetchData();

        if (posts.length === docCount) {
            setPostEnded(true);
        } else {
            setPostEnded(false);
        }

    }, [isAnimationComplete, docCount]);


    // useEffect(() => {
    //     console.log(posts.length, docCount);

    // }, [docCount])

    const [
        deleteContent,
        {
            isLoading: isDeleting,
            isError: isDeletingError,
            isSuccess: isDeletingSuccess
        }
    ] = useDeleteContentMutation();

    const [
        deleteContentFiles,
        {
            isLoading: isDeletingImages,
            isError: isDeletingImagesError
        }
    ] = useDeleteContentFilesMutation();

    const onHandleDelete = (postId, imageIdArr) => {
        if (isUserOwnPage) {
            // setDeletingPostId(postId);
            deleteContent({userId, contentType: 'posts', id: postId});
            deleteContentFiles({userId, contentType: 'posts', contentIdArr: imageIdArr});

            // setDeletingPostId('');
            setIsAnimationComplete(true);
        }
    }

    const onHandleLoadMore = () => {
        if (postsLimit + 10 >= docCount) {
            setPostsLimit(docCount);
            setPostEnded(true);
            return;
        }

        setPostEnded(false);
        setPostsLimit(limit => limit + 10);

    }


    const renderPostImages = (arr) => {
        const arrLength = arr.length;
        const items = arr.map(item => {
            return (
            <img
                key={item.imageId}
                className="post__preview"
                id={item.imageId}
                src={item.imageUrl}
                alt="Картинка поста" />
        )
        })

        return (
            <div className={`post__header post__header--preview post__header--preview--${arrLength}`}>
                {items}
            </div>
        )
    }

    const renderPosts = (arr) => {
        if (isDataLoading) {
            return <Spinner lottieStyle={{'height': '500px'}} />
        }

        if (isDataError) {
            return <ErrorMessage/>
        }

        if (arr.length === 0 && isAnimationComplete) {
            return <EmptyMessage lottieStyle={{'height': '550px'}} />;
        }

        const items = arr.map(item => {
            const isPostImages = item.contentImages.length > 0;
            // const imageIdArr = isPostImages ?
            //     item.contentImages.map(item => {
            //         return item.imageId;
            //     })
            //     : [];

            const tags = item.tags.map(tag => {
                return tag.label;
            }).join(', ');

            // const isPostDeleting = item.id === deletingPostId && (isDeleting || isDeletingImages)

            if (item.article === '') {
                return (
                    <motion.div
                        className="post"
                        key={item.id}
                        initial={{opacity: 0, scale: .7}}
                        animate={{opacity: 1, scale: 1}}
                        exit={{opacity: 0, scale: .6}}
                        transition={{ease: "easeInOut", duration: .6}}
                        onAnimationStart={() => setIsAnimationComplete(false)}
                        onAnimationComplete={() => setIsAnimationComplete(true)} >
                        {
                            // isPostDeleting ? <Spinner/> :
                            <>
                                {
                                    isUserOwnPage ?
                                    <i onClick={() => onHandleDelete(item.id, item.contentImages)} className="fa-solid fa-xmark"></i> :
                                    null
                                }
                                {
                                    isPostImages ?
                                    renderPostImages(item.contentImages)
                                    : null
                                }
                                <div className="post__content">
                                    <p className="post__description">{item.description}</p>
                                </div>
                                <div className="post__footer">
                                    <ul className="post__data">
                                        <li className="post__data-item">
                                            <time dateTime="2020-06-21">{item.time}</time>
                                        </li>
                                    </ul>
                                </div>
                            </>
                        }
                    </motion.div>
                )
            } else {
                return (
                    <motion.article
                        key={item.id}
                        className="post"
                        initial={{opacity: 0, scale: .6}}
                        animate={{opacity: 1, scale: 1}}
                        exit={{opacity: 0, scale: .6}}
                        transition={{ease: "easeInOut", duration: .3}}
                        onAnimationStart={() => setIsAnimationComplete(false)}
                        onAnimationComplete={() => {
                            setIsAnimationComplete(true);
                            }}>
                        {
                            // isPostDeleting ? <Spinner/> :
                            <>
                                {
                                    isUserOwnPage ?
                                    <i onClick={() => onHandleDelete(item.id, item.contentImages)} className="fa-solid fa-xmark"></i> :
                                    null
                                }
                                {
                                    isPostImages ?
                                    renderPostImages(item.contentImages) :
                                    null
                                }
                                <div className="post__content">
                                    <h2 className="post__title">
                                        <a href="#">{item.article}</a>
                                    </h2>
                                    <p className="post__description">{item.description}</p>
                                </div>
                                <div className="post__footer">
                                    <ul className="post__data">
                                        <li className="post__data-item">
                                            <time dateTime="2020-06-21">{item.time}</time>
                                        </li>
                                        <li className="post__data-item">
                                            <a href="#">{tags}</a>
                                        </li>
                                    </ul>

                                    <a className="post__read" href="#">читать</a>
                                </div>
                            </>
                        }
                    </motion.article>
                )
            }
        })

        if (!postEnded && posts.length > 0) {
            items.push(
                (
                    <motion.button
                        key='load-more'
                        className='post__load-more'
                        // style={{'display': !postEnded && posts.length > 0 ? 'block' : 'none'}}
                        disabled={isDataLoading}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        initial={{scale: 0.8, opacity: 0}}
                        animate={{scale: 1, opacity: 1}}
                        exit={{scale: 0.7, opacity: 0}}
                        onClick={() => onHandleLoadMore()} >
                        Загрузить ещё
                    </motion.button>
                )
            )
        }

        return items;
    }

    const elements = renderPosts(posts);

    return (
        <AnimatePresence>
            {elements}
        </AnimatePresence>
    );
}

export default Posts;