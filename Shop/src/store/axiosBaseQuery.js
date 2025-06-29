import axios from "axios";

export const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: "" }) =>
  async ({ url, method, data, params, headers }) => {
    try {
      // Let browser set Content-Type for FormData automatically
      const finalHeaders =
        data instanceof FormData
          ? { ...headers, "Content-Type": undefined }
          : headers;

      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
        headers: finalHeaders,
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
