import { Formik, Form } from 'formik';
import FormInput from '../../services/formikInput/FormInput';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import {signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../services/firebase/FirestoreConfig';
import { useDispatch} from 'react-redux'
import { setUserAuthentication } from '../../services/api/userInfoSlice';

import AuthHeader from './AuthHeader';

import './auth.scss';
import GoogleIcon from '../../resources/img/icons/Google.svg'

const LogIn = () => {
    const dispatch = useDispatch();

    return (
        <div className="auth">
            <AuthHeader />
            <div className="auth__wrapper">
                <div className="auth__inner">
                    <div className="auth__content">
                        <h1 className="auth__title">Вход</h1>
                        <Formik
                            initialValues={{
                                email: '',
                                password: ''
                            }}
                            validationSchema={Yup.object({
                                email: Yup.string()
                                        .email('Неправильный email адрес')
                                        .required('Обязательное поле!'),
                                password: Yup.string()
                                        .required('Обязательное поле!')
                            })}
                            onSubmit={(values, {setSubmitting}) => {
                                setSubmitting(true);

                                try {
                                    signInWithEmailAndPassword(auth, values.email, values.password)
                                        .then(userCredential => {
                                            const user = userCredential.user;
                                            console.log(user);
                                            dispatch(setUserAuthentication(true));
                                        })
                                        .catch(error => {
                                            console.log('Error from sign in:', error.code, error.message);
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
                                <button className="auth__submit btn btn--small btn--rounded btn--black">
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

export default LogIn;