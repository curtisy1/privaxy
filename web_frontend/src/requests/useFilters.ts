import {useMutation, useQuery} from "@tanstack/react-query";
import wretcher from "./wretcher";

export const FilterGroup = [
 "Default",
 "Regional",
 "Ads",
 "Privacy",
 "Malware",
  "Social",
];

export type Filter = {
  enabled: boolean,
  title: string,
  group: keyof typeof FilterGroup,
  file_name: string,
}

const filterWretcher = wretcher.url("/filters");

export default function useFilters() {
  const {isLoading: isLoadingState, data: filters} = useQuery(["filters"], () =>
    filterWretcher.get().json<Filter[]>()
  )
  
  const {isLoading: isUpdating, mutate} = useMutation(["saveFilters"], (filters: Filter[]) =>
    filterWretcher
      .put(filters)
      .json()
  );

  return {
    isLoading: isLoadingState || isUpdating,
    filters,
    saveFilters: mutate,
  };
}