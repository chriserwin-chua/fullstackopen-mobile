import { render, screen } from '@testing-library/react-native';
import { RepositoryListContainer } from '../components/RepositoryList';
describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      // Add your test code here
      render(<RepositoryListContainer repositories={repositories} />);

      //screen.debug();
      const repositoryItems = screen.getAllByTestId('repositoryItem');
      expect(repositoryItems.length).toBe(2);
      //name, description, language, forks count, stargazers count, rating average, and review count
      expect(repositoryItems[0]).toHaveTextContent(/jaredpalmer\/formik/);
      expect(repositoryItems[0]).toHaveTextContent(
        /Build forms in React, without the tears/
      );
      expect(repositoryItems[0]).toHaveTextContent(/TypeScript/);
      expect(repositoryItems[0]).toHaveTextContent(/1.6kForks/);
      expect(repositoryItems[0]).toHaveTextContent(/21.9kStars/);
      expect(repositoryItems[0]).toHaveTextContent(/88Rating/);
      expect(repositoryItems[0]).toHaveTextContent(/3Reviews/);
      //expect(screen.getByText('Hello Kalle!')).toBeDefined();
    });
  });
});
