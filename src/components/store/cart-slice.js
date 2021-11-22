import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from './ui-slice';
import { doc, setDoc } from "firebase/firestore/lite";
import { db } from "../../services/firebase-config";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
        totalQuantity: 0,
    },
    reducers: {
        addItemToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find(
                (item) => item.id === newItem.id
            );
            state.totalQuantity++;
            if (!existingItem) {
                state.items.push({
                    id: newItem.id,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    name: newItem.title,
                });
            } else {
                existingItem.quantity++;
                existingItem.totalPrice += newItem.price;
            }
        },
        removeItemToCart(state,action) {
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            state.totalQuantity--;
            if(existingItem.quantity === 1){
                state.items = state.items.filter(item => item.id !== id);//when the condition its true (item.id !== id) it keeps the item in the array, and when condition is false it filters the item out
            } else {
                existingItem.quantity--;
                existingItem.totalPrice -= existingItem.price;
            }

        },
    },
});

export const sendCartData = (cart) => {
    return async (dispatch) => {
        const sendCartToFireStore = async () => {    
            dispatch(
                uiActions.showNotification({
                    status: "pending",
                    title: "Sending",
                    message: "Sending cart data",
                })
            );
            try {
                await setDoc(doc(db, "cart", "cart1"), {
                    items: cart.items,
                    totalQuantity: cart.totalQuantity,
                });
            } catch (err) {
                throw new Error('Sending cart data failed!');
            } 
            dispatch(
                uiActions.showNotification({
                    status: "success",
                    title: "Success!",
                    message: "Cart data stored successfully",
                })
            ); 
        };        
        
        sendCartToFireStore().catch((error) => {
            dispatch(
                uiActions.showNotification({
                    status: "error",
                    title: "Error!",
                    message: "Sending cart data failed!",
                })
            );    
        });
    };
};

export const cartActions = cartSlice.actions;

export default cartSlice;
