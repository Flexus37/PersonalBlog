import { useState, useMemo, useRef, useEffect} from 'react';
import { useCreateContentMutation } from '../../services/api/apiSlice';
import { Timestamp } from 'firebase/firestore';
import { resizeFile } from '../../services/resize/resizeFile';
import {ref as storageRef, uploadString, getDownloadURL} from 'firebase/storage';
import { storage } from '../../services/firebase/FirestoreConfig';
import { v4 as uuidv4 } from 'uuid';
import { motion, AnimatePresence} from 'framer-motion';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { autoresizeTextarea } from '../../services/autoResizeTextarea';
import { useSelector } from 'react-redux'

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './addContent.scss';

import sendImg from '../../resources/img/add-content/add-submit.svg';
import addFileImg from '../../resources/img/add-content/add-image.svg';

const animatedComponents = makeAnimated();

const tagsOptions = [
    { value: 'life', label: 'жизнь' },
    { value: 'web', label: 'cоздание сайтов' },
    { value: 'development', label: 'разработка' },
    { value: 'chill', label: 'отдых' }
];

const tagsWorkOptions = [
    { value: 'web', label: 'Web' },
    { value: 'js', label: 'JavaScript' },
    { value: 'ts', label: 'TypeScript' },
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' },
    { value: 'scss', label: 'Sass' },
    { value: 'react', label: 'React' },
    { value: 'redux', label: 'Redux' },
    { value: 'rtkquery', label: 'RTK Query' },
    { value: 'nextjs', label: 'NextJS' },
    { value: 'firebase', label: 'Firebase' },
    { value: 'reduxtoolkit', label: 'Redux Toolkit' },
    { value: 'nodejs', label: 'NodeJS' },
    { value: 'angular', label: 'Angular' },
];

const selectStyles = {
    control: (styles, state) => ({
        ...styles,
        backgroundColor: '#202020',
        border: state.isFocused ? '2px solid #3137C9' : '2px solid transparent',
        boxShadow: state.isFocused ? 0 : 0,
        ':hover': {
            borderColor: '#3137C9'
        }
    }),
    input: (styles) => ({
        ...styles,
        color: '#fff'
    }),
    menu: (styles) => ({
        ...styles,
        backgroundColor: '#202020',
    }),
    option: (styles, { isDisabled, isFocused, isSelected }) => ({
        ...styles,
        cursor: 'pointer',
        backgroundColor: isDisabled
            ? undefined
            : isSelected
            ? '#3137C9'
            : isFocused
            ? '#3137C9'
            : undefined,
        ':active': {
            ...styles[':active'],
            backgroundColor: isSelected ? '#3137C9' : '#3137C9'
        }
    }),
    multiValue: (styles) => ({
        ...styles,
        backgroundColor: '#121212',
    }),
    multiValueLabel: (styles) => ({
        ...styles,
        color: '#fff'
    }),
    multiValueRemove: (styles) => ({
        ...styles,
        cursor: 'pointer',
        color: 'fff',
        ':hover': {
          backgroundColor: '#3137C9',
          color: 'white',
        },
    }),
}

// props:
// type

const AddContent = (props) => {
    const [description, setDescription] = useState('');
    const [article, setArticle] = useState('');
    const [link, setLink] = useState('');
    const [gitHubLink, setGitHubLink] = useState('');
    const [tags, setTags] = useState([]);
    const [imageArr, setImageArr] = useState([]);
    const [isPreLoading, setIsPreLoading] = useState(false);

    const {userId} = useSelector(state => state.userInfo);

    const [createContent, {isLoading, isError}] = useCreateContentMutation();

    const textareaRefs = useRef([])

    useEffect(() => {
        autoresizeTextarea(textareaRefs, '27px');
    }, [])

    autoresizeTextarea(textareaRefs, '27px');

    const onHandleSubmit = async (e) => {
        e.preventDefault();

        setIsPreLoading(true);

        if ((!article && !description && imageArr.length === 0) ||
            (props.type === 'stories' && (!article || imageArr.length === 0))) {
            return;
        }

        let contentImages = [];

        if (imageArr.length > 0) {
            contentImages = await Promise.all(
                imageArr.map(async item => {

                    const snapshotImg = await uploadString(
                        storageRef(storage, `users/${userId}/${props.type}/${item.imageId}.jpg`),
                        item.imageFile,
                        'data_url'
                    );
                    const imageUrl = await getDownloadURL(snapshotImg.ref);

                    return {
                        imageId: item.imageId,
                        imageUrl
                    }
                })
            );
        }

        let newContent = {};

        if (props.type === 'stories') {
            newContent = {
                article,
                contentImages,
                time: Timestamp.fromDate(new Date())
            }
        }
        else if (props.type === 'works') {
            newContent = {
                article,
                description,
                link,
                gitHubLink,
                tags,
                contentImages,
                time: Timestamp.fromDate(new Date())
            }
        }
        else {
            newContent = {
                article,
                description,
                tags,
                contentImages,
                time: Timestamp.fromDate(new Date())
            }
        }

        setIsPreLoading(false);
        createContent({userId, contentType: props.type, content: newContent});

        setDescription('');
        setArticle('');
        setLink('');
        setGitHubLink('');
        setImageArr([]);
    }

    const handleImageLoaded = async (e) => {

        let newImageArr = imageArr.map(obj => ({...obj}));

        const files = await Promise.all(
            Object.values(e.target.files).map(async (file, i) => {
                if (i >= 9 ) {
                    return;
                }

                return await resizeFile(file, 600, 600, 80, 224, 112);
            })
        );

        if (newImageArr.length + files.length > 10) {
            newImageArr = newImageArr.map((item, i) => {
                if (i < files.length) {
                    return {
                        imageId: uuidv4(),
                        imageFile: files[i]
                    };
                }
                return {
                    imageId: uuidv4(),
                    imageFile: item
                };
            })
        } else {
            files.forEach(item => {
                newImageArr.push(
                    {
                        imageId: uuidv4(),
                        imageFile: item
                    }
                );
            });
        }



        setImageArr(newImageArr);
    }

    const deleteImagePreview = (id) => {
        const newImgArr = imageArr.filter(item => {
            if (id !== item.imageId) {
                return item;
            }
        })

        setImageArr(newImgArr);
    }

    const renderImagePreview = (arr = []) => {
        if (arr.length === 0) {
            return null;
        } else if (props.type === 'works') {
            return (
                <motion.div
                    key={arr[0].imageId}
                    className="add-content__image-preview-item story"
                        initial={{opacity: 0, scale: .7}}
                        animate={{opacity: 1, scale: 1}}
                        exit={{opacity: 0, scale: .6}}
                        transition={{ease: "easeInOut", duration: .3}}
                    >
                    <i onClick={() => deleteImagePreview(arr[0].imageId)} className="fa-solid fa-xmark"></i>
                    <img src={arr[0].imageFile} alt="Загруженная картинка" />
                </motion.div>
            )
        }

       return arr.map(item => {
            return (
                <motion.div
                    key={item.imageId}
                    className="add-content__image-preview-item"
                        initial={{opacity: 0, scale: .7}}
                        animate={{opacity: 1, scale: 1}}
                        exit={{opacity: 0, scale: .6}}
                        transition={{ease: "easeInOut", duration: .3}}
                    >
                    <i onClick={() => deleteImagePreview(item.imageId)} className="fa-solid fa-xmark"></i>
                    <img src={item.imageFile} alt="Загруженная картинка" />
                </motion.div>
            )
        })

    };

    const loadedImagesPreview = useMemo(() => {
        return renderImagePreview(imageArr);
    }, [imageArr]);

    return (
        <motion.div
            className={props.type === 'stories' ? 'add-content add-content-story' : 'add-content'}
            initial={{opacity: 0, scale: .7}}
            animate={{opacity: 1, scale: 1}}
            exit={{opacity: 0, scale: .6}}
            transition={{ease: "easeInOut", duration: .6}}
        >
            {
                isLoading || isPreLoading ?
                    <Spinner lottiestyle={{
                        'width': '300px',
                        'height': '100px',
                        'margin': '0 auto',
                        'display': 'block'
                    }} />
                : isError ?
                <ErrorMessage/> : (
                    <>
                        <form className="add-content__form" action="/" method="POST" onSubmit={onHandleSubmit}>
                            <div className='add-content__areas'>
                                <textarea
                                    className="add-content__article"
                                    name="post-article"
                                    ref={el => (textareaRefs.current[0] = el)}
                                    placeholder="Заголовок"
                                    data-autoresize
                                    value={article}
                                    onChange={(e) => setArticle(e.target.value)}
                                    onInput={autoresizeTextarea} >
                                </textarea>
                                {
                                    props.type !== 'stories' ?
                                    (
                                        <textarea
                                            className="add-content__textarea"
                                            name="post-description"
                                            ref={el => (textareaRefs.current[1] = el)}
                                            placeholder="Описание"
                                            data-autoresize
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            onInput={autoresizeTextarea}>
                                        </textarea>
                                    )
                                    : null
                                }
                                {
                                   props.type === 'works' ?
                                   (
                                       <textarea
                                           className="add-content__textarea"
                                           name="work-link"
                                           ref={el => (textareaRefs.current[2] = el)}
                                           placeholder="Ссылка на сайт"
                                           data-autoresize
                                           value={link}
                                           onChange={(e) => setLink(e.target.value)}
                                           onInput={autoresizeTextarea}>
                                       </textarea>
                                   )
                                   : null
                                }
                                {
                                   props.type === 'works' ?
                                   (
                                       <textarea
                                           className="add-content__textarea"
                                           name="work-githublink"
                                           ref={el => (textareaRefs.current[3] = el)}
                                           placeholder="Ссылка на GitHub"
                                           data-autoresize
                                           value={gitHubLink}
                                           onChange={(e) => setGitHubLink(e.target.value)}
                                           onInput={autoresizeTextarea}>
                                       </textarea>
                                   )
                                   : null
                                }
                                {
                                    props.type !== 'stories' ?
                                    (
                                        <Select
                                            className='add-post__tags'
                                            placeholder='Выберите тег'
                                            closeMenuOnSelect={false}
                                            components={animatedComponents}
                                            isMulti
                                            options={props.type === 'works' ? tagsWorkOptions : tagsOptions}
                                            styles={selectStyles}
                                            onChange={(tags) => setTags(tags)}
                                        />
                                    )
                                    : null
                                }
                                <div
                                    className={
                                        props.type === 'works' ? "add-content__image-preview add-content__image-preview-works" :
                                        "add-content__image-preview"
                                    }
                                >
                                    <AnimatePresence>
                                        {loadedImagesPreview}
                                    </AnimatePresence>
                                </div>
                            </div>
                            <div className="add-content__form-actions">
                                <label className="add-content__file" htmlFor={`add-content-${props.type}-file`}>
                                    <img src={addFileImg} alt="" />
                                    {
                                        props.type === 'works' ?
                                        (
                                            <input
                                                onChange={handleImageLoaded}
                                                name='file'
                                                type='file'
                                                accept='image/*'
                                                id={`add-content-${props.type}-file`}
                                            />
                                        ) :
                                        (
                                            <input
                                                onChange={handleImageLoaded}
                                                name='file'
                                                type='file'
                                                multiple
                                                accept='image/*'
                                                id={`add-content-${props.type}-file`}
                                            />
                                        )
                                    }
                                </label>
                                <button className="add-content__send" type="submit">
                                    <img src={sendImg} alt="" />
                                </button>
                            </div>
                        </form>
                    </>
                )
            }
        </motion.div>
    );
}

export default AddContent;