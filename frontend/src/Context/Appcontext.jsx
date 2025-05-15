import { createContext, useEffect, useState } from "react";
import axios from 'axios'

export const Appcontext = createContext(null);

const Contextprovider = (props) => {

  const [cartitems, setCartitems] = useState({});


  //fetch the food_list data from backend
  const [food_list, setFoodlist] = useState([]);

  const fetchfood = async () => {
    const response = await axios.get(url + '/api/food/list')
    setFoodlist(response.data.data)
  }

  //form logics
  const url = 'http://localhost:4000'
  const [token, setToken] = useState('');
  


  const addcart = async (itemid) => {
    if (!cartitems[itemid]) {
      setCartitems((prev) => ({ ...prev, [itemid]: 1 }))
    }
    else {
      setCartitems((prev) => ({ ...prev, [itemid]: prev[itemid] + 1 }))
    }

    if (token) {
      await axios.post(url + "/api/cart/addcart", { itemid }, { headers: { token } })
    }
  }


  const removecart = async (itemid) => {
    setCartitems((prev) => ({ ...prev, [itemid]: prev[itemid] - 1 }))

    if (token) {
      await axios.post(url + "/api/cart/removecart", { itemid }, { headers: { token } })
    }
  }

  //getcart in ui even its refersh
  const getcart = async (token) => {
    const response = await axios.post(url + "/api/cart/getcart", {}, { headers: { token } })
    setCartitems(response.data.cartitems);
  }


  const totalamount = () => {
    let totalamount = 0;
    for (let item in cartitems) {
      if (cartitems[item] > 0) {
        let foodinfo = food_list.find((product) => product._id === item)
        totalamount += foodinfo.price * cartitems[item]
      }
    }
    return totalamount;
  }


  useEffect(() => {
    async function load() {
      await fetchfood();

      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"))
        getcart(localStorage.getItem("token"))
      }
    }
    load();
  }, [])


  const contextvalue = {
    food_list,
    cartitems,
    addcart,
    removecart,
    setCartitems,
    totalamount,
    url,
    setToken,
    token
  }
  return (
    <Appcontext.Provider value={contextvalue}>
      {props.children}
    </Appcontext.Provider>
  )
}

export default Contextprovider;