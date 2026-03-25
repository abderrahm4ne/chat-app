import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


type User = { id: string; fullName: string; email: string; profilePic?: string }
type AuthState = { user: User | null; token: string | null; loading: boolean; error: string | null }

const initialState: AuthState = { user: null, token: null, loading: false, error: null }

export const registerUser = createAsyncThunk