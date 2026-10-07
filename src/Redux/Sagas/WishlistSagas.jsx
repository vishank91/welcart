import { put, takeEvery } from "redux-saga/effects"
import { CREATE_WISHLIST, CREATE_WISHLIST_RED, DELETE_WISHLIST, DELETE_WISHLIST_RED, GET_WISHLIST, GET_WISHLIST_RED, UPDATE_WISHLIST, UPDATE_WISHLIST_RED } from "../Constants"
import { createRecordAPI, deleteRecordAPI, getRecordAPI, updateRecordAPI } from "./APICallingService/index"
// import { createMultipartRecordAPI, deleteRecordAPI, getRecordAPI, updateMultipartRecordAPI } from "./APICallingService/index"

function* createSaga(action) {                                                              //Worker Saga
    let response = yield createRecordAPI("wishlist", action.payload)                    //Used When Payload Has No File Field
    // let response = yield createMultipartRecordAPI("wishlist", action.payload)        //Used When Payload Has File Field
    yield put({ type: CREATE_WISHLIST_RED, payload: response })
}

function* getSaga() {                                                                      //Worker Saga
    let response = yield getRecordAPI("wishlist")
    yield put({ type: GET_WISHLIST_RED, payload: response })
}

function* updateSaga(action) {                                                              //Worker Saga
    yield updateRecordAPI("wishlist", action.payload)                                   //Used When Payload Has No File Field
    yield put({ type: UPDATE_WISHLIST_RED, payload: action.payload })
    // let response = yield updateMultipartRecordAPI("wishlist", action.payload)        //Used When Payload Has File Field
    // yield put({ type: UPDATE_WISHLIST_RED, payload: response })
}

function* deleteSaga(action) {                                                              //Worker Saga
    yield deleteRecordAPI("wishlist", action.payload)
    put({ type: DELETE_WISHLIST_RED, payload: action.payload })
}


export default function* WishlistSagas() {
    yield takeEvery(CREATE_WISHLIST, createSaga)                                        //Watcher Saga
    yield takeEvery(GET_WISHLIST, getSaga)                                              //Watcher Saga
    yield takeEvery(UPDATE_WISHLIST, updateSaga)                                        //Watcher Saga
    yield takeEvery(DELETE_WISHLIST, deleteSaga)                                        //Watcher Saga
}       