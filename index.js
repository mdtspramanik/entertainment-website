import express from "express";
import axios from "axios";
import dotenv from "dotenv";

const app = express();
const port = 3000;
dotenv.config();

// Serve static files on the specified port
app.use(express.static("public"));

// Render index.ejs file
app.get("/", async (req, res) => {
  res.render("index.ejs");
});

// Fetch and render movie data
app.get("/movies", async (req, res) => {
  const options = {
    method: "GET",
    url: "https://imdb188.p.rapidapi.com/api/v1/getWeekTop10",
    headers: {
      "x-rapidapi-key": process.env.RAPIDAPI_KEY,
      "x-rapidapi-host": process.env.RAPIDAPI_MOVIE_API_HOST,
    },
  };

  try {
    const response = await axios.request(options);
    const movies = response.data.data.map((movie) => ({
      imageUrl: movie.primaryImage.imageUrl,
      title: movie.originalTitleText.text,
      plot: movie.plot.plotText.plainText,
      year: movie.releaseYear.year,
      country: movie.releaseDate.country.text,
      rating: movie.ratingsSummary.aggregateRating,
    }));

    res.render("movie.ejs", { movies });
  } catch (error) {
    res.status(500).send("Error retrieving movie data");
  }
});

// Fetch and render anime data
app.get("/anime", async (req, res) => {
  const options = {
    method: "GET",
    url: "https://myanimelist.p.rapidapi.com/anime/top/all",
    params: { p: "1" },
    headers: {
      "x-rapidapi-key": process.env.RAPIDAPI_KEY,
      "x-rapidapi-host": process.env.RAPIDAPI_ANIME_API_HOST,
    },
  };

  try {
    const response = await axios.request(options);
    const anime = response.data.slice(0, 10).map((anime) => ({
      imageUrl: anime.picture_url,
      title: anime.title,
      rank: anime.rank,
      type: anime.type,
      score: anime.score,
    }));

    res.render("anime.ejs", { anime });
  } catch (error) {
    res.status(500).send("Error retrieving anime data");
  }
});

// Fetch and render game data
app.get("/games", async (req, res) => {
  const options = {
    method: "GET",
    url: "https://free-to-play-games-database.p.rapidapi.com/api/games",
    headers: {
      "x-rapidapi-key": process.env.RAPIDAPI_KEY,
      "x-rapidapi-host": process.env.RAPIDAPI_GAME_API_HOST,
    },
  };

  try {
    const response = await axios.request(options);
    const games = response.data.slice(0, 10).map((game) => ({
      imageUrl: game.thumbnail,
      title: game.title,
      description: game.short_description,
      genre: game.genre,
      platform: game.platform,
      publisher: game.publisher,
      developer: game.developer,
      url: game.game_url,
    }));

    res.render("game.ejs", { games });
  } catch (error) {
    res.status(500).send("Error retrieving game data");
  }
});

// Fetch and render a random movie data
app.get("/random-movie", async (req, res) => {
  const options = {
    method: "GET",
    url: "https://imdb188.p.rapidapi.com/api/v1/getFanFavorites",
    params: { country: "US" },
    headers: {
      "x-rapidapi-key": process.env.RAPIDAPI_KEY,
      "x-rapidapi-host": process.env.RAPIDAPI_MOVIE_API_HOST,
    },
  };

  try {
    const response = await axios.request(options);
    const randomMovie =
      response.data.data.list[
        Math.floor(Math.random() * response.data.data.list.length)
      ];
    const movie = {
      imageUrl: randomMovie.primaryImage.imageUrl,
      title: randomMovie.originalTitleText.text,
      plot: randomMovie.plot.plotText.plainText,
      year: randomMovie.releaseYear.year,
      country: randomMovie.releaseDate.country.text,
      rating: randomMovie.ratingsSummary.aggregateRating,
    };

    res.render("random-movie.ejs", { movie });
  } catch (error) {
    res.status(500).send("Error retrieving movie data");
  }
});

// Fetch and render a random anime data
app.get("/random-anime", async (req, res) => {
  const options = {
    method: "GET",
    url: "https://myanimelist.p.rapidapi.com/anime/top/all",
    params: { p: "1" },
    headers: {
      "x-rapidapi-key": process.env.RAPIDAPI_KEY,
      "x-rapidapi-host": process.env.RAPIDAPI_ANIME_API_HOST,
    },
  };

  try {
    const response = await axios.request(options);
    const randomAnime =
      response.data[Math.floor(Math.random() * response.data.length)];
    const anime = {
      imageUrl: randomAnime.picture_url,
      title: randomAnime.title,
      rank: randomAnime.rank,
      type: randomAnime.type,
      score: randomAnime.score,
    };

    res.render("random-anime.ejs", { anime });
  } catch (error) {
    res.status(500).send("Error retrieving anime data");
  }
});

// Fetch and render a random game data
app.get("/random-game", async (req, res) => {
  const options = {
    method: "GET",
    url: "https://free-to-play-games-database.p.rapidapi.com/api/games",
    headers: {
      "x-rapidapi-key": process.env.RAPIDAPI_KEY,
      "x-rapidapi-host": process.env.RAPIDAPI_GAME_API_HOST,
    },
  };

  try {
    const response = await axios.request(options);
    const randomGame =
      response.data[Math.floor(Math.random() * response.data.length)];
    const game = {
      imageUrl: randomGame.thumbnail,
      title: randomGame.title,
      description: randomGame.short_description,
      genre: randomGame.genre,
      platform: randomGame.platform,
      publisher: randomGame.publisher,
      developer: randomGame.developer,
      url: randomGame.game_url,
    };

    res.render("random-game.ejs", { game });
  } catch (error) {
    res.status(500).send("Error retrieving game data");
  }
});

// Start the server on the specified port
app.listen(port, () => {
  console.log(`Backend server is running on port http://localhost:${port}`);
});
