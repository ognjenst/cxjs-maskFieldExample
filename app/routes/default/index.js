import { LabelsLeftLayout } from "cx/ui";
import { Button, enableTooltips, Section, TextField } from "cx/widgets";
import MaskInputField from "../../components/MaskInputField";

enableTooltips();

export default (
    <cx>
        <h2 putInto="header">Home</h2>
        <Section
            mod="card"
            controller={{
                onInit() {
                    //this.store.init("test", "123756789");
                },
                test() {
                    console.log(this.store.get("test"));
                },
            }}
        >
            <p>Testing</p>
            <LabelsLeftLayout>
                <TextField
                    label="Text Field"
                    value-bind="test"
                    required
                    validationMode="help-block"
                />

                <MaskInputField
                    label="Mask"
                    mask="99.99.99.99"
                    value-bind="test"
                    required
                    validationMode="help-block"
                />

                <MaskInputField
                    label="Tooltip"
                    mask="99.99.99.99"
                    value-bind="test"
                    required
                    tooltip="This is a tooltip"
                />
            </LabelsLeftLayout>
            <Button onClick="test">Test</Button>
        </Section>
    </cx>
);
