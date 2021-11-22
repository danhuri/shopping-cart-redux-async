import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";
import { doc, setDoc, collection, getDocs } from "firebase/firestore/lite";
import { db } from "../../services/firebase-config";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const cartCollection = collection(db, "cart");
      const cartDocumentSnapshot = await getDocs(cartCollection);
      const cart = cartDocumentSnapshot.docs.map((doc) => doc.data());      
      return cart["0"];
    };

    try {
      const cartObj = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: cartObj.items,
          totalQuantity: cartObj.totalQuantity,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Fetching cart data failed!",
        })
      );
    }
  };
};

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
        throw new Error("Sending cart data failed!");
      }
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Cart data stored successfully",
        })
      );
    };

    await sendCartToFireStore().catch((error) => {
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
