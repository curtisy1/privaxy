import {useQuery} from "@tanstack/react-query";
import wretcher from "./wretcher";

export enum FilterGroup {
  Default,
  Regional,
  Ads,
  Privacy,
  Malware,
  Social,
}

export type Filter = {
  enabled: boolean,
  title: string,
  group: FilterGroup,
  file_name: string,
}

const dummyFilters: Filter[] = [
  {
    enabled: true,
    title: "uBlock",
    group: FilterGroup.Default,
    file_name: "ublock.txt"
  },
  {
    enabled: true,
    title: "gagag",
    group: FilterGroup.Default,
    file_name: "ublock.txt"
  },  {
    enabled: false,
    title: "ggrht",
    group: FilterGroup.Default,
    file_name: "ublock.txt"
  },  {
    enabled: true,
    title: "kemksleg",
    group: FilterGroup.Ads,
    file_name: "ublock.txt"
  },  {
    enabled: true,
    title: "pomkss",
    group: FilterGroup.Malware,
    file_name: "ublock.txt"
  },  {
    enabled: false,
    title: "oks eske",
    group: FilterGroup.Regional,
    file_name: "ublock.txt"
  },  {
    enabled: true,
    title: "imaifoame",
    group: FilterGroup.Default,
    file_name: "ublock.txt"
  },
];

const filterWretcher = wretcher.url("/filters");

export default function useFilters() {
  // const {isLoading: isLoadingState, data: filters} = useQuery(["filters"], () =>
  //   filterWretcher.get().json<Filter[]>()
  // )
  //
  // const {isLoading: isUpdating, refetch} = useQuery(["saveFilters", filters], () =>
  //   filterWretcher
  //     .put({enabled})
  //     .json()
  // );

  return {
    isLoading: false,
    filters: dummyFilters,
    saveFilters: () => true,
  };
}