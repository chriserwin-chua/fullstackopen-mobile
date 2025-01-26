import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';
const useRepositories = (sortBy, keyword) => {
  const [repositories, setRepositories] = useState();
  const [loading, setLoading] = useState(false);
  const { data, loading: isLoading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    // Other options
    variables: {
      orderBy: sortBy
        ? sortBy.includes('CREATED_AT')
          ? 'CREATED_AT'
          : 'RATING_AVERAGE'
        : 'CREATED_AT',
      orderDirection: sortBy
        ? sortBy.includes('ASC')
          ? 'ASC'
          : 'DESC'
        : 'DESC',
      searchKeyword: keyword ?? '',
    },
  });
  const fetchRepositories = async () => {
    setLoading(true);

    setLoading(isLoading);
    setRepositories(data.repositories);
  };
  useEffect(() => {
    if (!isLoading) fetchRepositories();
  }, [isLoading]);

  return { repositories, loading, refetch: fetchRepositories };
};

export default useRepositories;
