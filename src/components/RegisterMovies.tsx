import { FormControl, Button, Progress } from "@chakra-ui/react";
import { upLoadImage } from "../utils/firebaseUtils";
import { FieldValues, useForm } from "react-hook-form";
import { useState } from "react";
import InputRegister from "./InputRegister";
import TextareRegister from "./TextareRegister";

export interface Movie {
  title: string;
  genre: string;
  director: string;
  description: string;
  year: string;
  url: string;
}

interface Props {
  imageURL: string;
  setImageURL: (arg: string) => void;
}

const RegisterMovies = ({ imageURL, setImageURL }: Props) => {
  const [progressImg, setProgressImg] = useState(0);
  const { register, handleSubmit, formState } = useForm<Movie>();
  const { errors } = formState;

  const onSubmit = (data: FieldValues | any) => {
    if (data) upLoadImage(data, setImageURL, setProgressImg);
    setProgressImg(0);
  };

  return (
    <>
      <FormControl maxW="100%" p={1}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputRegister
            lable="Title"
            register={register}
            type="text"
            errors={errors}
            name="title"
          />

          <InputRegister
            lable="Genre"
            register={register}
            errors={errors}
            type="text"
            name="genre"
          />

          <InputRegister
            lable="Director"
            register={register}
            errors={errors}
            type="text"
            name="director"
          />

          <InputRegister
            lable="Year"
            register={register}
            errors={errors}
            type="text"
            name="year"
          />

          <TextareRegister
            lable="Description"
            register={register}
            errors={errors}
            name="description"
          />

          <InputRegister
            lable="Upload Image"
            register={register}
            errors={errors}
            type="file"
            name="file"
          />

          <Button type="submit" mt={5}>
            Send
          </Button>
        </form>
      </FormControl>
      <br />
      {!imageURL && <Progress value={progressImg} max={100} borderRadius={5} />}
    </>
  );
};

export default RegisterMovies;
