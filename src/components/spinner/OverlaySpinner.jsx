import './overlaySpinner.scss';
import Spinner  from './Spinner';

const OverlaySpinner = () => {
    return (
        <div className="loading__wrapper">
            <Spinner lottiestyle={{'height': '100%'}} />
        </div>
    )
}

export default OverlaySpinner;