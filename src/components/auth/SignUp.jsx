import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormInput from '../../services/formikInput/FormInput';
import { Link } from 'react-router-dom';

import AuthHeader from './AuthHeader';

import './auth.scss';

const SignUp = () => {

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
                                login: '',
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
                                login: Yup.string()
                                    .min(2, 'Минимум 2 символа!')
                                    .required('Обязательное поле!')
                                    .matches(/^[A-Za-z0-9]+$/, 'Только латинские буквы и цифры!'),
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
                        >
                            <Form action="" className="auth__form">

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

                                <button className="auth__submit btn btn--small btn--rounded btn--blue">Зарегистрироваться</button>

                            </Form>
                        </Formik>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp;