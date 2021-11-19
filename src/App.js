import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { doc, setDoc } from "firebase/firestore/lite";
import { db } from "./services/firebase-config";
import { uiActions } from "./components/store/ui-slice";
import Notification from './components/UI/Notifications';

let initialLoad = true;

function App() {
    const dispatch = useDispatch();
    const showCart = useSelector((state) => state.ui.cartIsVisible);
    const cart = useSelector((state) => state.cart);
    const notification = useSelector(state => state.ui.notification);

    useEffect(() => {
        if (initialLoad) {
            initialLoad = false;
            return;
        }

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

        sendCartToFireStore().catch((error) => {
            dispatch(
                uiActions.showNotification({
                    status: "error",
                    title: "Error!",
                    message: "Sending cart data failed!",
                })
            );
        });
    }, [cart, dispatch]);

    return (
      <Fragment>
        {notification && <Notification status={notification.status} title={notification.title} message={notification.message} />}
        <Layout>
            {showCart && <Cart />}
            <Products />
        </Layout>
      </Fragment>
    );
}

export default App;
