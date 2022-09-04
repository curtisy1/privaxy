import BlockingEnabled from "./BlockingEnabled";
import useWebSocket from "react-use-websocket";
import {useEffect, useState} from "react";
import {
  Card,
  Inline,
  Stack,
  Text,
  IconDownload,
  Column,
  Columns,
  ButtonLink,
  Heading,
  Divider
} from "braid-design-system";
import {IconPulsatingCircle} from "../../assets/IconPulsatingCircle";
import Navbar from "../../Navbar";

type Message = {
  proxied_requests?: number,
  blocked_requests?: number,
  modified_responses?: number,
  top_blocked_paths: [string, number][],
  top_clients: [string, number][],
}

const socketUrl = `ws://${window.location.origin}/statistics`;

function formatNumber(n?: number) {
  return n?.toLocaleString() ?? "Loading";
}

function ListElement([key, count]: [string, number]) {
  return (
    <Card key={key}>
      <Stack space="small">
        <Inline space="large">
          <Text>{key}</Text>
          <Text>{count.toLocaleString()}</Text>
        </Inline>
        <Divider />
      </Stack>
    </Card>
  )
}

export default function Dashboard() {
  const [message, setMessage] = useState<Message>({
    blocked_requests: 1,
    modified_responses: 1,
    proxied_requests: 1,
    top_blocked_paths: [
      ["hello", 34],
      ["bye", 565],
    ],
    top_clients: [
      ["map", 7]
    ]
  });
  const {lastMessage} = useWebSocket(socketUrl);

  useEffect(() => {
    if (lastMessage) {
      setMessage(lastMessage.data)
    }
  }, [lastMessage, setMessage]);

  if (!message) {
    return <div>Loading...</div>
  }

  return (
    <Card rounded>
      <Stack space="large">
        <Inline space="gutter">
          <Inline space="small">
            <Heading level="2">Dashboard</Heading>
            <IconPulsatingCircle />
          </Inline>
          <Inline space="small">
            <ButtonLink icon={<IconDownload/>} href="/privaxy_ca_certificate.pem">
              Download CA certificate
            </ButtonLink>
            <BlockingEnabled/>
          </Inline>
        </Inline>

        <Columns space="small">
          <Column>
            <Card rounded>
              <Text>Proxied Requests</Text>
              {formatNumber(message.proxied_requests)}
            </Card>
          </Column>
          <Column>
            <Card rounded>
              <Text>Blocked Requests</Text>
              {formatNumber(message.blocked_requests)}
            </Card>
          </Column>
          <Column>
            <Card rounded>
              <Text>Modified Responses</Text>
              {formatNumber(message.modified_responses)}
            </Card>
          </Column>
        </Columns>

        <Columns space="gutter">
          <Column>
            <Card rounded>
              <Card rounded>
                <Stack space="small">
                  <Heading level="3">Top blocked paths</Heading>
                  <Divider/>
                </Stack>
              </Card>
              {message.top_blocked_paths.map(ListElement)}
            </Card>
          </Column>
          <Column>
            <Card rounded>
              <Card rounded>
                <Stack space="small">
                  <Heading level="3">Top Clients</Heading>
                  <Divider/>
                </Stack>
              </Card>
              {message.top_clients.map(ListElement)}
            </Card>
          </Column>
        </Columns>
      </Stack>
    </Card>
  )
}