import { GraphQLClient, gql } from 'graphql-request';
import fs from 'fs';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
const graphcmsToken = process.env.GRAPHCMS_TOKEN;

export default async function createAndPublishImage(req, res) {
  const { image } = req.body;
  const graphQLClient = new GraphQLClient(graphqlAPI, {
    headers: {
      authorization: `Bearer ${graphcmsToken}`,
    },
  });
  {console.log(image)}
  // Read the image file
  const imageBuffer = fs.readFileSync(image.path);
  const imageBase64 = imageBuffer.toString('base64');

  const mutation = gql`
    mutation CreateAndPublishImage($imageBase64: String!) {
      createAsset(data: {
        file: {
          upload: $imageBase64
        }
      }) {
        id
        url
        handle
        mimeType
      }
      
      publishAsset(where: {id: $assetId}, to: PUBLISHED) {
        id
      }
    }
  `;

  const variables = {
    imageBase64,
    assetId: null, // Define the assetId variable
  };

  try {
    const result = await graphQLClient.request(mutation, variables);

    // Extract the created image asset ID
    const assetId = result.createAsset.id;

    // Publish the asset
    await graphQLClient.request(
      gql`
        mutation PublishAsset($assetId: ID!) {
          publishAsset(where: {id: $assetId}, to: PUBLISHED) {
            id
          }
        }
      `,
      { assetId }
    );

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create and publish image' });
  }
}
