import { useReducer, useCallback } from "react";
import ToastContext from "./ToastContext";
import ToastContainer from "./ToastContainer";

const MAX_VISIBLE_TOASTS = 3;

const initialState = {
  visibleToasts: [],
  queue: [],
};

const toastReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TOAST":
      const newToast = action.payload;
      if (state.visibleToasts.length < MAX_VISIBLE_TOASTS) {
        return {
          ...state,
          visibleToasts: [...state.visibleToasts, newToast],
        };
      } else {
        return {
          ...state,
          queue: [...state.queue, newToast],
        };
      }
    case "REMOVE_TOAST":
      const toastId = action.payload;
      const updatedVisibleToasts = state.visibleToasts.filter(
        (toast) => toast.id !== toastId,
      );
      let remainingQueue = state.queue;
      if (
        updatedVisibleToasts.length < MAX_VISIBLE_TOASTS &&
        state.queue.length > 0
      ) {
        const nextToast = state.queue[0];
        updatedVisibleToasts.push(nextToast);
        remainingQueue = state.queue.slice(1);

        return {
          ...state,
          visibleToasts: updatedVisibleToasts,
          queue: remainingQueue,
        };
      }
      return {
        ...state,
        visibleToasts: updatedVisibleToasts,
      };
    default:
      return state;
  }
};

const ToastProvider = ({ children }) => {
  const [state, dispatch] = useReducer(toastReducer, initialState);

  const addToast = useCallback((message) => {
    const id = Date.now().toString();
    dispatch({ type: "ADD_TOAST", payload: { id, ...message } });
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    dispatch({ type: "REMOVE_TOAST", payload: id });
  }, []);

  return (
    <ToastContext.Provider
      value={{ toasts: state.visibleToasts, addToast, removeToast }}
    >
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};

export default ToastProvider;
