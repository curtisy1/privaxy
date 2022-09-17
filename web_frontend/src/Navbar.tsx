import React from "react";
import {Card, Column, Columns, Inline} from "braid-design-system";
import { Link } from "@tanstack/react-location";

export default function Navbar() {
  return (
    <Columns space="small" collapseBelow="tablet">
      <Column width="1/3">
        <Card>
          <Link to="">Dashboard</Link>
        </Card>
      </Column>
      <Column width="1/3">
        <Card>
          <Link to="requests">Requests</Link>
        </Card>
      </Column>
      <Column width="1/3">
        <Card>
          <Link to="settings">Settings</Link>
        </Card>
      </Column>
    </Columns>
  )
}