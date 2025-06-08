import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface OfficialIdState {
  officialId: string;
}

const initialState: OfficialIdState = {
  officialId: ''
};

const officialIdSlice = createSlice({
  name: 'officialId',
  initialState,
  reducers: {
    setOfficialId: (state, action: PayloadAction<string>) => {
      state.officialId = action.payload;
    },
    clearOfficialId: (state) => {
      state.officialId = '';
    }
  }
});

export const { setOfficialId, clearOfficialId } = officialIdSlice.actions;
export default officialIdSlice.reducer;