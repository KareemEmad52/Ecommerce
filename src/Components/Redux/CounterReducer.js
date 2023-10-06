import { createSlice } from "@reduxjs/toolkit";



let Counterslice = createSlice({
    name : 'CounterReducer',
    initialState: {
        count : 0,
    },
    reducers : {
        increase : (state)=>{
            state.count +=1
        },
        decrease : (state)=>{
            state.count -=1
        },
        increaseByAmount(state , action){
            state.count += action.payload;
        }
    }
})


export let counterReducer = Counterslice.reducer;
export let {increase ,decrease ,increaseByAmount} = Counterslice.actions;