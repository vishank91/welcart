import { put, takeEvery } from "redux-saga/effects"
import { CREATE_CHECKOUT, CREATE_CHECKOUT_RED, DELETE_CHECKOUT, DELETE_CHECKOUT_RED, GET_CHECKOUT, GET_CHECKOUT_RED, UPDATE_CHECKOUT, UPDATE_CHECKOUT_RED } from "../Constants"
import { createRecordAPI, deleteRecordAPI, getRecordAPI, updateRecordAPI } from "./APICallingService/index"
// import { createMultipartRecordAPI, deleteRecordAPI, getRecordAPI, updateMultipartRecordAPI } from "./APICallingService/index"

function* createSaga(action) {                                                              //Worker Saga
    let response = yield createRecordAPI("checkout", action.payload)                    //Used When Payload Has No File Field
    // let response = yield createMultipartRecordAPI("checkout", action.payload)        //Used When Payload Has File Field
    yield put({ type: CREATE_CHECKOUT_RED, payload: response })
}

function* getSaga() {                                                                      //Worker Saga
    let response = yield getRecordAPI("checkout")
    yield put({ type: GET_CHECKOUT_RED, payload: response })
}

function* updateSaga(action) {                                                              //Worker Saga
    yield updateRecordAPI("checkout", action.payload)                                   //Used When Payload Has No File Field
    yield put({ type: UPDATE_CHECKOUT_RED, payload: action.payload })
    // let response = yield updateMultipartRecordAPI("checkout", action.payload)        //Used When Payload Has File Field
    // yield put({ type: UPDATE_CHECKOUT_RED, payload: response })
}

function* deleteSaga(action) {                                                              //Worker Saga
    yield deleteRecordAPI("checkout", action.payload)
    put({ type: DELETE_CHECKOUT_RED, payload: action.payload })
}


export default function* CheckoutSagas() {
    yield takeEvery(CREATE_CHECKOUT, createSaga)                                        //Watcher Saga
    yield takeEvery(GET_CHECKOUT, getSaga)                                              //Watcher Saga
    yield takeEvery(UPDATE_CHECKOUT, updateSaga)                                        //Watcher Saga
    yield takeEvery(DELETE_CHECKOUT, deleteSaga)                                        //Watcher Saga
}       