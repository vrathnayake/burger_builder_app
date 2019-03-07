import React from 'react';
import classes from './Input.css';

const input = (props) => {
    const inputClasses = [classes.InputElement];

    let validationError = null;
    if (props.invalid && props.touched) {
        validationError = <p className={classes.ValidationError}>Please enter a valid value!</p>;
    }

    if (props.invalid && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    let inputElement = null;
    switch (props.elementType) {
        case ('input'):
            inputElement = <input onChange={props.changed} className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} />;
            break;
        case ('textarea'):
            inputElement = <textarea onChange={props.changed} className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} />;
            break;
        case ('select'):
            inputElement = <select onChange={props.changed} className={inputClasses.join(' ')} value={props.value}>
                {props.elementConfig.options.map(opt => (
                    <option key={opt.value} value={opt.value}>
                        {opt.displayValue}
                    </option>
                ))}
            </select>;
            break;
        default:
            inputElement = <input onChange={props.changed} className={classes.InputElement} {...props.elementConfig} value={props.value} />;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    );

};

export default input;