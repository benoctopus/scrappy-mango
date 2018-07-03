
export default function reducer(
  state = {
    subReddits: [],
    status: {
      fetching: false,
      fetched: false,
      error: null,
    },
    currentSub: 'popular',
    offset: 0,
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
    } else if (action.type === 'FETCH_SUBREDDITS_SUCCESS') {
      return {
        ...state,
        subReddits: [...state.subReddits, ...action.payload],
        status: {
          ...state.status,
          fetching: false,
          fetched: true,
        }
      };
    } else if (action.type === 'FETCH_SUBREDDITS_FAILED') {
      return {
        ...state,
        status: {
          ...state.status,
          fetching: false,
          fetched: false,
          error: action.payload
        }
      };
    } else if (action.type === 'CHANGE_SUBREDDIT') {
      return {
        ...state,
        ...action.payload,
        offset: 0,
      };
    } else if (action.type === 'NEXT_OFFSET') {
      return {
        ...state,
        offset: state.offset + 1,
      };
    } else if (action.type === 'PREVIOUS_OFFSET') {
      return {
        ...state,
        offset: state.offset - 1,
      };
    }
  }
  return { ...state };
}
