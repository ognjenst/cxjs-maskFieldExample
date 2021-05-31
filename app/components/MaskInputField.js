// import GraphComponent from "vis-react";
import { StringTemplate } from "cx/data";
import {VDOM} from "cx/ui";
import { Field, ValidationError } from "cx/widgets";
import InputMask from 'react-input-mask';


export default class MaskInputField extends Field {
    onChange(e, instance) {
        instance.set("value", e.target.value || null);
    }
    declareData() {
        super.declareData({
            value: undefined,
            mask: undefined,
            required: undefined
        })
    }

    validate(context, instance) {
        super.validate(context, instance);
  
        let { data } = instance;
  
        if (!data.error && data.value) {
           if (this.validationRegExp) this.validationRegExp.lastIndex = 0;
           if (this.validationRegExp && !this.validationRegExp.test(data.value)) data.error = this.validationErrorText;
           else if (data.value.includes("_")) data.error = this.validationErrorText;

        }
     }
    renderInput(context, instance, key) {
        let { widget, data, state } = instance;
        let { CSS, baseClass } = widget;
        let empty = this.input ? !this.input.value : data.empty;

        // let help = data.error;
        return (
            <div
                key = {key}
                className={CSS.expand(
                    data.classNames,
                    CSS.state({ 
                        visited: state.visited,
                        focus: state.focus,
                        empty: empty && !data.placeholder,
                        error: data.error,
                    })
                )}
                style={data.style}>
                <InputMask
                    className={CSS.expand(CSS.element(baseClass, "input"), data.inputClass)}
                    style={data.inputStyle}

                    // className={CSS.element(baseClass, "input")}
                    value={instance.data.value || ''}
                    mask={instance.data.mask}
                    onChange = {(e) => this.onChange(e, instance)}
                    alwaysShowMask = {this.alwaysShowMask}
                />
                {/* <ValidationError /> */}
                <label className='cxb-validationerror' htmlFor={key}>
         {data.error}
      </label>
                {/* {help} */}
            </div>
        )
    }
}

MaskInputField.prototype.baseClass = 'textfield';
MaskInputField.prototype.styled = true;
MaskInputField.prototype.alwaysShowMask = false;
MaskInputField.prototype.validationErrorText = "The entered value is not valid.";