import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  type ReactNode,
} from "react";
import * as roleAppApi from "@/lib/api/role-application";
import type {
  RoleApplication,
  CreateRoleApplicationPayload,
  ReviewRoleApplicationPayload,
} from "@/types/role-application";

interface RoleApplicationState {
  applications: RoleApplication[];
  currentApplication: RoleApplication | null;
  loading: boolean;
  error: string | null;
}

type RoleApplicationAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_APPLICATIONS"; payload: RoleApplication[] }
  | { type: "SET_CURRENT_APPLICATION"; payload: RoleApplication | null }
  | { type: "ADD_APPLICATION"; payload: RoleApplication }
  | { type: "UPDATE_APPLICATION"; payload: RoleApplication };

const initialState: RoleApplicationState = {
  applications: [],
  currentApplication: null,
  loading: false,
  error: null,
};

const reducer = (
  state: RoleApplicationState,
  action: RoleApplicationAction,
): RoleApplicationState => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload, error: null };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    case "SET_APPLICATIONS":
      return { ...state, applications: action.payload, loading: false };
    case "SET_CURRENT_APPLICATION":
      return { ...state, currentApplication: action.payload, loading: false };
    case "ADD_APPLICATION":
      return {
        ...state,
        applications: [action.payload, ...state.applications],
        loading: false,
      };
    case "UPDATE_APPLICATION":
      return {
        ...state,
        applications: state.applications.map((app) =>
          app.id === action.payload.id ? action.payload : app,
        ),
        currentApplication:
          state.currentApplication?.id === action.payload.id
            ? action.payload
            : state.currentApplication,
        loading: false,
      };
    default:
      return state;
  }
};

// ---- Context Interface ----

interface RoleApplicationContextType extends RoleApplicationState {
  fetchMyApplications: () => Promise<void>; // user’s own applications
  fetchAllApplications: () => Promise<void>; // admin – all applications
  fetchApplication: (id: string) => Promise<void>;
  createApplication: (payload: CreateRoleApplicationPayload) => Promise<void>;
  reviewApplication: (
    userId: string,
    payload: ReviewRoleApplicationPayload,
  ) => Promise<void>;
  clearError: () => void;
  clearCurrentApplication: () => void;
}

const RoleApplicationContext = createContext<
  RoleApplicationContextType | undefined
>(undefined);

// ---- Provider ----

export const RoleApplicationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Fetch the current user’s own applications (GET /role/applications/user)
  const fetchMyApplications = useCallback(async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const response = await roleAppApi.getMyApplications();
      dispatch({
        type: "SET_APPLICATIONS",
        payload: response.data.applications,
      });
    } catch (err: any) {
      dispatch({ type: "SET_ERROR", payload: err.message });
    }
  }, []);

  // Fetch all applications (admin only) – GET /role/applications/users
  const fetchAllApplications = useCallback(async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const response = await roleAppApi.getAllApplications();
      dispatch({
        type: "SET_APPLICATIONS",
        payload: response.data.applications,
      });
    } catch (err: any) {
      dispatch({ type: "SET_ERROR", payload: err.message });
    }
  }, []);

  const fetchApplication = useCallback(async (id: string) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const response = await roleAppApi.getApplication(id);
      dispatch({
        type: "SET_CURRENT_APPLICATION",
        payload: response.data.application,
      });
    } catch (err: any) {
      dispatch({ type: "SET_ERROR", payload: err.message });
    }
  }, []);

  const createApplication = useCallback(
    async (payload: CreateRoleApplicationPayload) => {
      dispatch({ type: "SET_LOADING", payload: true });
      try {
        const response = await roleAppApi.createRoleApplication(payload);
        dispatch({
          type: "ADD_APPLICATION",
          payload: response.data.application,
        });
      } catch (err: any) {
        dispatch({ type: "SET_ERROR", payload: err.message });
        throw err; // let the form handle it if needed
      }
    },
    [],
  );

  const reviewApplication = useCallback(
    async (userId: string, payload: ReviewRoleApplicationPayload) => {
      dispatch({ type: "SET_LOADING", payload: true });
      try {
        const response = await roleAppApi.reviewApplication(userId, payload);
        dispatch({
          type: "UPDATE_APPLICATION",
          payload: response.data.updated,
        });
      } catch (err: any) {
        dispatch({ type: "SET_ERROR", payload: err.message });
      }
    },
    [],
  );

  const clearError = useCallback(
    () => dispatch({ type: "SET_ERROR", payload: null }),
    [],
  );
  const clearCurrentApplication = useCallback(
    () => dispatch({ type: "SET_CURRENT_APPLICATION", payload: null }),
    [],
  );

  const value: RoleApplicationContextType = {
    ...state,
    fetchMyApplications,
    fetchAllApplications,
    fetchApplication,
    createApplication,
    reviewApplication,
    clearError,
    clearCurrentApplication,
  };

  return (
    <RoleApplicationContext.Provider value={value}>
      {children}
    </RoleApplicationContext.Provider>
  );
};

export const useRoleApplication = () => {
  const context = useContext(RoleApplicationContext);
  if (!context) {
    throw new Error(
      "useRoleApplication must be used within a RoleApplicationProvider",
    );
  }
  return context;
};
