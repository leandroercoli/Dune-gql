import { BaseQueryFn } from "@reduxjs/toolkit/dist/query";
import { request, ClientError } from "graphql-request";
import { RootState } from "store/store";

const graphqlBaseQuery =
  (
    {
      baseUrl,
    }: {
      baseUrl: string;
    } = { baseUrl: "" }
  ): BaseQueryFn<
    {
      body: string;
      variables?: any;
    },
    unknown,
    unknown
  > =>
  async ({ body, variables }, { getState }, extraOptions) => {
    try {
      const result = await request(baseUrl, body, variables, {
        // Set JWT token as authorization header
        authorization: (getState() as RootState).auth.token,
      });
      return { data: result };
    } catch (error) {
      if (error instanceof ClientError) {
        return { error: { status: error.response.status, data: error } };
      }
      return { error: { status: 500, data: error } };
    }
  };

export default graphqlBaseQuery;
