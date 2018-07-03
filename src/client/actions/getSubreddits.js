import axios from 'axios';

export default function getSubreddits() {
  let offset = 0;
  return function action(dispatch) {
    console.log('subreddit call', offset);
    dispatch({ type: 'FETCH_SUBREDDITS' });
    axios.get(`/api/subreddits/?offset=${offset}`)
      .then((res) => {
        dispatch({
          type: 'FETCH_SUBREDDITS_SUCCESS',
          payload: res.data
        });
        offset++;
        if (offset > 9) {
          return;
        }
        setTimeout(() => action(dispatch), 2000);
      })
      .catch(err => (
        dispatch({ type: 'FETCH_SUBREDDITS_FAILED', payload: err })
      ));
  };
}

