import { combineReducers } from "redux";
import dataState from "./DataState";
import bannerMain from "./BannerMain";
import infoPhone from "./InfoPhone";
import companyPhone from "./Company";
import newsList from "./News";
import orderList from "./Order";
import promotionList from "./PromotionList";
import cart from "./Cart";

const rootReducerFunction = combineReducers({
    dataState: dataState,
    bannerMain: bannerMain,
    infoPhone: infoPhone,
    companyPhone: companyPhone,
    newsList: newsList,
    orderList: orderList,
    promotionList: promotionList,
    cart: cart,
})

export default rootReducerFunction;