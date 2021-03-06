import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
        totalQuantity: 0,
        cartChanged: false,
    },
    reducers: {
        replaceCart(state, action) {
            
            state.totalQuantity = action.payload.totalQuantity;
            state.items = action.payload.items;
          },
        addItemToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find(
                (item) => item.id === newItem.id
            );
            state.totalQuantity++;
            state.cartChanged = true;
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
            state.cartChanged = true;
            if(existingItem.quantity === 1){
                state.items = state.items.filter(item => item.id !== id);//when the condition its true (item.id !== id) it keeps the item in the array, and when condition is false it filters the item out
            } else {
                existingItem.quantity--;
                existingItem.totalPrice -= existingItem.price;
            }

        },
    },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
