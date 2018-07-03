
export default function reducer(
  state = {
    subReddits: [],
    status: {
      fetching: false,
      fetched: false,
      error: null,
    }
  },
  action = { type: null, payload: null },
) {
  if (action.type) {
    if (action.type === 'FETCH_SUBREDDITS') {
      return {
        ...state,
        status: {
          ...state.status,
          fetching: true,
          fetched: false,
          error: null,
        }
      };
    }

    if (action.type === 'FETCH_SUBREDDITS_SUCCESS') {
      return {
        ...state,
        subReddits: [...state.subReddits, ...action.payload],
        status: {
          ...state.status,
          fetching: false,
          fetched: true,
        }
      };
    }
  }

  if (action.type === 'FETCH_SUBREDDITS_FAILED') {
    return {
      ...state,
      status: {
        ...state.status,
        fetching: false,
        fetched: false,
        error: action.payload
      }
    };
  }

  return { ...state };
}
