// listSlice.js
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface listState {
  orderList: any[];
}

const initialState: listState = {
  orderList: [],
}

export const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<{ menu: any, quantity: number }>) {
      const { menu, quantity } = action.payload;
      const existingProductIndex = state.orderList.findIndex(item => item.menu.menu_name === menu.menu_name);
      if (existingProductIndex !== -1) {
        // Nếu sản phẩm đã tồn tại trong giỏ hàng, cập nhật số lượng của nó
        state.orderList[existingProductIndex].quantity += quantity;
      } else {
        // Nếu sản phẩm chưa tồn tại trong giỏ hàng, thêm nó vào giỏ hàng
        state.orderList.push({ menu, quantity });
      }
    },
  },
});

export const { addItem } = listSlice.actions;

export default listSlice.reducer;
