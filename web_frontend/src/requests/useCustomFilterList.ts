import {useMutation, useQuery} from "@tanstack/react-query";
import wretcher from "./wretcher";

export default function useCustomFilterList(url: string) {
  const exclusionWretcher = wretcher.url(`/${url}`);
  const {isLoading: isLoadingState, data: exclusions} = useQuery([url], () =>
    exclusionWretcher.get().json<string>()
  )

  const {isLoading: isUpdating, mutate} = useMutation([`save${url}`], (filter: string) =>
    exclusionWretcher
      .put({filter})
      .res()
  );

  return {
    isLoading: isLoadingState || isUpdating,
    filter: exclusions,
    saveExclusions: mutate,
  };
}