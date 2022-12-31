import { createAction } from '@reduxjs/toolkit'
export function getProducts(products) {
    fetch("http://localhost:3212/products").then(response => response.json())
        .then(data => {
            products(data)

        })

}
export function getUsers(users) {
    fetch(" http://localhost:3211/userdata").then(res => res.json())
        .then(data => {

            users(data)
        })

}
export const PUT_Products_Action = createAction("Put_Products")
export const Delete_Products_Action = createAction("Delete_Products")
export const Add_Products_Action = createAction("Add_Products")
export const Get_Users_Action = createAction("Get_Users");
export const Get_Products_Action = createAction("Get_Products"
);
export const Add_User_Action = createAction("Add_User")
export const Get_User_Action = createAction("Get_user");
export const Signout_user = createAction("Sign_out");

export const Signedin = createAction("signedin");