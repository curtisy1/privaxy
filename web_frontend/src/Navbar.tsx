import React from "react";
import {Card, Inline} from "braid-design-system";
import { Link } from "@tanstack/react-location";

export default function Navbar() {
  return (
    <Card>
      <Inline space="gutter">
        <nav>
          <Link to="">Dashboard</Link>
          <Link to="requests">Requests</Link>
          <Link to="settings">Settings</Link>
        </nav>
      </Inline>
    </Card>
  )
}