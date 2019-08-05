import * as actionTypes from '../actions/actionsTypes';
import { updatedObject } from '../utility';



const inititalState = {
    orders : [],
    loading: false,
    purchased: false
}

const purchaseInit = (state, action ) => {
    return updatedObject(state, { purchased: false })
}

const purchaseBurgerStart = (state, action) => {
    return updatedObject( state, {loading: false});
}

const purchaseBugerSuccess = (state, action) => {
    const newOrder = updatedObject(action.orderData, {id: action.orderId})
    return updatedObject(state, { 
        ...state,
        loading: false,
        purchased:true,
        orders : state.orders.concat(newOrder)
    });
}

const purchaseBurgerFail = (state,action ) => {
    return updatedObject(state, { loading: false })
}
const purchaseOrdersStart = (state,action ) => {
    return updatedObject(state, { loading: true })
}
const purchaseOrdersSuccess = (state,action ) => {
    return updatedObject(state, { 
        orders: action.orders,
        loading: false
    });
}
const purchaseOrderFail = (state,action ) => {
    return updatedObject(state, { loading: true })
}

const reducer = (state = inititalState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT: return purchaseInit(state, action);     
        case actionTypes.PURCHASE_BURGER_START: return purchaseBurgerStart(state, action);
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBugerSuccess(state, action);
        case actionTypes.PURCHASE_BURGER_FAIL: return purchaseBurgerFail(state, action);           
        case actionTypes.FETCH_ORDERS_START: return purchaseOrdersStart(state, action);           
        case actionTypes.FETCH_ORDERS_SUCCESS: return purchaseOrdersSuccess(state, action);       
        case actionTypes.FETCH_ORDERS_FAIL: return purchaseOrderFail(state, action);            
        default: return state;
    }
};


export default reducer;