import { VDOM } from "cx/ui";
import { Field, getFieldTooltip, tooltipMouseLeave, tooltipMouseMove } from 'cx/widgets';
import InputMask from 'react-input-mask';

export default class MaskInputField extends Field {
   onChange(e, instance) {
      instance.set('value', e.target.value || null);
   }

   declareData() {
      super.declareData({
         value: undefined,
         mask: undefined,
         required: undefined,
         maskPlaceholder: '_',
      });
   }

   validate(context, instance) {
      super.validate(context, instance);

      let { data } = instance;

      if (!data.error && data.value) {
         if (this.validationRegExp) this.validationRegExp.lastIndex = 0;
         if (this.validationRegExp && !this.validationRegExp.test(data.value)) data.error = this.validationErrorText;
         else if (data.value.includes(data.maskPlaceholder)) data.error = this.validationErrorText;
      }
   }
   renderInput(context, instance, key) {
      let { widget, data, state } = instance;
      let { CSS, baseClass, suppressErrorsUntilVisited } = widget;
      let empty = this.input ? !this.input.value : data.empty;

      let label = this.labelPlacement && getContent(this.renderLabel(context, instance, 'label'));

      let help = this.helpPlacement && getContent(this.renderHelp(context, instance, 'help'));

      // TODO: Change this to something intuitive
      let charSet = {
         // Numbers
         9: '[0-9]',

         // All characters
         a: '[A-Za-z]',

         //All lowercase characters
         s: '[a-z]',

         // All uppercase characters
         C: '[A-Z]',

         // Everything
         '*': '[A-Za-z0-9]',
      };
      return (
         <div
            key={key}
            className={CSS.expand(
               data.classNames,
               CSS.state({
                  visited: state.visited,
                  focus: state.focus,
                  empty: empty && !data.placeholder,
                  error: data.error && (state.visited || !suppressErrorsUntilVisited),
               })
            )}
            style={data.style}
         >
            <InputMask
               className={CSS.expand(CSS.element(baseClass, 'input'), data.inputClass)}
               style={data.inputStyle}
               // className={CSS.element(baseClass, "input")}
               value={instance.data.value || ''}
               mask={instance.data.mask}
               maskChar={this.maskPlaceholder}
               placeholder={this.placeholder}
               onChange={(e) => this.onChange(e, instance)}
               alwaysShowMask={this.alwaysShowMask}
               onBlur={() => {
                  instance.setState({ visited: true });
               }}
               onMouseMove={(e) => tooltipMouseMove(e, ...getFieldTooltip(instance))}
               onMouseLeave={(e) => tooltipMouseLeave(e, ...getFieldTooltip(instance))}
               formatChars={charSet}
            />
            {label}
            {help}
         </div>
      );
   }
}

MaskInputField.prototype.baseClass = 'textfield';
MaskInputField.prototype.styled = true;
MaskInputField.prototype.alwaysShowMask = false;
MaskInputField.prototype.validationErrorText = 'The entered value is not valid.';
MaskInputField.prototype.suppressErrorsUntilVisited = true;
