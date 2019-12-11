import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export default reducers => {
  return persistReducer(
    {
      key: 'gobarber',
      storage,
      whitelist: ['auth', 'user'],
      blacklist: [],
    },
    reducers
  );
};
