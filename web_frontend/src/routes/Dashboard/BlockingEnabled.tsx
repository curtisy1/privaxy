import {Stack, Text, Button} from "braid-design-system";
import useBlocking from "../../requests/useBlocking";
import {IconPause} from "../../assets/IconPause";
import {IconPlay} from "../../assets/IconPlay";

export default function BlockingEnabled() {
  const {blockingEnabled, toggleBlocking, isLoading} = useBlocking();

  return (
    <Stack space="small" align="center">
      <Text tone="secondary" weight="strong">
        Standard size
      </Text>
      <Button icon={blockingEnabled ? <IconPlay/> : <IconPause/>} loading={isLoading} onClick={() => toggleBlocking}>Send</Button>
    </Stack>
  )
}