import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery.js";

export const api = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: "http://localhost:3000",
  }),
  tagTypes: ["User", "Product"],
  endpoints(builder) {
    return {
      loginUser: builder.mutation({
        query: ({ username, password }) => ({
          url: `/users?username=${username}&password=${password}`,
          method: "get",
        }),
        transformResponse: res =>
          Array.isArray(res) && res.length > 0 ? res[0] : null,
        invalidatesTags: result => [
          { type: "User", id: result?.username || "LIST" },
        ],
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
    };
  },
});

export const {
  useLoginUserMutation,
  useGetUserQuery,
  useGetProductsQuery,
  useGetProductQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = api;
