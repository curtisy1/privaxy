import {ReactElement, ReactNode, useState} from "react";
import {
  Card,
  Textarea,
  Stack,
  Heading, IconUpload, Button,
} from "braid-design-system";

type Props = {
  header: string,
  description: ReactElement,
  inputName: string,
  value: string,
};

export default function FreeText({header, description, inputName, value }: Props) {
  const [inputVal, setValue] = useState(value);

  return (
    <Card>
      <Stack space="large">
        <Heading level="3">{header}</Heading>
        {description}
        <Textarea id={inputName} value={inputVal} onChange={(e) => setValue(e.currentTarget.value)} label={inputName} />
        <Button icon={<IconUpload />}>Save Changes</Button>
      </Stack>
    </Card>
  )
}