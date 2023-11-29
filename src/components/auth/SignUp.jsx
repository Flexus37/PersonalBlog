import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormInput from '../../services/formikInput/FormInput';
import { Link, useNavigate } from 'react-router-dom';
import {createUserWithEmailAndPassword} from 'firebase/auth'
import { useDispatch} from 'react-redux'
import { setUserAuthentication } from '../../services/api/userInfoSlice';
import { auth } from '../../services/firebase/FirestoreConfig';

import AuthHeader from './AuthHeader';

import './auth.scss';

const SignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <div className="auth">
            <AuthHeader />
            <div className="auth__wrapper">
                <div className="auth__inner">
                    <div className="auth__content">
                        <Link className='auth__back' to='/'>Назад</Link>
                        <h1 className="auth__title auth__title--registration">Регистрация</h1>
                        <Formik
                            initialValues={{
                                name: '',
                                surname: '',
                                email: '',
                                password: '',
                                confirmPassword: ''
                            }}
                            validationSchema={Yup.object({
                                name: Yup.string()
                                    .min(2, 'Минимум 2 символа!')
                                    .required('Обязательное поле!'),
                                surname: Yup.string()
                                    .min(2, 'Минимум 2 символа!')
                                    .required('Обязательное поле!'),
                                email: Yup.string()
                                    .email('Неправильный email адрес')
                                    .required('Обязательное поле!'),
                                password: Yup.string()
                                    .required('Обязательное поле!')
                                    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/, 'Пароль должен содержать минимум 8 символов, включая буквы и цифры'),
                                confirmPassword: Yup.string()
                                    .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
                                    .required('Необходимо подтвердить пароль')
                            })}
                            onSubmit={(values, {setSubmitting}) => {
                                console.log('Going Reg...')
                                setSubmitting(true);
                                try {
                                    createUserWithEmailAndPassword(auth, values.email, values.password)
                                        .then((userCredential) => {
                                            const user = userCredential.user;
                                            console.log(user);
                                            dispatch(setUserAuthentication(true));
                                            navigate('/');
                                        })
                                        .catch((error) => {
                                            console.log('CreateUserEmailAndPassword Error', error.code, error.message)
                                        });
                                }
                                catch(error) {
                                    console.log(error.code, error.message);
                                }

                                setSubmitting(false);
                            }}
                        >
                            <Form className="auth__form">

                                <div className="auth__form form__group form__group--medium">
                                    <FormInput
                                        id='name'
                                        name='name'
                                        type="text"
                                        className="form__control"
                                        placeholder='Имя'
                                    />
                                    <span className="form__line"></span>
                                </div>

                                <div className="auth__form form__group form__group--medium">
                                    <FormInput
                                        id='surname'
                                        name='surname'
                                        type="text"
                                        className="form__control"
                                        placeholder='Фамилия'
                                    />
                                    <span className="form__line"></span>
                                </div>

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

                                <div className="auth__form form__group form__group--medium">
                                    <FormInput
                                        id='confirmPassword'
                                        name='confirmPassword'
                                        type="password"
                                        className="form__control"
                                        placeholder='Повторите пароль'
                                    />
                                    <span className="form__line"></span>
                                </div>

                                <button type="submit" className="auth__submit btn btn--small btn--rounded btn--blue">
                                    Зарегистрироваться
                                </button>

                            </Form>
                        </Formik>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp;