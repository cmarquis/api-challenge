# Vizion API Challenge

:wave: Hi there!

In this project, you'll build a simple API that fetches some info about a given URL/webpage and makes the results accessible. The goal of this project is to see how you approach a given problem & set of requirements with little constraint on how to approach it.

- [Vizion API Challenge](#vizion-api-challenge)
- [Setting Up](#setting-up)
- [Requirements](#requirements)
  - [Create a New Reference](#1-create-a-new-reference)
  - [Process the New Reference](#2-process-the-new-reference)
  - [Make the Results Accessible](#3-make-the-results-accessible)
  - [Data Fetching Notes](#data-fetching-notes)
- [Bonus Points](#bonus-points)
  - [Submitting Your Work](#submitting-your-work)

# Setting Up

To get started, make sure you have Node.js installed. We recommend the [active LTS release](https://nodejs.org/en/about/releases/). Afterward, clone this repository. The project will contain an empty `index.js` file you're free to begin working in. If you have another approach in mind, just delete this file.

FYI, our stack is largely based on TypeScript & Node.js. We use PostgreSQL for our primary database, but any relational database is fine. **How you tackle this project is entirely up to you!**

# Requirements

Develop a [RESTful](https://restfulapi.net/) API to complete the following:

#### 1. Create a New Reference

- Add an endpoint that accepts a URL in the request body and create and return a new [`Reference`](#reference) record as JSON.
- During this process, you should also initiate an asynchronous task to fetch data from the URL saved in the [`Reference`](#reference). [More information on fetching data is below](#data-fetching-notes).
- **Note:** The endpoint should return the [`Reference`](#reference) record without waiting for it to be processed.

#### 2. Process the New Reference

- Implement an async worker function that processes the reference. This function should take a [`Reference`](#reference) as an argument.
- Given the [`Reference`](#reference) `url` field, get the text content from the page's `title` and `meta name="description"` elements (if they exist).
- Return the data as an object and create a new [`Result`](#result) record in the database, storing the info as JSON or a serialized string into the record's `data` column.

#### 3. Make the Results Accessible

- Add another GET endpoint that allows a user to fetch results for a given [`Reference`](#reference) ID. This endpoint should return a list of saved results for a given [`Result`](#result) as JSON. Don't forget to keep it RESTful and keep [resource naming best practices](https://restfulapi.net/resource-naming/) in mind as you go.

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

Other things that are not required, but we would love to see:

- Test coverage (We tend to use [Jest](https://jestjs.io/))
- Additional validations
- More endpoints (fetch all references, delete a reference & its results, etc.)
- Make use of an actual job queue (Redis, ElasticMQ, etc.)
- Anything else you can think of!

Suppose you don't implement bonus items, no worries. Feel free to share some notes of things you might do and how you might have gone about them given more time.

# Submitting Your Work

**:bangbang: Be sure to commit your changes to the main branch before submitting :bangbang:**

When you have finished the exercise, please create a bundle of your work by running `npm run bundle` in the project root.

This will create a bundle file called `take-home-challenge.bundle` based on your local main branch. Send the file to us via email, or if you received a submission link from your hiring manager, please upload it there.

Thank you, and good luck! :pray:
