import axios from 'axios';

export default function getSubreddits() {
  return function action(dispatch) {
    dispatch({ type: 'FETCH_SUBREDDITS' });
    axios.get('https://www.reddit.com/reddits.json')
      .then(res => (
        // console.log(res.data.data)
        dispatch({
          type: 'FETCH_SUBREDDITS_SUCCESS',
          payload: res.data.data.children
            .map(sub => sub.data.url.split('/')[2])
        })
      ))
      .catch(err => (
        dispatch({ type: 'FETCH_SUBREDDITS_FAILED', payload: err })
      ));
  };
}
