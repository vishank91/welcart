import { put, takeEvery } from "redux-saga/effects"
import { CREATE_CART, CREATE_CART_RED, DELETE_CART, DELETE_CART_RED, GET_CART, GET_CART_RED, UPDATE_CART, UPDATE_CART_RED } from "../Constants"
import { createRecordAPI, deleteRecordAPI, getRecordAPI, updateRecordAPI } from "./APICallingService/index"
// import { createMultipartRecordAPI, deleteRecordAPI, getRecordAPI, updateMultipartRecordAPI } from "./APICallingService/index"

function* createSaga(action) {                                                              //Worker Saga
    let response = yield createRecordAPI("cart", action.payload)                    //Used When Payload Has No File Field
    // let response = yield createMultipartRecordAPI("cart", action.payload)        //Used When Payload Has File Field
    yield put({ type: CREATE_CART_RED, payload: response })
}

function* getSaga() {                                                                      //Worker Saga
    let response = yield getRecordAPI("cart")
    yield put({ type: GET_CART_RED, payload: response })
}

function* updateSaga(action) {                                                              //Worker Saga
    yield updateRecordAPI("cart", action.payload)                                   //Used When Payload Has No File Field
    yield put({ type: UPDATE_CART_RED, payload: action.payload })
    // let response = yield updateMultipartRecordAPI("cart", action.payload)        //Used When Payload Has File Field
    // yield put({ type: UPDATE_CART_RED, payload: response })
}

function* deleteSaga(action) {                                                              //Worker Saga
    yield deleteRecordAPI("cart", action.payload)
    put({ type: DELETE_CART_RED, payload: action.payload })
}


export default function* CartSagas() {
    yield takeEvery(CREATE_CART, createSaga)                                        //Watcher Saga
    yield takeEvery(GET_CART, getSaga)                                              //Watcher Saga
    yield takeEvery(UPDATE_CART, updateSaga)                                        //Watcher Saga
    yield takeEvery(DELETE_CART, deleteSaga)                                        //Watcher Saga
}       