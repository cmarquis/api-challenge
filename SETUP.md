# Setup

## Dependencies
- Node 18
- Chrome

## Run
1. Clone the repository to your local machine
2. Install dependencies with `npm install`
3. Run `npm start` to launch the web server

## Usage

Once the web server is successfully started it should be reachable at localhost:8080.

Currently there are two endpoints available:
- POST /get-reference - returns a reference record that can later be used to lookup the results
  - Content-Type: application/json
  - Request Schema: `{url: string}`
  - Result Schema: `{id: string, url: string, createdAt: number}`
  - Example: ```curl -X POST http://localhost:8080/get-reference -H 'Content-Type: application/json' -d '{"url": "https://vizionapi.com"}'```
- GET /get-result/:referenceId - returns a result containing the information gathered from the requested url
  - Result Schema: `{id: string, referenceId: string, createdAt: number, data: {title: string, meta: {name: string, content: string}}}`
  - Example: ```curl http://localhost:8080/get-result/c0b0a533-57a8-4523-8033-ff813bc6f7db```