import axios from 'axios';

export default function getSubreddits() {
  const offset = 0;
  return function action(dispatch) {
    const get = () => {
      axios.get(`/api/subreddits/?offset=${offset}`)
        .then((res) => {
          if (res.data.loading) {
            console.log('loading sub reddits');
            setTimeout(get, 1000);
          } else {
            dispatch({
              type: 'FETCH_SUBREDDITS_SUCCESS',
              payload: res.data
            });
          }
        // offset++;
        // if (offset > 9) {
        //   return;
        // }
        // // setTimeout(() => action(dispatch), 2000);
        })
        .catch(err => (
          dispatch({ type: 'FETCH_SUBREDDITS_FAILED', payload: err })
        ));
    };

    dispatch({ type: 'FETCH_SUBREDDITS' });
    get();
  };
}

