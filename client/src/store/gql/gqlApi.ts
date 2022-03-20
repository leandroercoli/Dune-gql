import { createApi } from "@reduxjs/toolkit/query/react";
import { Planet } from "data-types/planet";
import { User } from "data-types/user";
import { gql } from "graphql-request";
import graphqlBaseQuery from "store/gql/utils/graphqlBaseQuery";
import { PlanetFragment } from "./utils/fragments";

export const TAG_USER = "User";
export const TAG_PLANETS = "Planets";
export const TAG_CONTACTS = "Contacts";

export const gqlApi = createApi({
  reducerPath: "gqlApi",
  baseQuery: graphqlBaseQuery({
    baseUrl: process.env.REACT_APP_GRAPHQL_PATH || "/gql",
  }),
  tagTypes: [TAG_USER, TAG_PLANETS, TAG_CONTACTS],
  endpoints: (builder) => ({
    getUser: builder.query<User, string>({
      query: (id) => ({
        body: gql`
          query {
            user(id: ${id}) {
              id
              username
              title
              house
              planet { 
                ${PlanetFragment}
              }
              email
              img
            }
          }`,
      }),
      transformResponse: (response: { user: User }) => response.user,
      providesTags: [TAG_USER],
    }),
    getPlanets: builder.query<Planet[], null>({
      query: () => ({
        body: gql` 
        query{
          planets { 
            ${PlanetFragment} 
          } 
        }`,
      }),
      transformResponse: (response: { planets: Planet[] }) => response.planets,
    }),
    getContacts: builder.query<User[], number>({
      query: (id) => ({
        body: gql`
        query {
          contacts(id: ${id}) {
            id
            username
            title
            house
            planet { 
              ${PlanetFragment}
            }
            email
            img
          }
        }`,
      }),
      transformResponse: (response: { contacts: User[] }) => response.contacts,
      providesTags: [TAG_CONTACTS],
    }),
  }),
});

export const { useGetUserQuery, useGetPlanetsQuery, useGetContactsQuery } =
  gqlApi;
