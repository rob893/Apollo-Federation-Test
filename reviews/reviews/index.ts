import { ApolloServer, gql } from 'apollo-server-azure-functions';
import { buildFederatedSchema } from '@apollo/federation';

interface Product {
    id: string;
    name: string;
    price: number;
}

interface Review {
    id: string;
    text: string;
    productId: string;
    product?: Product;
}

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
    type Query {
        reviews: [Review]!
    }

    type Review {
        id: String!
        text: String!
        productId: String!
        product: Product!
    }

    extend type Product @key(fields: "id") {
        id: String! @external
    }
`;

// Provide resolver functions for your schema fields
const resolvers = {
    Query: {
        reviews(): Review[] {
            return [
                {
                    id: '1',
                    text: 'this desk blows',
                    productId: '1'
                },
                {
                    id: '2',
                    text: 'this desk is great',
                    productId: '1'
                },
                {
                    id: '3',
                    text: 'this chair is nice',
                    productId: '2'
                },
            ];
        },
    },
    Review: {
        product(review: Review) {
            return { __typename: 'Product', id: review.productId };
        }
    }
};

const server = new ApolloServer({
    schema: buildFederatedSchema([{ typeDefs, resolvers }])
});

export default server.createHandler();
