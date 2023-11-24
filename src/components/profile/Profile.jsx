import { useState, useRef, useEffect } from 'react';
import { storage } from '../../services/firebase/FirestoreConfig';
import {ref as storageRef, uploadString, getDownloadURL } from 'firebase/storage';
import { useGetUserInfoQuery, useCreateUserInfoMutation } from '../../services/api/apiSlice';
import { autoresizeTextarea } from '../../services/autoResizeTextarea';
import { v4 as uuidv4 } from 'uuid';
import { resizeFile } from '../../services/resize/resizeFile';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { Formik, Form} from 'formik';
import * as Yup from 'yup';
import FormInput from '../../services/formikInput/FormInput';

import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './profile.scss';

import defaultAvatarImage from '../../resources/img/profile/default-avatar.jpg';
import defaultPreviewProfileImage from '../../resources/img/profile/default-preview-profile-image.jpg';

const animatedComponents = makeAnimated();

const selectStyles = {
    control: (styles, state) => ({
        ...styles,
        backgroundColor: '#202020',
        border: state.isFocused ? '2px solid #3137C9' : '2px solid transparent',
        boxShadow: state.isFocused ? 0 : 0,
        ':hover': {
            borderColor: '#3137C9'
        },
        marginBottom: '20px'
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

const selectOptions = [
    { value: 'mdi:github', label: 'GitHub', url: '' },
    { value: 'uil:vk', label: 'ВКонтакте', url: '' },
    { value: 'ic:baseline-telegram', label: 'Telegram', url: '' },
    { value: 'mdi:instagram', label: 'Instagram', url: '' },
    { value: 'ri:behance-fill', label: 'Behance', url: '' }
];

const Profile = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [profession, setProfession] = useState('');
    const [about, setAbout] = useState('');
    const [links, setLinks] = useState([]);
    const [avatarImage, setAvatarImage] = useState({
        id: 'defaultImageAvatar',
        file: defaultAvatarImage
    });
    const [profilePreviewImage, setProfilePreviewImage] = useState({
        id: 'defaultPreviewProfileImage',
        file: defaultPreviewProfileImage
    });
    const [isPreLoading, setIsPreLoading] = useState(false);

    const textareaRefs = useRef([]);

    const {
        data: userInfo,
        isLoading: isDataLoading,
        isError: isDataError
    } = useGetUserInfoQuery('1');

    const [
        createUserInfo,
        {
            isLoading: isDataCreatingLoading,
            isError: isDataCreatingError
        }
    ] = useCreateUserInfoMutation();

    useEffect(() => {
        if (userInfo) {
            setName(userInfo.name);
            setSurname(userInfo.surname);
            setEmail(userInfo.email);
            setProfession(userInfo.profession);
            setAbout(userInfo.about);
            setLinks(userInfo.links);
            setAvatarImage({
                id: userInfo.avatarImage.id,
                file: userInfo.avatarImage.url
            });
            setProfilePreviewImage({
                id: userInfo.profilePreviewImage.id,
                file: userInfo.profilePreviewImage.url
            })
        }
    }, [userInfo])

    const onHandleAvatarLoaded = (e) => {
        const file = e.target.files[0];
        if (file) {
            resizeFile(file, 100, 100, 100, 100, 100)
                .then(image => setAvatarImage({
                    id: uuidv4(),
                    file: image
                }))
                .catch(err => {
                    console.error("Ошибка при изменении размера файла", err);
                });
        }
    }

    const onHandleProfilePreviewLoaded = (e) => {
        const file = e.target.files[0];
        if (file) {
            resizeFile(file, 300, 180, 100, 300, 180)
                .then(image => setProfilePreviewImage({
                    id: uuidv4(),
                    file: image
                }))
                .catch(err => {
                    console.error("Ошибка при изменении размера файла", err);
                });
        }
    }

    const onHandleLinkChange = (value, newUrl) => {
        setLinks(currentLinks => {
            return currentLinks.map(link => {
                if (link.value === value) {
                    return {...link, url: newUrl}
                } else {
                    return link
                }
            })
        })
    }

    if (isDataLoading || isPreLoading) {
        return <Spinner />
    }

    if (isDataError) {
        return <ErrorMessage />
    }

    const renderInputLinks = (links) => {
        if (!links || links.length === 0) {
            return null;
        }

        return links.map(item => {
            return (
                <div key={item.value} className="form__group form__group--medium">
                    <input
                        type="text"
                        className="form__control"
                        placeholder={`Ссылка на ${item.label}`}
                        value={item.url}
                        onChange={(e) => onHandleLinkChange(item.value, e.target.value)}
                    />
                    <span className="form__line"></span>
                </div>
            )
        })
    }

    return (
        <>
            <h1 className="page__title">Профиль</h1>

            <Formik
                initialValues = {{
                    name: name,
                    surname: surname,
                    email: email,
                    profession: profession,
                    about: about,
                }}
                enableReinitialize
                validationSchema = {Yup.object({
                    name: Yup.string()
                            .min(2, 'Минимум 2 символа!')
                            .required('Обязательное поле!'),
                    surname: Yup.string()
                            .min(2, 'Минимум 2 символа!')
                            .required('Обязательное поле!'),
                    email: Yup.string()
                            .email('Неправильный email адрес')
                            .required('Обязательное поле!'),
                    profession: Yup.string()
                                .max(50, 'Максимум 50 символов'),
                    about: Yup.string()
                            .max(1000, 'Максимум 1000 символов')
                })}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                    setSubmitting(true);
                    setIsPreLoading(true);

                    try {

                        let profilePreviewImageUrl = profilePreviewImage.file;
                        let avatarImageUrl = avatarImage.file;

                        if (avatarImage.id !== userInfo.avatarImage.id && avatarImage.id !== 'defaultImageAvatar') {
                            const snapshotAvatarImg = await uploadString(
                                storageRef(storage, `users/1/userInfo/${avatarImage.id}.jpg`),
                                avatarImage.file,
                                'data_url'
                            );

                            avatarImageUrl = await getDownloadURL(snapshotAvatarImg.ref);
                        }



                        if (profilePreviewImage.id !== userInfo.profilePreviewImage.id && profilePreviewImage.id !== 'defaultPreviewProfileImage') {
                            const snapshotProfilePreviewImg = await uploadString(
                                storageRef(storage, `users/1/userInfo/${profilePreviewImage.id}.jpg`),
                                profilePreviewImage.file,
                                'data_url'
                            );

                            profilePreviewImageUrl = await getDownloadURL(snapshotProfilePreviewImg.ref);
                        }


                        const newUserInfo = {
                            ...values,
                            links,
                            avatarImage: {
                                id: avatarImage.id,
                                url: avatarImageUrl
                            },
                            profilePreviewImage: {
                                id: profilePreviewImage.id,
                                url: profilePreviewImageUrl
                            }
                        }

                        await createUserInfo({userId: '1', content: newUserInfo});

                    } catch (error) {
                        console.error("Ошибка при отправке данных пользователя: ", error);
                    }

                    setName(values.name);
                    setSurname(values.surname);
                    setEmail(values.email);
                    setProfession(values.profession);
                    setAbout(values.about);

                    setIsPreLoading(false);
                    setSubmitting(false);
                }}
            >
                 <Form className="form" action="/" method="post">
                    <div className="cabinet">
                        <div className="cabinet__form">
                            <div className="form__group form__group--medium">
                                <FormInput
                                    id='name'
                                    name='name'
                                    type="text"
                                    className="form__control"
                                    placeholder="Ваше имя"
                                />
                                <span className="form__line"></span>
                            </div>

                            <div className="form__group form__group--medium">
                                <FormInput
                                    id='surname'
                                    name='surname'
                                    type="text"
                                    className="form__control"
                                    placeholder="Ваша фамилия"
                                />
                                <span className="form__line"></span>
                            </div>

                            <div className="form__group form__group--medium">
                                <FormInput
                                    id='email'
                                    name='email'
                                    type="email"
                                    className="form__control"
                                    placeholder="Ваш e-mail"
                                />
                                <span className="form__line"></span>
                            </div>

                            <div className="form__group form__group--medium">
                                <input id='password' name='password' type="password" className="form__control" placeholder="Новый пароль" />
                                <span className="form__line"></span>
                            </div>

                            <div className="form__group form__group--medium">
                                <input id='retry-password' name='retry-password' type="password" className="form__control" placeholder="Подтвердите пароль" />
                                <span className="form__line"></span>
                            </div>

                            <div className="form__group form__group--medium">
                                <FormInput
                                    className='form__control form__control--textarea'
                                    id='profession'
                                    name="profession"
                                    type='textarea'
                                    placeholder='Чей блог? Например: "блог frontend-разработчика"'
                                ></FormInput>
                                <span className="form__line"></span>
                            </div>

                            <div className="form__group form__group--medium">
                                <FormInput
                                    className='form__control form__control--textarea'
                                    id='about'
                                    name="about"
                                    type='textarea'
                                    placeholder='О себе'
                                ></FormInput>
                                <span className="form__line"></span>
                            </div>

                            <Select
                                className='add-post__tags'
                                placeholder='Выберите ссылки'
                                closeMenuOnSelect={false}
                                components={animatedComponents}
                                isMulti
                                options={selectOptions}
                                styles={selectStyles}
                                value={links}
                                onChange={(links) => setLinks(links)}
                            />

                            {renderInputLinks(links)}

                        </div>
                        <div className="cabinet__content">
                            <img className='cabinet__content-header' src={profilePreviewImage.file} alt="" />
                            <img className='cabinet__content-avatar' src={avatarImage.file} alt="" />

                            <label className="cabinet__file">
                                <input
                                    name='avatar-input'
                                    type="file"
                                    accept='image/*'
                                    onChange={onHandleAvatarLoaded}
                                />
                                выбрать аватар
                                <br />
                            </label>
                            <label className="cabinet__file">
                                <input
                                    name='header-profile-input'
                                    type="file"
                                    accept='image/*'
                                    onChange={onHandleProfilePreviewLoaded}
                                />
                                выбрать шапку профиля
                            </label>
                        </div>
                    </div>

                    <div className="form__footer">
                        <button className="btn btn--blue btn--rounded btn--small" type="submit">Сохранить</button>
                    </div>
                </Form>
            </Formik>

        </>
    );
}

export default Profile;