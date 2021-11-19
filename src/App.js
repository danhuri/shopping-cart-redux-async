import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { doc, setDoc } from "firebase/firestore/lite";
import { db } from './services/firebase-config';

let initialLoad = true;

function App() {
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector(state => state.cart);

  useEffect(() => {
    if (initialLoad) {
      initialLoad = false;
      return;
    }
    const sendCartToFireStore = async () => {
      await setDoc(doc(db, "cart", "cart1"), {
        items: cart.items,
        totalQuantity: cart.totalQuantity,
      });
    };
    
    sendCartToFireStore();

  }, [cart]);

  return (
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
