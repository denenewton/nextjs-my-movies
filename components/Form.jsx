import Link from "next/link";

const Form = ({ type, movie, setMovie, submitting, setImageFile,handleSubmit }) => {
  return (
    <section className='section-main pt-24'>
      <h1 className='head_text text-left'>
        <span className='dark_gradient'>{type} Movie</span>
      </h1>
      <p className='desc text-center max-w-md'>
        {type} and share amazing pots with the world, and let your
        imagination run wild with any blog postting platform
      </p>
      <form onSubmit={handleSubmit} className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism' >
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Title
          </span>

          <input type="text" value={movie.title} className='form_input' onChange={(e) => setMovie({ ...movie, title: e.target.value })} required />
        </label>

        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Genre
          </span>

          <input type="text" value={movie.genre} className='form_input' onChange={(e) => setMovie({ ...movie, genre: e.target.value })} required />
        </label>

        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Director
          </span>

          <input type="text" value={movie.director} className='form_input' onChange={(e) => setMovie({ ...movie, director: e.target.value })} required />
        </label>


        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Popularity
          </span>

          <input type='number' value={movie.popularity} className='form_input' onChange={(e) => setMovie({ ...movie, popularity: e.target.value })} required />
        </label>
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Year
          </span>

          <input type='number' value={movie.year} className='form_input' onChange={(e) => setMovie({ ...movie, year: e.target.value })} required />
        </label>
        <label>

          <span className='font-satoshi font-semibold text-base text-gray-700'>
            URL Movie
          </span>

          <input type='text' value={movie.urlMovie} className='form_input' onChange={(e) => setMovie({ ...movie, urlMovie: e.target.value })} required />
        </label>

        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Image
          </span>

          <input type="file"  name="file" accept="image/png, image/jpeg" onChange={(e) => setImageFile( e.target.files[0] )} className='form_input' />
        </label>


        <label htmlFor="textarea-id">
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Description
          </span>

          <textarea
            id="textarea-id"
            value={movie.description}
            onChange={(e) => setMovie({ ...movie, description: e.target.value })}
            className='form_textarea '
            required
          />
        </label>

        <div className='flex justify-end items-center  my-5 gap-4'>
          <Link href='/' className='text-gray-500 text-sm'>
            Cancel
          </Link>
          <button type="submit" disabled={submitting} className='px-5 py-1.5 text-sm bg-violet-500 rounded-full text-white' >
            {submitting ? `${type}ing...` : type}
          </button>
        </div>

      </form>
    </section>
  );
};

export default Form;
