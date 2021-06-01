// import GraphComponent from "vis-react";
import {
    Field,
    getFieldTooltip,
    tooltipMouseLeave,
    tooltipMouseMove,
    tooltipParentWillReceiveProps,
} from "cx/widgets";
import InputMask from "react-input-mask";

export default class MaskInputField extends Field {
    onChange(e, instance) {
        instance.set("value", e.target.value || null);
    }

    declareData() {
        super.declareData({
            value: undefined,
            mask: undefined,
            required: undefined,
        });
    }

    validate(context, instance) {
        super.validate(context, instance);

        let { data } = instance;

        if (!data.error && data.value) {
            if (this.validationRegExp) this.validationRegExp.lastIndex = 0;
            if (
                this.validationRegExp &&
                !this.validationRegExp.test(data.value)
            )
                data.error = this.validationErrorText;
            else if (data.value.includes("_"))
                data.error = this.validationErrorText;
        }
    }
    renderInput(context, instance, key) {
        let { widget, data, state } = instance;
        let { CSS, baseClass, suppressErrorsUntilVisited } = widget;
        let empty = this.input ? !this.input.value : data.empty;

        let label =
            this.labelPlacement &&
            getContent(this.renderLabel(context, instance, "label"));

        let help =
            this.helpPlacement &&
            getContent(this.renderHelp(context, instance, "help"));

        // let help = data.error;
        return (
            <div
                key={key}
                className={CSS.expand(
                    data.classNames,
                    CSS.state({
                        visited: state.visited,
                        focus: state.focus,
                        empty: empty && !data.placeholder,
                        error:
                            data.error &&
                            (state.visited || !suppressErrorsUntilVisited),
                    })
                )}
                style={data.style}
            >
                <InputMask
                    className={CSS.expand(
                        CSS.element(baseClass, "input"),
                        data.inputClass
                    )}
                    style={data.inputStyle}
                    // className={CSS.element(baseClass, "input")}
                    value={instance.data.value || ""}
                    mask={instance.data.mask}
                    onChange={(e) => this.onChange(e, instance)}
                    alwaysShowMask={this.alwaysShowMask}
                    onBlur={() => {
                        instance.setState({ visited: true });
                    }}
                    onMouseMove={(e) =>
                        tooltipMouseMove(e, ...getFieldTooltip(instance))
                    }
                    onMouseLeave={(e) =>
                        tooltipMouseLeave(e, ...getFieldTooltip(instance))
                    }
                />
                {label}
                {help}
            </div>
        );
    }
}

MaskInputField.prototype.baseClass = "textfield";
MaskInputField.prototype.styled = true;
MaskInputField.prototype.alwaysShowMask = false;
MaskInputField.prototype.validationErrorText =
    "The entered value is not valid.";
MaskInputField.prototype.suppressErrorsUntilVisited = true;
