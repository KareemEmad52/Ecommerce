import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "./CounterReducer";
import { categoriesReducer } from "./CategoriesReducer";
import { BrandReducer } from "./BrandsReducer";


export let store = configureStore({
    reducer: {
      counter:counterReducer,
      categories : categoriesReducer,
      brands : BrandReducer,
    }
})