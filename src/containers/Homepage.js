import { compose } from "react-komposer";
import Product from "../pages/Homepage";
// import Loader from "../components/Loader";
// import api from '../api';
// import store from '../store';

// const options = {
//   loadingHandler: () => <Loader />
// };

const fetch = async (props, onData) => {
  try {
    // const { user } = store.getState().auth;
    // const res = await api.products.find({ type: 'all', id: user && user.service });

    onData(null, {
      container: { products: "" }
    });
  } catch (e) {
    console.log("CUSTOM ERROR: ");
    console.log(e);
  }
};

const dataLoader = (props, onData) => {
  fetch(props, onData);
};

export default compose(
  dataLoader,
  // options
)(Product);
