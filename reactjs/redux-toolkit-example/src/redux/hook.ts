import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
// The useAppDispatch and useAppSelector hooks are custom hooks that provide type information for the 
// useDispatch and useSelector hooks from react-redux.
// The useAppDispatch hook returns the dispatch function with the correct type information.
// The useAppSelector hook returns the useSelector hook with the correct RootState type.
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
