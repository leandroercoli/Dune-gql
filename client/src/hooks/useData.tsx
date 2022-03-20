import { useSelector } from "react-redux";
import { useGetPlanetsQuery, useGetContactsQuery } from "store/gql/gqlApi";
import { selectUser } from "store/auth/authSlice";

export const useData = () => {
  const user = useSelector(selectUser);

  const { data: planets = [], isLoading: isLoadingPlanets } =
    useGetPlanetsQuery(null);

  const { data: contacts = [], isLoading: isLoadingContacts } =
    useGetContactsQuery(user?.id ?? -1, { skip: !user });

  return {
    isLoading: isLoadingPlanets || isLoadingContacts,
    user,
    planets,
    contacts,
  };
};
