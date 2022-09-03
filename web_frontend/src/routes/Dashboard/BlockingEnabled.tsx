import {Button} from "braid-design-system";
import useBlocking from "../../requests/useBlocking";
import {IconPause} from "../../assets/IconPause";
import {IconPlay} from "../../assets/IconPlay";
import {useEffect, useState} from "react";

export default function BlockingEnabled() {
  const [enabled, setEnabled] = useState<boolean>();
  const {blockingEnabled, toggleBlocking, isLoading} = useBlocking();

  useEffect(() => {
    setEnabled(blockingEnabled);
  }, [blockingEnabled]);

  return (
    <Button
      icon={enabled ? <IconPause/> : <IconPlay/>}
      loading={enabled === undefined || isLoading}
      type="button"
      tone={enabled ? "critical" : undefined}
      onClick={async () => {
        await toggleBlocking();
        setEnabled(!enabled);
      }}
    >
      {enabled ? "Pause" : "Resume"} Blocking
    </Button>
  )
}