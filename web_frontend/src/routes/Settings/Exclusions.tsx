import useCustomFilterList from "../../requests/useCustomFilterList";
import FreeText from "./FreeText";
import {Stack, Text} from "braid-design-system";

export default function Exclusions() {
  const {isLoading, filter, saveExclusions} = useCustomFilterList("exclusions");

  return (
    <FreeText
      value={filter}
      description={
        <Stack space="small">
          <Text>Exclusions are hosts or domains that are not passed through the MITM pipeline.</Text>
          <Text>Excluded entries will be transparently tunneled.</Text>
        </Stack>
      }
      header="Exclusions"
      inputName="Exclusions"
    />
  )
}