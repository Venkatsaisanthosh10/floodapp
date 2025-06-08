import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type UserRole = 'PUBLIC' | 'FIELD PERSONNEL' | 'COORDINATOR' | 'COMMAND CENTER' | 'SENIOR OFFICIAL';

interface UserRoleState {
  role: UserRole;
}

const initialState: UserRoleState = {
  role: 'PUBLIC'
};

const userRoleSlice = createSlice({
  name: 'userRole',
  initialState,
  reducers: {
    setRole: (state, action: PayloadAction<UserRole>) => {
      state.role = action.payload;
    }
  }
});

export const { setRole } = userRoleSlice.actions;
export default userRoleSlice.reducer;