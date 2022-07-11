import { Group, FormInputLabel, Input } from "./form-input.styles.jsx";

const FormInput = ({ label, inputOptions }) => {
  return (
    <Group>
      <Input {...inputOptions} />
      {label && (
        <FormInputLabel shrink={inputOptions.length}>{label}</FormInputLabel>
      )}
    </Group>
  );
};

export default FormInput;
