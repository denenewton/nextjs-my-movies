export default function getPage(array, page, perPage) {
  const obj = {};
  const start = (page - 1) * perPage; // start == offset
  const end = page * perPage;

  obj.items = array.slice(start, end);
  if (obj.items.length === 0) {
    return obj;
  }

  if (page > 1) {
    obj.prev = page - 1;
  }

  if (end < array.length) {
    obj.next = page + 1;
  }

  if (obj.items.length !== array.length) {
    obj.page = page; //current or page
    obj.first = 1;
    obj.last = Math.ceil(array.length / perPage);
  }

  return obj;
}

// filter here is Object that contains atribuits like
// filter:{ title, genre, year }

export async function filtering(filter, Movie) {
  let movies;
  if (filter) {
    if (filter?.title) {
      movies = await Movie?.find({
        title: { $regex: filter?.title, $options: "i" },
      });
      if (filter.year) {
        movies = movies.filter((mov) => mov.year === filter?.year);
      }
      if (filter?.genre) {
        const regex = new RegExp(filter?.genre, "i");
        movies = movies.filter((mov) => mov.genre?.match(regex));
      }
      return movies;
    }
    if (filter?.genre) {
      movies = await Movie?.find({
        genre: { $regex: filter?.genre, $options: "i" },
      });

      if (filter.year) {
        movies = movies.filter((mov) => mov.year === filter?.year);
      }
      return movies;
    }
    if (filter.year) {
      movies = await Movie?.find({ year: filter?.year });
      return movies;
    }
  }
  movies = await Movie?.find();
  return movies;
}
