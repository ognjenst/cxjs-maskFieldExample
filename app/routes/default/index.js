import { LabelsLeftLayout } from "cx/ui";
import { Button, Section, TextField, ValidationError } from "cx/widgets";
import MaskInputField from "../../components/MaskInputField";
export default (
    <cx>
        <h2 putInto="header">Home</h2>
        <Section mod="card" controller={
            {
                onInit() {this.store.init('test', '123756789')}, 
                test(){console.log(this.store.get('test'))}

            }}>
            <p>Testing</p>
            <LabelsLeftLayout>
            <TextField label="Test" value-bind="test" required  validationMode="help-block" />
            <MaskInputField label="Test" mask="99.99.99.99" value-bind="test" required  validationMode="help-block"/>
            </LabelsLeftLayout>
            <Button onClick="test">Test</Button>
        </Section>
    </cx>
);
