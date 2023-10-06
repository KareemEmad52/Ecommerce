import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export let getCategories = createAsyncThunk('CategoriesSlice/getCategories',async ()=>{
    let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    return data.data
})


let initialState = { categories : [] , loading : false , Error : null}

let CategoriesSlice = createSlice({
    name: 'categoriesSlice',
    initialState,
    extraReducers:{
        [getCategories.pending] : (state , action)=>{
            state.loading = true
        },
        [getCategories.fulfilled] : (state , action)=>{
            state.categories = action.payload;
            state.loading = false
        },
        [getCategories.rejected] : (state , action)=>{
            state.Error = action.payload;
            state.loading = false
        },
    }
    

})

export let categoriesReducer = CategoriesSlice.reducer;