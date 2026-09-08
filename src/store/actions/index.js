import { data } from "react-router-dom";
import api from "../../api/api";
import toast from "react-hot-toast";
import PaymentMethod from "../../components/checkout/PaymentMethod";


export const fetchProducts = (queryString) => async (dispatch) => {
  try {
   dispatch({type: "IS _FETCHING"})

       const { data } = await api.get(`/public/products?${queryString}`);
    console.log("API DATA =", data);

    dispatch({
      type: "FETCH_PRODUCTS",
      payload: data.content,
      pageNumber: data.pageNumber,
      pageSize: data.pageSize,
      totalElements: data.totalElements,
      totalPages: data.totalPages,
      lastPage: data.lastPage,
    });
    dispatch({type: "IS _SUCCESS"})
  } catch (error) {
    console.error(error);
    dispatch({
      type: "IS _ERROR",
      payload: error?.response?.data?.message || "Failed  to fetch products",

    })
  }
};



export const fetchCategories = (queryString) => async (dispatch) => {
  try {
   dispatch({type: "CATEGORY_LOADER"})

      const { data } = await api.get(`/public/categories`);
    console.log("API DATA =", data);
 
    dispatch({
      type: "FETCH_CATEGORIES",
      payload: data.content,
      pageNumber: data.pageNumber,
      pageSize: data.pageSize,
      totalElements: data.totalElements,
      totalPages: data.totalPages,
      lastPage: data.lastPage,
    });
    dispatch({type: "IS_ERROR"})
  } catch (error) {
    console.error(error);
    dispatch({
      type: "IS _ERROR",
      payload: error?.response?.data?.message || "Failed  to fetch categories",

    })
  }
};
export const addToCart=(data,qty=1,toast) =>
  (dispatch,getState)=>{

    //find the product
    const {products } = getState().products;
    const getProduct = products.find(
      (item) => item.productId === data.productId
    );

    //check for stocks
    const isQuantityExist = getProduct.quantity >= qty;

    //If in stock ->add
    if(isQuantityExist){
      dispatch({type:"ADD_CART",payload:{...data,quantity:qty}});
       toast.success(`${data.productName} added to the cart`);
      localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
    }else{
      //error
        toast.error(" Out of Stock ");
    }

};


export const increaseCartQuantity =
(data, toast, currentQuantity, setCurrentQuantity) =>
async (dispatch, getState) => {

    let products = getState().products.products;

    // Agar products empty hain to API se le aao
    if (products.length === 0) {

        const { data: response } = await api.get("/public/products");

        products = response.content;

        dispatch({
            type: "FETCH_PRODUCTS",
            payload: response.content,
            pageNumber: response.pageNumber,
            pageSize: response.pageSize,
            totalElements: response.totalElements,
            totalPages: response.totalPages,
            lastPage: response.lastPage,
        });
    }

    const getProduct = products.find(
        item => item.productId === data.productId
    );

    if (!getProduct) {
        toast.error("Product Not Found");
        return;
    }

    if (getProduct.quantity > currentQuantity) {

        const newQty = currentQuantity + 1;

        setCurrentQuantity(newQty);

        dispatch({
            type: "ADD_CART",
            payload: {
                ...data,
                quantity: newQty,
            }
        });

        localStorage.setItem(
            "cartItems",
            JSON.stringify(getState().carts.cart)
        );

    } else {
        toast.error("Out Of Stock");
    }
};


export const decreaseCartQuantity =
(data, newQuantity) => (dispatch, getState) => {
    dispatch({
      type:"ADD_CART",
      payload:{...data,quantity : newQuantity},
    });
    localStorage.setItem("cartItems",JSON.stringify(getState().carts.cart));
}


export const removeFromCart = (data, toast) => (dispatch, getState) => {
  dispatch({
    type: "REMOVE_CART",
    payload: data.productId,
  });

  toast.success(`${data.productName} removed from cart`);

  localStorage.setItem(
    "cartItems",
    JSON.stringify(getState().carts.cart)
  );
};


export const authenticateSignInUser =
  (sendData, toast, reset, navigate, setLoader) =>
  async (dispatch) => {
    try {
      setLoader(true);

      const { data } = await api.post("/auth/signin", sendData);

      dispatch({
        type: "LOGIN_USER",
        payload: data,
      });

      localStorage.setItem("auth", JSON.stringify(data));

      reset();  

      toast.success("Login Success");

      navigate("/");

    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data?.message || "Internal Server Error"
      );

    } finally {
      setLoader(false);
    }
  };


export const registerNewUser =
  (sendData, toast, reset, navigate, setLoader) =>
  async (dispatch) => {
    try {
      setLoader(true);

      const { data } = await api.post("/auth/signup", sendData);

      reset();  

      toast.success(data?.message || "User Registered Successfully");

      navigate("/login");

    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data?.message || error?.response?.data?.password || "Internal Server Error"
      );

    } finally {
      setLoader(false);
    }
  };


  export const logOutUser = (navigation) => (dispatch) => {
    dispatch({type: "LOG_OUT"});
    localStorage.removeItem("auth");
    navigation("/login");
  };


  export const addUpdateUserAddress =
(sendData, toast, addressId, setOpenAddressModel) =>
async (dispatch) => {

    dispatch({ type: "BUTTON_LOADER" });

    try {

        if (!addressId) {

            await api.post("/addresses", sendData);

        } else {

            console.log("Address ID =", addressId);

            await api.put(`/addresses/${addressId}`, sendData);

        }

        dispatch(getUserAddress());

        toast.success("Address saved Successfully");

        dispatch({ type: "IS_SUCCESS" });

    } catch (error) {

        console.log(error);

        toast.error(
            error?.response?.data?.message || "Internal Server Error"
        );

        dispatch({
            type: "IS_ERROR",
            payload: null,
        });

    } finally {

        setOpenAddressModel(false);

    }
};
  
export const getUserAddress = (queryString) => async (dispatch,getState) => {
  try {
   dispatch({type: "IS_FETCHING"})

      const { data } = await api.get(`/addresses`);
    console.log("API DATA =", data);
 
    dispatch({
      type: "USER_ADDRESS",payload: data });
    dispatch({type: "IS_SUCCESS"})
  } catch (error) {
    console.error(error);
    dispatch({
      type: "IS_ERROR",
      payload: error?.response?.data?.message || "Failed  to fetch user address",

    })
  }
};


export const deleteUserAddress =
(addressId, toast, setOpenDeleteModel) => async (dispatch) => {
  try {
    dispatch({ type: "BUTTON_LOADER" });

    await api.delete(`/addresses/${addressId}`);

    dispatch({ type: "IS_SUCCESS" });
    dispatch(getUserAddress());
    dispatch(clearCheckoutAddress());
    toast.success("Address deleted successfully");
  } catch (error) {
    console.error(error);

    dispatch({
      type: "IS_ERROR",
      payload: error?.response?.data?.message || "Some Error Occurred",
    });
  } finally {
    if (setOpenDeleteModel) {
      setOpenDeleteModel(false);
    }
  }
};

export const clearCheckoutAddress = () =>{
  return{
    type: "REMOVE_CHECKOUT_ADDRESS",
  }
};



export const selectedUserCheckoutAddress = (address) =>{
  localStorage.setItem("CHECKOUT_ADDRESS",JSON.stringify(address));
  return{
    type:"SELECT_CHECKOUT_ADDRESS",
    payload:address,
  }
  
}


export const addPaymentMethod = (method) =>{
  return{
    type:"ADD_PAYMENT_METHOD",
    payload:method,
  }
  
}



export const createUserCart =
(sendCartItems) => async (dispatch) => {
  try {
    dispatch({ type: "IS_FETCHING" });

    await api.post("/carts/create", sendCartItems);

    await dispatch(getUserCart());

    dispatch({ type: "IS_SUCCESS" });

  } catch (error) {
    console.error(error);

    dispatch({
      type: "IS_ERROR",
      payload:
        error.response?.data?.message ||
        "Failed to create cart",
    });
  }
};


export const getUserCart = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "IS_FETCHING" });

    const { data } = await api.get("/carts/users/cart");

    dispatch({
      type: "GET_USER_CART_PRODUCTS",
      payload: data.products,
      totalPrice: data.totalPrice,
      cartId: data.cartId,
    });

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().carts.cart)
    );

    dispatch({ type: "IS_SUCCESS" });

  } catch (error) {
    console.error(error);

    dispatch({
      type: "IS_ERROR",
      payload:
        error.response?.data?.message ||
        "Failed to fetch cart",
    });
  }
};



export const createStripePaymentSecret =
  (sendData) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: "IS_FETCHING" });

      const { data } = await api.post("/order/stripe-client-secret",sendData );

      console.log("STRIPE API RESPONSE =", data);

      dispatch({
        type: "CLIENT_SECRET",
        payload: data,
      });

      localStorage.setItem(
        "client-secret",
        JSON.stringify(data)
      );

      dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to create client secret"
      );
    }
  };



export const stripePaymentConfirmation =
  (sendData, setErrorMessage, setLoading, toast) =>
  async (dispatch, getState) => {
    try {
      setLoading(true);

      const response= await api.post(
        "/order/users/payments/online",
        sendData
      );
      console.log(response);
      if (response.data) {
        console.log("IN IF");
        localStorage.removeItem("CHECKOUT_ADDRESS");
        localStorage.removeItem("cartItems");
        localStorage.removeItem("client-secret");
        dispatch({ type: "REMOVE_CLIENT_SECRET_ADDRESS" });
        dispatch({ type: "CLEAR_CART" });
        toast.success("Order Accepted");
      } else {
        // setErrorMessage("Order processing failed.");
        setErrorMessage("Payment Failed. Please try again");
      }

    } catch(error){
      setErrorMessage("Payment Failed. Please try again");
    }
  };

export const analyticsAction= () => async (dispatch, getState) => {
    try {
      dispatch({type: "IS_FETCHING"});
      const { data } = await api.get("/admin/app/analytics");
      dispatch({
        type:"FETCH_ANALYTICS",
        payload:data,

      })
      dispatch({type:"IS_SUCCESS"});
    } catch(error){
     dispatch({type: "IS_ERROR",
      payload: error?.response?.data?.message || "Failed to fetch analytics data"},
     )};
    
  };



  export const getOrdersForDashboard = (queryString,isAdmin) => async (dispatch) => {
  try {
   dispatch({type: "IS _FETCHING"})
       const endpoint  = isAdmin? "/admin/orders" :"/seller/orders";
       const { data } = await api.get(`${endpoint}?${queryString}`);
    console.log("API DATA =", data);

    dispatch({
      type: "GET_ADMIN_ORDERS",
      payload: data.content,
      pageNumber: data.pageNumber,
      pageSize: data.pageSize,
      totalElements: data.totalElements,
      totalPages: data.totalPages,
      lastPage: data.lastPage,
    });
    dispatch({type: "IS _SUCCESS"})
  } catch (error) {
    console.error(error);
    dispatch({
      type: "IS _ERROR",
      payload: error?.response?.data?.message || "Failed  to fetch ordeds data",

    })
  }
};



export const updateOrderStatusFromDashboard =
  (orderId, orderStatus, toast, setLoader,isAdmin) =>
  async (dispatch) => {
    try {
      setLoader(true);
      const endpoint  = isAdmin? "/admin/orders/" :"/seller/orders/";
      const { data } = await api.put(`${endpoint}${orderId}/status`, {
        status: orderStatus,
      });
      toast.success(data.message || "Order updated successfully");
      await dispatch(getOrdersForDashboard());
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message || "Internal Server Error"
      );
    } finally {
      setLoader(false);
    }
  };


  export const dashboardProductsAction = (queryString,isAdmin) => async (dispatch) => {
  try {
   dispatch({type: "IS _FETCHING"})
       
       const endpoint  = isAdmin ? "/admin/products" :"/seller/products";
       const { data } = await api.get(`${endpoint}?${queryString}`);
    console.log("API DATA =", data);

    dispatch({
      type: "FETCH_PRODUCTS",
      payload: data.content,
      pageNumber: data.pageNumber,
      pageSize: data.pageSize,
      totalElements: data.totalElements,
      totalPages: data.totalPages,
      lastPage: data.lastPage,
    });
    dispatch({type: "IS _SUCCESS"})
  } catch (error) {
    console.error(error);
    dispatch({
      type: "IS _ERROR",
      payload: error?.response?.data?.message || "Failed  to dashboard products",

    })
  }
};



export const updateProductFromDashboard = (sendData, toast, setLoader, setOpen,isAdmin) => async (dispatch) => {
  try {
    setLoader(true);
    const endpoint =isAdmin ? "/admin/products/" : "seller/products";
    await api.put(`/admin/products/${sendData.productId}`, sendData);
    toast.success("Product updated successfully");
    setOpen(false);
    await dispatch(dashboardProductsAction());
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message || "Product update failed");
  } finally {
    setLoader(false);
  }
};



export const deleteProduct =
  (setLoader, productId, toast, setOpenDeleteModel) => async (dispatch) => {
    try {
      setLoader(true);
      await api.delete(`/admin/products/${productId}`);
      toast.success("Product deleted successfully");
      await dispatch(dashboardProductsAction());
      setOpenDeleteModel(false);
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Some Error Occurred");
    } finally {
      setLoader(false);
    }
  };


  export const updateProductImageFromDashboard = (formData,productId, toast, setLoader, setOpen) => async (dispatch) => {
  try {
    setLoader(true);
    await api.put(`/admin/products/${productId}/image`, formData);
    toast.success("Image updated successfully");
    setOpen(false);
    await dispatch(dashboardProductsAction());
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message || "Product Image upload  failed");
  } finally {
    setLoader(false);
  }
};



export const addNewProductFormDashboard =
  (sendData, toast, reset, setLoader, setOpen, isAdmin) => async (dispatch, getState) => {
    try {
      setLoader(true);
      const endpoint = isAdmin ? "/admin/categories/" : "/seller/categories/";
      const { data } = await api.post(`${endpoint}${sendData.categoryId}/product`, sendData);
      toast.success(data.message || "Product created successfully");
      reset();
      setOpen(false);
      await dispatch(dashboardProductsAction());
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Product creation failed");
    } finally {
      setLoader(false);
    }
  };




  export const getAllCategoriesDashboard = (queryString) => async (dispatch) => {
  dispatch({ type: "CATEGORY_LOADER" });
  try {
    const { data } = await api.get(`/public/categories?${queryString}`);
    dispatch({
      type: "FETCH_CATEGORIES",
      payload: data["content"],
      pageNumber: data["pageNumber"],
      pageSize: data["pageSize"],
      totalElements: data["totalElements"],
      totalPages: data["totalPages"],
      lastPage: data["lastPage"],
    });

    dispatch({ type: "CATEGORY_SUCCESS" });
  } catch (err) {
    console.log(err);

    dispatch({
      type: "IS_ERROR",
      payload: err?.response?.data?.message || "Failed to fetch categories",
    });
  }
};

export const createCategoryDashboardAction =
  (sendData, setOpen, reset, toast) => async (dispatch, getState) => {
    try {
      dispatch({ type: "CATEGORY_LOADER" });
      await api.post("/admin/categories", sendData);
      dispatch({ type: "CATEGORY_SUCCESS" });
      reset();
      toast.success("Category Created Successful");
      setOpen(false);
      await dispatch(getAllCategoriesDashboard());
    } catch (err) {
      console.log(err);
      toast.error(
        err?.response?.data?.categoryName || "Failed to create new category"
      );

      dispatch({
        type: "IS_ERROR",
        payload: err?.response?.data?.message || "Internal Server Error",
      });
    }
  };

export const updateCategoryDashboardAction =
  (sendData, setOpen, categoryID, reset, toast) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: "CATEGORY_LOADER" });

      await api.put(`/admin/categories/${categoryID}`, sendData);

      dispatch({ type: "CATEGORY_SUCCESS" });

      reset();
      toast.success("Category Update Successful");
      setOpen(false);
      await dispatch(getAllCategoriesDashboard());
    } catch (err) {
      console.log(err);
      toast.error(
        err?.response?.data?.categoryName || "Failed to update category"
      );

      dispatch({
        type: "IS_ERROR",
        payload: err?.response?.data?.message || "Internal Server Error",
      });
    }
  };

export const deleteCategoryDashboardAction =
  (setOpen, categoryID, toast) => async (dispatch, getState) => {
    try {
      dispatch({ type: "CATEGORY_LOADER" });

      await api.delete(`/admin/categories/${categoryID}`);

      dispatch({ type: "CATEGORY_SUCCESS" });

      toast.success("Category Delete Successful");
      setOpen(false);
      await dispatch(getAllCategoriesDashboard());
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || "Failed to delete category");
      dispatch({
        type: "IS_ERROR",
        payload: err?.response?.data?.message || "Internal Server Error",
      });
    }
  };