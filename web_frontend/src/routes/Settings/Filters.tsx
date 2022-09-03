import {
  Card,
  Text,
  Stack,
  Heading, Divider, Checkbox, Button, IconUpload
} from "braid-design-system";
import useFilters, {Filter, FilterGroup} from "../../requests/useFilters";
import {sanitizeEnum} from "../../helper";
import {useState} from "react";

function Entry({title, enabled, file_name}: Filter) {
  const [checked, setChecked] = useState(enabled);
  return (
    <Card key={title}>
      <Checkbox id={file_name} checked={checked} label={file_name} onChange={() => setChecked(!checked)}/>
      <Divider/>
    </Card>
  )
}

function Category(group: keyof typeof FilterGroup, filters: Filter[]) {
  return (
    <Card key={group}>
      <Stack space="gutter">
        <Heading level="4">{group}</Heading>
        <Divider/>
        <Stack space="small">
          {filters.map(Entry)}
        </Stack>
      </Stack>
    </Card>
  )
}

export default function Filters() {
  const {isLoading, filters, saveFilters} = useFilters();

  return (
    <Card rounded>
      <Stack space="large">
        <Heading level="2">Filters</Heading>
        <Button icon={<IconUpload />}>Save Changes</Button>
        {sanitizeEnum<typeof FilterGroup>(FilterGroup).map((g) => Category(g, filters.filter(f => f.group === FilterGroup[g])))}
      </Stack>
    </Card>
  )
}