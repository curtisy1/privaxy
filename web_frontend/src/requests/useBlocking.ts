import {useMutation, useQuery} from "@tanstack/react-query";
import wretcher from "./wretcher";

const blockingWretcher = wretcher.url("/blocking-enabled");

export default function useBlocking() {
  const {isLoading: isLoadingState, data: blockingEnabled} = useQuery(["blockingEnabled"], () =>
    blockingWretcher.get().json<boolean>()
  )
  
  const {isLoading: isUpdating, mutate} = useMutation(["toggleBlocking"], (enabled: boolean) =>
    blockingWretcher
      .put({enabled})
      .res()
  );

  return {
    isLoading: isLoadingState || isUpdating,
    blockingEnabled,
    toggleBlocking: mutate,
  };
}