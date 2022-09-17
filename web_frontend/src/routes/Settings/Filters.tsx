import {
  Card,
  Text,
  Stack,
  Heading, Divider, Checkbox, Button, IconUpload
} from "braid-design-system";
import useFilters, {Filter, FilterGroup} from "../../requests/useFilters";
import {useEffect, useState} from "react";

export default function Filters() {
  const {isLoading, filters, saveFilters} = useFilters();
  const [checked, setChecked] = useState(filters);

  useEffect(() => {
    if (!checked) {
      setChecked(filters);
    }
  }, [isLoading, checked]);

  if (isLoading || !checked) {
    return <>Loading...</>
  }

  return (
    <Card rounded>
      <Stack space="large">
        <Heading level="2">Filters</Heading>
        <Button icon={<IconUpload />} onClick={() => saveFilters(checked)}>Save Changes</Button>
        {FilterGroup.map((group) => {
          const filterGroup = checked.filter(f => f.group === group);
          return (
            <Card key={group}>
              <Stack space="gutter">
                <Heading level="4">{group}</Heading>
                <Divider/>
                <Stack space="small">
                  {filterGroup.map(({title, enabled, file_name, ...rest}) => {
                    return (
                      <Card key={title}>
                        <Checkbox id={file_name} checked={enabled} label={title} onChange={() => {
                          setChecked([
                            ...checked.filter(c => c.file_name !== file_name),
                            {
                              ...rest,
                              title,
                              enabled: !enabled,
                              file_name,
                            }
                          ].sort((a, b) => a.title.localeCompare(b.title, undefined,{ numeric: true })));
                        }}/>
                        <Divider/>
                      </Card>
                    )
                  })}
                </Stack>
              </Stack>
            </Card>
          )
        })}
      </Stack>
    </Card>
  )
}