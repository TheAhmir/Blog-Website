// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

/*****************************************************************
* Any file inside the folder pages/api is mapped to /api/* and   *
* will be treated as an API endpoint instead of a page           *
******************************************************************/

import { GraphQLClient, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
const graphcmsToken = process.env.GRAPHCMS_TOKEN;

export default async function comments(req, res) {
  const { name, email, slug, comment } = req.body;
  const graphQLClient = new GraphQLClient(graphqlAPI, {
    headers: {
      authorization: `Bearer ${graphcmsToken}`,
    },
  })

  const query = gql`
    mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) {
      createComment(data: {
        name: $name,
        email: $email,
        comment: $comment,
        post: {
          connect: {
            slug: $slug
          }
        }
      }) {
        id
      }
    }
  `

  const variables = {
    name,
    email,
    comment,
    slug,
  }

  try {
    const result = await graphQLClient.request(query, variables);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to submit comment' });
  }
}

