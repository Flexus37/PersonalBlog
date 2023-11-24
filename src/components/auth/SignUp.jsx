import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormInput from '../../services/formikInput/FormInput';

import './auth.scss';

const SignUp = () => {

    return (
        <div className="auth">
            <div className="auth__content">
                <h1 className="auth__title">Регистрация</h1>
                <Formik
                    initialValues={{
                        name: '',
                        surname: '',
                        login: '',
                        email: '',
                        password: '',
                        tryPassword: ''
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
                            .matches("/^[A-Za-z0-9]+$/", 'Только латинские буквы и цифры!'),
                        email: Yup.string()
                            .email('Неправильный email адрес')
                            .required('Обязательное поле!'),
                        password: Yup.string()
                            .min(8, 'Минимум 8 символов!')
                            .required('Обязательное поле!')

                    })}
                />
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
                            id='login'
                            name='login'
                            type="text"
                            className="form__control"
                            placeholder='Логин'
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
                            id='trypassword'
                            name='trypassword'
                            type="password"
                            className="form__control"
                            placeholder='Повторите пароль'
                        />
                        <span className="form__line"></span>
                    </div>

                    <button className="auth__submit btn btn--small btn--rounded btn--blue">Войти</button>
                    <button className="auth__submit btn btn--small btn--rounded btn--black">
                        <img src={GoogleIcon} alt="" />
                        <p>Войти c помощью Google</p>
                    </button>

                </Form>
                <div className="auth__extra">
                    <div className="auth__extra-item">
                        <a href="#">восстановить</a>
                    </div>
                    <div className="auth__extra-item">
                        <a href="#">регистрация</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp;