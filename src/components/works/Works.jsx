import { useCallback, useEffect, useState } from 'react';
import { useGetAllContentQuery, useDeleteContentMutation, useDeleteContentFilesMutation} from '../../services/api/apiSlice';
import { skipToken } from '@reduxjs/toolkit/query/react';
import { motion, AnimatePresence } from 'framer-motion';
import { getDocCount } from '../../services/firebase/FirestoreService';
import { useSelector } from 'react-redux'

import AddContent from '../addContent/AddContent';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import EmptyMessage from '../emptyMessage/EmptyMessage';

import './work.scss';

const Works = () => {
    const [isAnimationComplete, setIsAnimationComplete] = useState(true);
    const [worksLimit, setWorksLimit] = useState(10);
    const [docCount, setDocCount] = useState(null);
    const [worksEnded, setWorksEnded] = useState(false);
    const [showEmptyMessage, setShowEmptyMessage] = useState(true);

    const {currentPageId} = useSelector(state => state.userInfo);

    const {
        data: works = [],
        isLoading: isDataLoading,
        isError: isDataError
    } = useGetAllContentQuery(
        currentPageId ? {
            userId: currentPageId,
            contentType: 'works',
            contentLimit: worksLimit
        } : skipToken
    );

    // useEffect(() => {
    //     console.log(works);
    // }, [works])

    useEffect(() => {
        async function fetchData() {
            const count = await getDocCount({userId: currentPageId, contentType: 'works'});
            setDocCount(count);
        }

        fetchData();

        if (works.length === docCount) {
            setWorksEnded(true);
        } else {
            setWorksEnded(false);
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

    const onHandleDelete = (workId, imageIdArr) => {
        // setDeletingPostId(postId);
        deleteContent({userId: currentPageId, contentType: 'works', id: workId});
        deleteContentFiles({userId: currentPageId, contentType: 'works', contentIdArr: imageIdArr});

        // setDeletingPostId('');
        setIsAnimationComplete(true);
    }

    const onHandleLoadMore = () => {
        if (worksLimit + 10 >= docCount) {
            setWorksLimit(docCount);
            setWorksEnded(true);
            return;
        }

        setWorksEnded(false);
        setWorksLimit(limit => limit + 10);

    }

    const renderWorks = (arr) => {
        if (isDataLoading) {
            return <Spinner/>
        }

        if (isDataError) {
            return <ErrorMessage/>
        }

        if (arr.length === 0 && isAnimationComplete) {
            return <EmptyMessage type='works' />;
        }

        const items = arr.map(item => {
            return (
                <motion.article
                    key={item.id}
                    className="work"
                    initial={{opacity: 0, scale: .7}}
                    animate={{opacity: 1, scale: 1}}
                    exit={{opacity: 0, scale: .6}}
                    transition={{ease: "easeInOut", duration: .6}}
                    onAnimationStart={() => setIsAnimationComplete(false)}
                    onAnimationComplete={() => setIsAnimationComplete(true)}
                >
                    <i onClick={() => onHandleDelete(item.id, item.contentImages)} className="fa-solid fa-xmark"></i>
                    {
                        item.contentImages[0] ?
                        (
                            <div className="work__preview">
                                <img src={item.contentImages[0]?.imageUrl} alt="" />
                            </div>
                        ) :
                        null
                    }
                    {/* <div className="work__preview">
                        <img src={item.contentImages[0]?.imageUrl} alt="" />
                    </div> */}
                    <div
                        className="work__content"
                        style={!item.contentImages[0] ? {'width': '100%', 'maxWidth': 'none'} : null}
                    >
                        <h2 className="work__title">
                            <a href="#" target="_blank">{item.article}</a>
                        </h2>
                        <div className="work__description">
                            <p>{item.description}</p>
                        </div>
                        <ul className="tags">
                            {
                                item.tags.map(tag => {
                                    return (
                                        <li
                                        key={tag.value}
                                        className="tags__item"
                                        >
                                            {tag.label}
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        <div
                            className="work__footer"
                            style={!item.contentImages[0] ? {'textAlign': 'left'} : null}
                        >
                            <a className="btn btn--black btn--rounded btn--small" style={{'marginRight': '10px'}} href={item.gitHubLink} target="_blank">
                                <i className="fa-brands fa-github"></i> GitHub</a>
                            <a className="btn btn--blue btn--rounded btn--small" href={item.link} target="_blank">Перейти на сайт</a>
                        </div>
                    </div>
                </motion.article>
            )
        })

        if (!worksEnded && works.length > 0) {
            items.push(
                (
                    <motion.button
                        key='load-more'
                        className='work__load-more'
                        // style={{'display': !worksEnded && posts.length > 0 ? 'block' : 'none'}}
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

    return (
        <>
           <h1 className="page__title">Мои работы</h1>

           <AddContent type='works' />
            <AnimatePresence>
                {renderWorks(works)}
            </AnimatePresence>
        </>
    );
}

export default Works;