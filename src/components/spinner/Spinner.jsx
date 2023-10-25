import Lottie from 'lottie-react';
import lottieImg from './spinnerImg.json';

const Spinner = (props) => {

    return (
        <Lottie style={props.lottiestyle} animationData={lottieImg} loop={true} />
    )
}

export default Spinner;