import * as Cx from "cx/core";
import { FieldProps } from 'cx/widgets';

export interface MaskInputFieldProps extends FieldProps {
   

   /** Textual value of the input. */
   value?: Cx.StringProp;

    /** The mask format to use for the input. */
   mask?: Cx.StringProp;


   /** Default text displayed when the field is empty. */
   placeholder?: Cx.StringProp;

   /**
    * Event used to report a new value. Defaults to `input`, which means that entered value will be written to the store on each keystroke.
    * Other permitted values are `enter` (Enter key pressed) and `blur` (field looses focus).
    * Multiple values should be separated by space, e.g. `enter blur`.
    */
   reactOn?: string;
}

export class MaskInputField extends Cx.Widget<MaskInputFieldProps> {}
