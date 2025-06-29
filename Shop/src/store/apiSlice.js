import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery.js";
import { ROLES } from "../shared/constants/roles.js";

export const api = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: "http://localhost:3000",
  }),
  tagTypes: ["User", "Product"],
  endpoints(builder) {
    return {
      loginUser: builder.mutation({
        query: ({ username, password, role }) => ({
          url: `/users?username=${username}&password=${password}&role=${role}`,
          method: "get",
        }),
        transformResponse: res =>
          Array.isArray(res) && res.length > 0 ? res[0] : null,
        invalidatesTags: result => [
          { type: "User", id: result?.username || "LIST" },
        ],
      }),
      registerUser: builder.mutation({
        query: ({ username, password, name }) => ({
          url: "/users",
          method: "post",
          data: { username, password, name, role: ROLES.USER },
        }),
        invalidatesTags: [{ type: "User", id: "LIST" }],
      }),
      checkUserExists: builder.mutation({
        query: username => ({
          url: `/users?username=${username}`,
          method: "get",
        }),
        transformResponse: res =>
          Array.isArray(res) && res.length > 0 ? res[0] : null,
      }),
      getUser: builder.query({
        query: username => ({
          url: `/users?username=${username}`,
          method: "get",
        }),
        transformResponse: res =>
          Array.isArray(res) && res.length > 0 ? res[0] : null,
        providesTags: result => [
          { type: "User", id: result?.username || "LIST" },
        ],
      }),
      getProducts: builder.query({
        query: () => ({ url: "/products", method: "get" }),
        providesTags: result =>
          result
            ? [
                ...result.map(({ id }) => ({ type: "Product", id })),
                { type: "Product", id: "LIST" },
              ]
            : [{ type: "Product", id: "LIST" }],
      }),
      getProduct: builder.query({
        query: id => ({ url: `/products/${id}`, method: "get" }),
        providesTags: (result, error, id) => [{ type: "Product", id }],
      }),
      addProduct: builder.mutation({
        query: product => ({
          url: "/products",
          method: "post",
          data: product,
        }),
        invalidatesTags: [{ type: "Product", id: "LIST" }],
      }),
      updateProduct: builder.mutation({
        query: ({ id, ...patch }) => ({
          url: `/products/${id}`,
          method: "patch",
          data: patch,
        }),
        invalidatesTags: (result, error, { id }) => [
          { type: "Product", id },
          { type: "Product", id: "LIST" },
        ],
      }),
      deleteProduct: builder.mutation({
        query: id => ({
          url: `/products/${id}`,
          method: "delete",
        }),
        invalidatesTags: (result, error, id) => [
          { type: "Product", id },
          { type: "Product", id: "LIST" },
        ],
      }),
      uploadFile: builder.mutation({
        query: file => {
          const formData = new FormData();
          formData.append("image", file);

          return {
            url: "/upload",
            method: "post",
            data: formData,
          };
        },
      }),
      getUsers: builder.query({
        query: () => ({ url: "/users", method: "get" }),
        providesTags: result =>
          result
            ? [
                ...result.map(({ id }) => ({ type: "User", id })),
                { type: "User", id: "LIST" },
              ]
            : [{ type: "User", id: "LIST" }],
      }),
      updateUser: builder.mutation({
        query: ({ id, ...patch }) => ({
          url: `/users/${id}`,
          method: "patch",
          data: patch,
        }),
        invalidatesTags: (result, error, { id }) => [
          { type: "User", id },
          { type: "User", id: "LIST" },
        ],
      }),
      deleteUser: builder.mutation({
        query: id => ({
          url: `/users/${id}`,
          method: "delete",
        }),
        invalidatesTags: (result, error, id) => [
          { type: "User", id },
          { type: "User", id: "LIST" },
        ],
      }),
    };
  },
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useCheckUserExistsMutation,
  useGetUserQuery,
  useGetUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetProductsQuery,
  useGetProductQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useUploadFileMutation,
} = api;
