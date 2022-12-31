import { createAction, createReducer, configureStore, current } from '@reduxjs/toolkit'
import { Get_Users_Action, Signedin } from './Actions'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const persistConfig = {
    key: 'root',
    storage,
}

const reducers = createReducer({
    userDetails: [],
    Products: [],
    signedin: false,
    user: {},
    change: 1,
}, (builder) => {
    builder
        .addCase("Get_Users", (state, action) => {
            state.userDetails = action.payload
        })
        .addCase("Add_User", (state, action) => {
            state.userDetails.push(action.payload)
            state.change += 1
            console.log(state.userDetails)
        }

        )
        .addCase("signedin", (state) => {
            state.signedin = true
        })
        .addCase("Get_Products", (state, action) => {
            state.Products = action.payload
        })
        .addCase("Get_user", (state, action) => {
            state.user = action.payload
        })
        .addCase("Put_Products", (state, action) => {
            state.change += 1;
            let arr = action.payload
            let products = state.Products;
            for (let i = 0; i < products.length; i++) {
                if (products[i].id == arr.id) {
                    products[i] = arr;
                    break;
                }
                else {
                    continue;
                }
            }
            state.Products = products
            console.log(current(state.Products))
        }
        )
        .addCase("Delete_Products", (state, action) => {
            let arr = []
            let products = state.Products;
            for (let i = 0; i < products.length; i++) {
                if (products[i].id != action.payload) {
                    arr.push(products[i])
                }
            }
            console.log(arr.length)
            state.change += 1
            state.Products = arr
        }
        )
        .addCase("Add_Products", (state, action) => {
            state.change += 1
            state.Products.push(action.payload)

        })
        .addCase("Sign_out", (state) => {
            state.signedin = false;
        })

})
const persistedreducer = persistReducer(persistConfig, reducers)

export const Store = configureStore({ reducer: persistedreducer })
export const persistor = persistStore(Store)

