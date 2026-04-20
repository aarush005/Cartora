import { createAsyncThunk, createSlice} from '@reduxjs/toolkit'

const initialState = {
    isLoading : false,
    productList : [],
}

export const fetchAllFilteredProducts = createAsyncThunk('/product/fetchAllProducts',
 async () => {
        const result = await axios.get('http://localhost:5000/api/shop/products/get',
        )
        return result?.data;
    })


const shoppingpProductSlice = createSlice({
    name: 'shopingProducts',
    initialState,
    reducers: {},
    extraReducers : (builder) => {
        builder.addCase(fetchAllFilteredProducts.pending,(state,action) =>{
            state.isLoading = true
        }).addCase(fetchAllFilteredProducts.fulfilled,(state,action) =>{
            console.log(action.payload)
            state.isLoading = true
            state.productList = action.payload
        }).addCase(fetchAllFilteredProducts.rejected,(state,action) =>{
            state.isLoading = false
            state.productList = []
        })
    }
}) 

export default shoppingpProductSlice.reducer;