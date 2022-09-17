import {ReactElement, ReactNode, useEffect, useState} from "react";
import {
  Card,
  Textarea,
  Stack,
  Heading, IconUpload, Button,
} from "braid-design-system";
import useCustomFilterList from "../../requests/useCustomFilterList";

type Props = {
  header: string,
  description: ReactElement,
  inputName: string,
  remoteUri: string,
};

export default function FreeText({header, description, inputName, remoteUri }: Props) {
  const {isLoading, filter, saveExclusions} = useCustomFilterList(remoteUri);
  const [inputVal, setValue] = useState(filter ?? "");

  useEffect(() => {
    if (!inputVal && filter) {
      setValue(filter);
    }
  }, [isLoading]);

  if (isLoading) {
    return <>Loading...</>
  }

  return (
    <Card>
      <Stack space="large">
        <Heading level="3">{header}</Heading>
        {description}
        <Textarea id={inputName} value={inputVal} onChange={(e) => setValue(e.currentTarget.value)} label={inputName} />
        <Button icon={<IconUpload />} onClick={() => saveExclusions(inputVal)}>Save Changes</Button>
      </Stack>
    </Card>
  )
}