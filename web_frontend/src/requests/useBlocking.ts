import {useQuery} from "@tanstack/react-query";
import wretcher from "./wretcher";

const blockingWretcher = wretcher.url("/blocking-enabled");

export default function useBlocking(enabled: boolean = false) {
  const {isLoading: isLoadingState, data: blockingEnabled} = useQuery(["blockingEnabled"], () =>
    blockingWretcher.get().json<boolean>()
  )

  const {isLoading: isUpdating, refetch} = useQuery(["toggleBlocking", enabled], () =>
    blockingWretcher
      .put({enabled})
      .json<boolean>()
  );

  return {
    isLoading: isUpdating || isLoadingState,
    blockingEnabled,
    toggleBlocking: refetch,
  };
}