import { useRef, useEffect } from "react";
import { useField } from "formik";
import { autoresizeTextarea } from "../autoResizeTextarea";

import '../../style/blocks/form.scss'

const FormInput = ({...props}) => {
    const [field, meta] = useField(props);
    const textareaRef = useRef([]);

    const onHandleInput = (e) => {
        field.onChange(e);
        autoresizeTextarea(textareaRef, '27px');
    };

    useEffect(() => {
        if(textareaRef.current){
            autoresizeTextarea(textareaRef, '27px');
        }
    }, []);

    useEffect(() => {
        if(textareaRef.current){
            autoresizeTextarea(textareaRef, '27px');
        }
    }, [props, field]);

    return (
        <div className="form__group form__group--medium">
            {props.type === 'textarea' ? (
                <textarea ref={el => (textareaRef.current[0] = el)} {...field} {...props} onChange={onHandleInput} />
            ) : (
                <input {...field} {...props} />
            )}
            <span className="form__line"></span>
            {meta.touched && meta.error ? (
                <div className="form__error">{meta.error}</div>
            ) : null}
        </div>
    );
}

export default FormInput;