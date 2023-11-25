import logo from '../../resources/img/logo.svg'

const AuthHeader = () => {
    return (
        <header className="auth__header">
            <img src={logo} alt="Personal Blog" />
        </header>
    )
}

export default AuthHeader;