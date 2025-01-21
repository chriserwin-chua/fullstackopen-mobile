import { gql } from '@apollo/client';

export const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    id
    username
    createdAt
    reviews(first: $first, after: $after) {
      totalCount
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
    reviewCount
  }
`;

export const REVIEW_FRAGMENT = gql`
  fragment ReviewFragment on Review {
  }
`;
