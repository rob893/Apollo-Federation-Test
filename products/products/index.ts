import { ApolloServer, gql } from 'apollo-server-azure-functions';
import { buildFederatedSchema } from '@apollo/federation';

interface Product {
    id: string;
    name: string;
    price: number;
}

const products: Product[] = [
    {
        id: '1',
        name: 'Desk',
        price: 5
    },
    {
        id: '2',
        name: 'Chair',
        price: 4
    },
    {
        id: '3',
        name: 'Lamp',
        price: 2
    }
];

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
    type Query {
        products: [Product]!
    }

    type Product @key(fields: "id") {
        id: String!
        name: String!
        price: Int
    }
`;

// Provide resolver functions for your schema fields
const resolvers = {
    Query: {
        products(): Product[] {
            return products;
        },
    },
    Product: {
        __resolveReference(product: Product, {}): Product {
            return products.find(p => p.id === product.id);
        }
    }
};

const server = new ApolloServer({
    schema: buildFederatedSchema([{ typeDefs, resolvers }])
});

export default server.createHandler();
