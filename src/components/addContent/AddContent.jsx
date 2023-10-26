import { useState, useMemo, useRef} from 'react';
import { useCreateContentMutation } from '../../services/api/apiSlice';
import { Timestamp } from 'firebase/firestore';
import { resizeFile } from '../../services/resize/resizeFile';
import {ref as storageRef, uploadString, getDownloadURL} from 'firebase/storage';
import { storage } from '../../services/firebase/FirestoreConfig';
import { v4 as uuidv4 } from 'uuid';
import { motion, AnimatePresence} from 'framer-motion';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

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
    const [tags, setTags] = useState([]);
    const [imageArr, setImageArr] = useState([]);
    const [isPreLoading, setIsPreLoading] = useState(false);

    const [createContent, {isLoading, isError}] = useCreateContentMutation();

    const textareaRefs = useRef([])

    function autoresizeTextarea() {
        textareaRefs.current.forEach(textarea => {
            if (textarea) {
                textarea.style.height = 'auto';
                textarea.style.height = textarea.scrollHeight + 'px';
            }
        });
    }

    autoresizeTextarea();

    const onHandleSubmit = async (e) => {
        e.preventDefault();

        setIsPreLoading(true);

        if (!article && !description && imageArr.length === 0) {
            return;
        }

        let contentImages = [];

        if (imageArr.length > 0) {
            contentImages = await Promise.all(
                imageArr.map(async item => {

                    const snapshotImg = await uploadString(
                        storageRef(storage, `users/1/${props.type}/${item.imageId}.jpg`),
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

        const newContent = {
            article,
            description,
            tags,
            contentImages,
            time: Timestamp.fromDate(new Date())
        }

        setIsPreLoading(false);
        createContent({contentType: props.type, content: newContent});

        setDescription('');
        setArticle('');
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
        <div className="add-content">
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
                                        name="post-text"
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
                                props.type !== 'stories' ?
                                (
                                    <Select
                                        className='add-post__tags'
                                        placeholder='Выберите тег'
                                        closeMenuOnSelect={false}
                                        components={animatedComponents}
                                        isMulti
                                        options={tagsOptions}
                                        styles={selectStyles}
                                        onChange={(tags) => setTags(tags)}
                                    />
                                )
                                : null
                            }
                            <div className="add-content__image-preview">
                                <AnimatePresence>
                                    {loadedImagesPreview}
                                </AnimatePresence>
                            </div>
                        </div>
                        <div className="add-content__form-actions">
                            <label className="add-content__file" htmlFor="add-content-file">
                                <img src={addFileImg} alt="" />
                                <input
                                    onChange={handleImageLoaded}
                                    name='file'
                                    type='file'
                                    multiple
                                    accept='image/*'
                                    id="add-content-file" />
                            </label>
                            <button className="add-content__send" type="submit">
                                <img src={sendImg} alt="" />
                            </button>
                        </div>
                    </form>
                )
            }
        </div>
    );
}

export default AddContent;