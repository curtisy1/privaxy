import FreeText from "./FreeText";
import {Stack, Text} from "braid-design-system";

export default function CustomFilter() {
  return (
    <FreeText
      description={
        <Stack space="small">
          <Text>Insert EasyList compatible filters. Comment filters by prefixing lines with !.</Text>
          <Text>Excluded entries will be transparently tunneled.</Text>
        </Stack>
      }
      header="Custom Filters"
      inputName="Custom Filters"
      remoteUri="custom-filters"
    />
  )
}