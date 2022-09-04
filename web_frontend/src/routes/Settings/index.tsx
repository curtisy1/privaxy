import {Link} from "@tanstack/react-location";
import {
  ButtonLink,
  Card, Column, Columns,
  Stack,
} from "braid-design-system";
import {useState} from "react";
import Filters from "./Filters";
import Exclusions from "./Exclusions";
import CustomFilter from "./CustomFilter";

enum Tab {
  Filters,
  Exclusions,
  Custom
}

export default function Settings() {
  const [activeTab, setActiveTab] = useState(Tab.Filters);

  return (
    <Card rounded>
      <Columns space="gutter">
        <Column>
          <Stack space="large">
            <ButtonLink href="#" variant="transparent" onClick={() => setActiveTab(Tab.Filters)}>Filters</ButtonLink>
            <ButtonLink href="#" variant="transparent"
                        onClick={() => setActiveTab(Tab.Exclusions)}>Exclusions</ButtonLink>
            <ButtonLink href="#" variant="transparent" onClick={() => setActiveTab(Tab.Custom)}>Custom
              Filters</ButtonLink>
          </Stack>
        </Column>
        <Column>
          {/*TODO Add this to the routes*/}
          {activeTab === Tab.Filters && <Filters/>}
          {activeTab === Tab.Exclusions && <Exclusions/>}
          {activeTab === Tab.Custom && <CustomFilter/>}
        </Column>
      </Columns>
    </Card>
  )
}