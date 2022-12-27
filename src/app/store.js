import {configureStore} from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { restApi } from './appMiliSlice';
export const store = configureStore(
    {
        reducer:{
            [restApi.reducerPath]: restApi.reducer
        },
        middleware:(getDefaultMiddleware)=>
            getDefaultMiddleware().concat(restApi.middleware)
    }
);

setupListeners(store.dispatch);