// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

/*****************************************************************
* Any file inside the folder pages/api is mapped to /api/* and   *
* will be treated as an API endpoint instead of a page           *
******************************************************************/

import { GraphQLClient, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
const graphcmsToken = process.env.GRAPHCMS_TOKEN;