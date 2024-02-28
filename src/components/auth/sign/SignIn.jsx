import { Formik, Form } from 'formik';
import FormInput from '../../../services/formikInput/FormInput';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import {signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, googleProvider } from '../../../services/firebase/FirestoreConfig';
import { useDispatch, useSelector} from 'react-redux'
import { setUserAuthentication, setLoadingStatus, setUserId } from '../../../services/api/userInfoSlice';
import { useCreateUserInfoMutation } from '../../../services/api/apiSlice';

import AuthHeader from '../AuthHeader';
import OverlaySpinner from '../../spinner/OverlaySpinner';

import '../auth.scss';
import GoogleIcon from '../../../resources/img/icons/Google.svg'
import { getUserInfo } from '../../../services/firebase/FirestoreService';

const SignIn = () => {
    const {loadingStatus} = useSelector(state => state.userInfo);
    const dispatch = useDispatch();

    const [
        createUserInfo
    ] = useCreateUserInfoMutation();

    const signInWithGoogle = () => {
        dispatch(setLoadingStatus('loading'));
        signInWithPopup(auth, googleProvider)
            .then(async (result) => {
                const user = result.user;
                const isUser = Object.keys(await getUserInfo(user.uid)).length > 1;

                if (!isUser) {
                    createUserInfo({
                        userId: user.uid,
                        content: {
                            name: user.displayName.split(' ')[0].toLowerCase(),
                            surname: user.displayName.split(' ')[1].toLowerCase(),
                            email: user.email,
                            profession: '',
                            about: '',
                            links: [],
                            avatarImage: {
                                id: 'default-avatar',
                                url: 'https://firebasestorage.googleapis.com/v0/b/personalblogflexus37.appspot.com/o/users%2Fdefault-avatar.jpg?alt=media&token=59354186-fdc6-47d3-81dd-af5af855d82b'
                            },
                            profilePreviewImage: {
                                id: 'default-preview-profile-image',
                                url: 'https://firebasestorage.googleapis.com/v0/b/personalblogflexus37.appspot.com/o/users%2Fdefault-preview-profile-image.jpg?alt=media&token=a75acc54-4077-4a15-a0e3-61df0aaf39a0'
                            }
                        }
                    })
                }

                dispatch(setUserId(user.uid));
                dispatch(setUserAuthentication(true));
                dispatch(setLoadingStatus('idle'));

            }).catch((error) => {
                const credential = GoogleAuthProvider.credentialFromError(error);
                console.error(error.code, error.message, credential);
                dispatch(setLoadingStatus('idle'));
            });
    }

    return (
        <div className="auth">
            <AuthHeader />
            <div className="auth__wrapper">
                <div className="auth__inner">
                    {
                        loadingStatus === 'loading' ?
                        <OverlaySpinner />
                        : null
                    }

                    <div className="auth__content">
                        <h1 className="auth__title">Вход</h1>
                        <Formik
                            initialValues={{
                                email: '',
                                password: ''
                            }}
                            validationSchema={Yup.object({
                                email: Yup.string()
                                        .email('Неправильный email адрес'),
                                password: Yup.string()
                            })}
                            onSubmit={(values, {setSubmitting}) => {
                                setSubmitting(true);
                                dispatch(setLoadingStatus('loading'));

                                try {
                                    signInWithEmailAndPassword(auth, values.email, values.password)
                                        .then(userCredential => {
                                            const user = userCredential.user;
                                            console.log(user);
                                            dispatch(setUserAuthentication(true));
                                            dispatch(setLoadingStatus('idle'));
                                        })
                                        .catch(error => {
                                            console.log('Error from sign in:', error.code, error.message);
                                            dispatch(setLoadingStatus('idle'));
                                        })
                                }
                                catch(error) {
                                    console.log('Log in try/catch error:', error.message);
                                }
                                finally {
                                    setSubmitting(false);

                                }
                            }}
                        >
                            <Form className="auth__form">
                                <div className="auth__form form__group form__group--medium">
                                    <FormInput
                                        id='email'
                                        name='email'
                                        type="text"
                                        className="form__control"
                                        placeholder='Email'
                                    />
                                    <span className="form__line"></span>
                                </div>
                                <div className="auth__form form__group form__group--medium">
                                    <FormInput
                                        id='password'
                                        name='password'
                                        type="password"
                                        className="form__control"
                                        placeholder='Пароль'

                                    />
                                    <span className="form__line"></span>
                                </div>
                                <button className="auth__submit btn btn--small btn--rounded btn--blue">Войти</button>
                                <button type='button' onClick={() => signInWithGoogle()} className="btn btn--small btn--rounded btn--black auth__submit">
                                    <img src={GoogleIcon} alt="" />
                                    <p>Войти c помощью Google</p>
                                </button>
                            </Form>
                        </Formik>
                        <div className="auth__extra">
                            <div className="auth__extra-item">
                                <a href="#">восстановить</a>
                            </div>
                            <div className="auth__extra-item">
                                <Link to='/registration' href="#">регистрация</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn;