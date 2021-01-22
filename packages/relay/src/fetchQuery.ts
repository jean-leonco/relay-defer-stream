import { RequestParameters, Variables } from 'relay-runtime';

import { getRequestBody, GRAPHQL_URL, handleData, isMutation } from './helpers';

const fetchQuery = async (request: RequestParameters, variables: Variables) => {
  const body = getRequestBody(request, variables);

  try {
    const response = await fetch(GRAPHQL_URL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body,
    });

    const data = await handleData(response);

    if (typeof data === 'string') {
      throw data;
    }

    if (isMutation(request) && data.errors) {
      throw data;
    }

    if (!data.data) {
      throw data.errors;
    }

    return data;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('fetchQuery error:', err);

    throw err;
  }
};

export default fetchQuery;
