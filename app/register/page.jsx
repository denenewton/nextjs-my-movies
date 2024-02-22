"use client";

import {
  uploadImage,
  getImageURL,
  addCollection,
} from "../../utils/firebase.utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Form from "../../components/Form";
import GridLayout from "../../components/GridLayout";

let payload = {
  title: "",
  genre: "",
  director: "",
  year: "",
  description: "",
  popularity: "",
  urlMovie: "",
  urlImage: "",
};

const page = () => {
  const [movie, setMovie] = useState(payload);
  const [submitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const router = useRouter();

  const onSubimit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await uploadImage(imageFile);
      const urlImage = await getImageURL(imageFile);
      console.log(urlImage);

      const data = { ...movie, urlImage: urlImage };
      console.log(data);

      await addCollection("movies", data);

      router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <GridLayout pathname={`/register`}>
      {/* <Container mt={12} alignItems="center" mx="auto" px={0} bg="transparent"> */}
      <Form
        type="Create"
        movie={movie}
        setMovie={setMovie}
        setImageFile={setImageFile}
        submitting={submitting}
        handleSubmit={onSubimit}
      />
      {/* </Container> */}
    </GridLayout>
  );
};

export default page;
