import {useQuery} from "@tanstack/react-query";
import wretcher from "./wretcher";

export default function useCustomFilterList(url: string) {
  const exclusionWretcher = wretcher.url(`/${url}`);
  // const {isLoading: isLoadingState, data: filter} = useQuery([url], () =>
  //   exclusionWretcher.get().json<string>()
  // )
  //
  // const {isLoading: isUpdating, refetch} = useQuery([`save${url}`, exclusions], () =>
  //   exclusionWretcher
  //     .put({enabled})
  //     .json()
  // );

  return {
    isLoading: false,
    filter: "",
    saveExclusions: () => true,
  };
}