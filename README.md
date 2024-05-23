# Restaurant Menu API

## Description
This API provides data for a restaurant menu application using Node.js and GraphQL.

## Installation

### Running Locally

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/restaurant-menu-api.git
    cd restaurant-menu-api
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Start the server:
    ```sh
    npm start
    ```

The server will be running at `http://localhost:4000/graphql`.

### Running with Docker

1. Build the Docker image:
    ```sh
    docker build -t restaurant-menu-api .
    ```

2. Run the Docker container:
    ```sh
    docker run --rm -p 4000:4000 restaurant-menu-api
    ```

The server will be running at `http://localhost:4000/graphql`.

## Testing
1. Run tests:
    ```sh
    npm test
    ```
2. Test with postman using [included postman collection](https://github.com/cohenaj194/restaurant-menu-api/blob/master/postman-collection.json)

<img width="1058" alt="image" src="https://github.com/cohenaj194/restaurant-menu-api/assets/17516896/c3d968c5-96f2-4cb0-a3ac-c91a038f4adf">

<img width="1055" alt="image" src="https://github.com/cohenaj194/restaurant-menu-api/assets/17516896/fe0e81b9-17a9-4842-9a96-fd56b04ecc27">

3. Test Public app at `http://159.203.158.82` or `http://restaurant.saddlebagexchange.com`

## Notes
- This API uses Apollo Server to handle GraphQL queries.
- Automated tests are implemented using Jest and Supertest.
