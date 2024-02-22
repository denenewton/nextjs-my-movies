import Link from "next/link";
import { Container } from "@chakra-ui/layout";

const Form = ({
  type,
  movie,
  setMovie,
  submitting,
  setImageFile,
  handleSubmit,
}) => {
  return (
    <Container
      alignItems="center"
      mx="auto"
      p={0}
      m={0}
      maxW="none"
      centerContent
    >
      <h1 className="head_text text-center">
        <span className="dark_gradient">{type} Movie</span>
      </h1>
      <p className="desc text-center max-w-md">
        {type} and share amazing pots with the world, and let your imagination
        run wild with any blog postting platform
      </p>
      <form
        onSubmit={handleSubmit}
        className="mt-7 w-full max-w-2xl flex flex-col gap-5 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base">Title</span>

          <input
            type="text"
            value={movie.title}
            className="form_input"
            onChange={(e) => setMovie({ ...movie, title: e.target.value })}
            required
          />
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base">Genre</span>

          <input
            type="text"
            value={movie.genre}
            className="form_input"
            onChange={(e) => setMovie({ ...movie, genre: e.target.value })}
            required
          />
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base">Director</span>

          <input
            type="text"
            value={movie.director}
            className="form_input"
            onChange={(e) => setMovie({ ...movie, director: e.target.value })}
            required
          />
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base">
            Popularity
          </span>

          <input
            type="number"
            value={movie.popularity}
            className="form_input"
            onChange={(e) => setMovie({ ...movie, popularity: e.target.value })}
            required
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base">Year</span>

          <input
            type="number"
            value={movie.year}
            className="form_input"
            onChange={(e) => setMovie({ ...movie, year: e.target.value })}
            required
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base">
            URL Movie
          </span>

          <input
            type="text"
            value={movie.urlMovie}
            className="form_input"
            onChange={(e) => setMovie({ ...movie, urlMovie: e.target.value })}
            required
          />
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base">Image</span>

          <input
            type="file"
            name="file"
            accept="image/png, image/jpeg"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="form_input"
          />
        </label>

        <label htmlFor="textarea-id">
          <span className="font-satoshi font-semibold text-base">
            Description
          </span>

          <textarea
            id="textarea-id"
            value={movie.description}
            onChange={(e) =>
              setMovie({ ...movie, description: e.target.value })
            }
            className="form_textarea "
            required
          />
        </label>

        <div className="flex justify-end items-center  my-5 gap-4">
          <Link
            href="/"
            className="px-5 py-1.5 rounded-full text-sm border border-1"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-violet-500 rounded-full text-white"
          >
            {submitting ? `${type}ing...` : type}
          </button>
        </div>
      </form>
    </Container>
  );
};

export default Form;
