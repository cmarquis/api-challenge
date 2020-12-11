# Vizion API Challenge

👋 Hi there!

In this project, you'll build a simple API that fetches some info about a given URL/webpage and makes the results accessible. The goal of this project is to see how you approach a problem and set of requirements given few constraints on how to approach it.

For reference, our stack is heavily based on TypeScript & Node.js and we use PostgreSQL for our primary database. How you tackle this project is entirely up to you however!

# Setting Up

This project requires you to have Node.js installed. We recommend the [active LTS release](https://nodejs.org/en/about/releases/).

1. Start by cloning this repository.
2. Inside the project root directory, run `npm install` to install dependencies.
3. Run `npm run seed` to seed the SQLite database with some starting data. **This command drops existing tables if they exist**. The database is located at `db.sqlite` inside the project root.
4. Run `npm start` which will start the server as well as the React client app.

# Requirements

Develop a [RESTful](https://restfulapi.net/) API to complete the following:

#### 1. Create a New Reference

- Add an endpoint to that accepts a URL in the request body and create and return a new [`Reference`](#reference) record as JSON.
- During this process, you should also initiate an asynchronous task to fetch data from the URL saved in the [`Reference`](#reference). [More information on fetching data is below](#data-fetching-notes).
- **Note:** The endpoint should return the [`Reference`](#reference) record without waiting for it to be processed.

#### 2. Process the New Reference

- Implement an async worker function that processes the reference. This function should take a [`Reference`](#reference) as an argument.
- Given the [`Reference`](#reference) `url` field, get the text content from the page's `title` and `meta name="description"` elements (if they exist).
- Return the data as an object and create a new [`Result`](#result) record in the database, storing the info as JSON or a serialized string into the record's `data` column.

#### 3. Make the Results Accessible

- Add another GET endpoint that allows a user to fetch results for a given [`Reference`](#reference) ID. This endpoint should return a list of results that have been saved for the given [`Result`](#result) as JSON. Don't forget to keep it RESTful and keep [resource naming best practices](https://restfulapi.net/resource-naming/) in mind as you go.

## Data Fetching Notes

In your processing task, you'll need to fetch the contents of a webpage and extract information from its DOM. To do this we recommend either fetching the HTML via an HTTP request and parsing the markup into a traversable DOM using libraries like [JSDOM](https://github.com/jsdom/jsdom) & [Cheerio](https://cheerio.js.org/), or using browser automation tools like [Puppeteer](https://github.com/puppeteer/puppeteer) & [Playwright](https://playwright.dev/).

# Data Models

## Reference

A reference is created when a user makes a call to `POST /references`

| Field        | Type        | Description              |
| ------------ | ----------- | ------------------------ |
| `id`         | primary key | the reference identifier |
| `url`        | string      | a valid web address      |
| `created_at` | timestamp   | reference created time   |

## Result

A result is created after a data fetching task for a `Reference` is completed.

| Field          | Type        | Description                   |
| -------------- | ----------- | ----------------------------- |
| `id`           | primary key | the reference identifier      |
| `reference_id` | foreign key | the related reference         |
| `data`         | json        | Result from the fetching task |
| `created_at`   | timestamp   | result created time           |

# Bonus Points

Other things that are not required but we would love to see:

- Test coverage (We tend to use [Jest](https://jestjs.io/)
- Additional validations
- More endpoints (fetch all references, delete a reference & its results, etc.)
- Make use of an actual job queue (Redis, ElasticMQ, etc)
- Anything else you can think of!

If you don't get a chance to implement bonus items, no worries. Feel free to share some notes of things you might do and how you might have gone about them given more time.

# Submitting Your Work

**‼️ Be sure to commit your changes to the main branch before submitting ‼️**

When you have finished the exercise, please create a bundle of your work by running `npm run bundle` in the project root.

This will create a bundle file called `take-home-challenge.bundle` based on your local main branch. Send the file to us via email or if you received a submission link from your hiring manager, please upload it there.

Thank you and good luck! 🙏
