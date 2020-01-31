import { ApolloServer } from 'apollo-server-azure-functions';
import { ApolloGateway } from '@apollo/gateway';

const gateway = new ApolloGateway({
    serviceList: [
        // { name: 'products', url: 'http://localhost:7072/products' },
        // { name: 'reviews', url: 'http://localhost:7071/reviews' },
        { name: 'products', url: 'https://rherber-gql-products.azurewebsites.net/products' },
        { name: 'reviews', url: 'https://rherber-gql-reviews.azurewebsites.net/reviews' },
    ],
});

const server = new ApolloServer({
    gateway,
    subscriptions: false,
});

export default server.createHandler();
