import { FormLabel, Input } from "@chakra-ui/react";

interface Props {
  type: string;
  name: string;
  register: any;
  lable: string;
  errors: object | any;
}

const InputRegister = ({ type, name, register, lable, errors }: Props) => {
  return (
    <div>
      <FormLabel marginBottom={1} id={name}>
        {lable}
      </FormLabel>
      <Input
        {...(register(name), { required: true, minLength: 3 })}
        id={name}
        type={type}
        name={name}
        marginBottom={3}
      />
      {errors.name?.type == "required" && <p>This fild must be fill out.</p>}
      {errors.name?.type == "minLength" && (
        <p>The name must be at least 3 characters.</p>
      )}
    </div>
  );
};

export default InputRegister;
