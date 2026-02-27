import { createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    isLoading: false,
    productList : []

}

export const addNewProduct = createAsyncThunk('/product/addnewproduct',
 async (formData) => {
        const result = await axios.post('http://localhost:5000/api/admin/product/add', formData,{
        headers: {
            'Content-Type' : 'application/json'
        },
    }
        )
        return result?.data;
    })


export const fetchAllProduct = createAsyncThunk('/product/fetchAllProducts',
 async () => {
        const result = await axios.get('http://localhost:5000/api/admin/products/get',
        )
        return result?.data;
    })



export const editProduct = createAsyncThunk('/product/editProduct',
 async ({id, formData}) => {
        const result = await axios.put('http://localhost:5000/api/admin/product/edit/${id}', formData,{
        headers: {
            'Content-Type' : 'application/json'
        },
    }
        )
        return result?.data;
    })



    export const deleteProduct = createAsyncThunk('/product/deleteProduct',
 async (id) => {
        const result = await axios.delete('http://localhost:5000/api/admin/products/delete/${id}',
        )
        return result?.data;
    })




const AdminProductSlice = createSlice({
   name: "adminProducts",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
    builder.addCase(fetchAllProducts.pending, (state) =>{
        state.isLoading = true
    }).addCase(fetchAllProduct.fulfilled, (state,action) =>{
        console.log(action.payload);

        state.isLoading=false
        state.productList = action.payload
    }).addCase(fetchAllProduct.rejected, (state,action) =>{
        console.log(action.payload);

        state.isLoading =false
        state.productList = []
    })
   }
})

export default AdminProductSlice.reducer;