import { PrismaClient } from "@prisma/client";

const parentalRatings = {
  pg: "PG",
  pg13: "PG-13",
  R: "R",
  G: "G",
} as const;

const client = new PrismaClient();

export const clearDb = async () => {
  await client.starRating.deleteMany();
  await client.user.deleteMany();
  await client.movie.deleteMany();
};

export const seedFixtures = async () => {
  const jon = await client.user.create({
    data: {
      username: "JonnyBoy9000",
      age: 20,
    },
  });

  const rachel = await client.user.create({
    data: {
      username: "rachelIsTheBest",
      age: 21,
    },
  });

  const andrey = await client.user.create({
    data: {
      username: "andreyIsTheBest",
      age: 17,
    },
  });

  const peter = await client.user.create({
    data: {
      username: "peterIsTheBest",
      age: 16,
    },
  });

  // export users for test readability
  const users = {
    jon,
    rachel,
    andrey,
    peter,
  };

  const forrestGump = await client.movie.create({
    data: {
      title: "Forrest Gump",
      releaseYear: 1994,
      parentalRating: parentalRatings.pg13,
    },
  });

  const princessBride = await client.movie.create({
    data: {
      title: "The Princess Bride",
      releaseYear: 1987,
      parentalRating: parentalRatings.pg,
    },
  });

  const interstellar = await client.movie.create({
    data: {
      title: "Interstellar",
      releaseYear: 2014,
      parentalRating: parentalRatings.pg13,
    },
  });

  const hereditary = await client.movie.create({
    data: {
      title: "Hereditary",
      releaseYear: 2018,
      parentalRating: parentalRatings.R,
    },
  });

  const theOrphan = await client.movie.create({
    data: {
      title: "The Orphan",
      releaseYear: 2009,
      parentalRating: parentalRatings.R,
    },
  });

  const theTitanic = await client.movie.create({
    data: {
      title: "The Titanic",
      releaseYear: 1997,
      parentalRating: parentalRatings.pg13,
    },
  });

  const allMovies = {
    forrestGump,
    princessBride,
    interstellar,
    hereditary,
    theOrphan,
    theTitanic,
  };

  const moviesEarlierThan90s = [theTitanic, princessBride, forrestGump];
  const moviesBetween2000And2010 = [theOrphan];
  const moviesAfter2010 = [hereditary, interstellar];
  const pgMovies = [princessBride];
  const pg13Movies = [forrestGump, interstellar, theTitanic];
  const rMovies = [hereditary, theOrphan];

  // Jon Ratings
  const jonRatesForrestGump = await client.starRating.create({
    data: {
      score: 5,
      userId: jon.id,
      movieId: forrestGump.id,
    },
  });

  const jonRatesHereditary = await client.starRating.create({
    data: {
      score: 5,
      userId: jon.id,
      movieId: hereditary.id,
    },
  });
  const jonRatesTheTitanic = await client.starRating.create({
    data: {
      score: 3,
      userId: jon.id,
      movieId: theTitanic.id,
    },
  });
  const jonRatesTheOrphan = await client.starRating.create({
    data: {
      score: 1,
      userId: jon.id,
      movieId: theOrphan.id,
    },
  });

  const jonsRatings = [
    jonRatesForrestGump,
    jonRatesHereditary,
    jonRatesTheOrphan,
    jonRatesTheTitanic,
  ];

  // Rachel Ratings
  const rachelRatesForrestGump = await client.starRating.create({
    data: {
      score: 3,
      movieId: forrestGump.id,
      userId: rachel.id,
    },
  });
  const rachelRatesTheOrphan = await client.starRating.create({
    data: {
      score: 4,
      movieId: theOrphan.id,
      userId: rachel.id,
    },
  });
  const rachelRatesThePrincessBride = await client.starRating.create({
    data: {
      score: 5,
      movieId: princessBride.id,
      userId: rachel.id,
    },
  });

  const rachelsRatings = [
    rachelRatesForrestGump,
    rachelRatesTheOrphan,
    rachelRatesThePrincessBride,
  ];

  // Andrey Ratings
  const andreyRatesForrestGump = await client.starRating.create({
    data: {
      score: 5,
      movieId: forrestGump.id,
      userId: andrey.id,
    },
  });
  const andreyRatesInterstellar = await client.starRating.create({
    data: {
      score: 5,
      movieId: interstellar.id,
      userId: andrey.id,
    },
  });

  const andreysRatings = [andreyRatesForrestGump, andreyRatesInterstellar];

  // Peter Ratings
  const peterRatesTheOrphan = await client.starRating.create({
    data: {
      score: 1,
      userId: peter.id,
      movieId: theOrphan.id,
    },
  });
  const peterRatesTheTitanic = await client.starRating.create({
    data: {
      score: 1,
      userId: peter.id,
      movieId: theTitanic.id,
    },
  });
  const peterRatesForrestGump = await client.starRating.create({
    data: {
      score: 2,
      userId: peter.id,
      movieId: forrestGump.id,
    },
  });

  const petersRatings = [
    peterRatesTheOrphan,
    peterRatesTheTitanic,
    peterRatesForrestGump,
  ];

  const allRatings = [
    ...jonsRatings,
    ...petersRatings,
    ...rachelsRatings,
    ...andreysRatings,
  ];

  return {
    users,
    allMovies,
    allRatings,
    jonsRatings,
    rachelsRatings,
    andreysRatings,
    petersRatings,
    moviesEarlierThan90s,
    moviesBetween2000And2010,
    moviesAfter2010,
    pgMovies,
    pg13Movies,
    rMovies,
  };
};
