import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export function useApi(api: any) {
  try {
    console.log("dd");

    return api();
  } catch (e) {
    console.log(e);
  } finally {
    console.log("SDfsd");
  }
}
