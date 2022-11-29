# Madbox - Backend

This project was created as a home assignment test to evaluate my skills on a fullstack project.

## Documentation

I've decided to go with a Node.js, Express, and Typescript as recommended on the documentation.

After some tests with Firebase database I decided to try MongoDB and main deciding point was the ability to return a random document (Word) from the collection. Both tools offers a useful free tier that let me do tests and compare the performance. Offloading the random document to their server actually made the app lighter and faster.

I used Mongoose library to simplify the communications with the database, even if I had to create a couple extra definitions on the Typescript configurations for the document.

Finding the translation service was a bit harder than I expected, specially considering that most APIs I've found was paid and it would be against the rules. After digging a bit on the RapidAPI service, I ran some tests with different providers and Microsoft Translator offered the best result for the amount of requests I could run per month on the free tier.

I decided to implement the extra feature of adding a difficulty level to the words, randomly setting it's value when populating the database. Then this difficulty value could be sent on the request to return a word with that level.

### Points that should be improved:

Tests should be implemented on the project to ensure quality and stability, running it on the build process only deploying once every test passes.

The difficulty could actually be fed according to the answers of real life usage. Wrong answers would increase the difficulty of the word, correct ones would lower it's value. Mainly one of the other possibilities for the extra challenge.

We should save the translated value on the database so as to improve the speed and not having to rely on external system that should, in theory, always return the same value if the requisition is the same.

## How long it took for you to build this application

More than I would like to say, but on time for the requirement of the project. 😅

Finding the translation service and deciding on the database took me a couple days (working after my regular hours). Remembering all Typescript details and structuring the project took me some extra 12 hours in total for the front and backend.

## API Reference

#### Get item

```http
  GET /api/verb
```

| Parameter    | Type      | Description                        |
| :----------- | :-------- | :--------------------------------- |
| `difficulty` | `integer` | Defines the difficulty of the word |

Returns a JSON object of a random French word with translation and difficulty.

#### Populate MongoDB

```http
  GET /api/populate
```

| Parameter | Type      | Description                             |
| :-------- | :-------- | :-------------------------------------- |
| `force`   | `boolean` | Optional. To force refill the database. |

Command to run and populate a MongoDB collection from file.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`: port to run server (default 3000).

`WORDS_FILE`: name of the file with the list of words.

`LIST_SIZE`: number of words that will be sent to the database.

`MONGO_CONNECTION_STRING`: MongoDB connection string.

`RAPID_API_X_RAPIDAPI_KEY`: RapidAPI Key.

## Running and building the project

Install dependencies:

```bash
  npm install
```

Run the development server:

```bash
  npm run dev
```

Build the production version:

```bash
  npm run build
```

Run the production server:

```bash
  npm run start
```
