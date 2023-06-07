import { FormLabel, Textarea } from "@chakra-ui/react";

interface Props {
  name: string;
  register: any;
  lable: string;
  errors: object | any;
}
const TextareRegister = ({ name, register, lable, errors }: Props) => {
  return (
    <div>
      <FormLabel marginBottom={1} id={name}>
        {lable}
      </FormLabel>
      <Textarea
        {...(register(name), { required: true, minLength: 50 })}
        id={name}
        name={name}
        marginBottom={3}
      />
      {errors.name?.type == "required" && <p>This fild must be fill out.</p>}
      {errors.name?.type == "minLength" && (
        <p>The name must be at least 50 characters.</p>
      )}
    </div>
  );
};

export default TextareRegister;
