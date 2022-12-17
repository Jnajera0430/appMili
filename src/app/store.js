import {configureStore} from '@reduxjs/toolkit';
import appMiliReducer from '../features/appMili/appmiliSlice'
export const store = configureStore(
    {
        reducer:{
            datos: appMiliReducer
        }
    }
);