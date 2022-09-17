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

type Dictionary<TKey extends string | number, TValue> = {
  [key in TKey]: TValue;
};

type Message = {
  proxied_requests?: number,
  blocked_requests?: number,
  modified_responses?: number,
  top_blocked_paths: Dictionary<string, number>,
  top_clients: Dictionary<string, number>,
}

const socketUrl = `ws://localhost:8200/statistics`;

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
  const [message, setMessage] = useState<Message>();
  const {lastMessage} = useWebSocket(socketUrl);

  useEffect(() => {
    if (lastMessage) {
      setMessage(JSON.parse(lastMessage.data))
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
              {Object.entries(message.top_blocked_paths).map(ListElement)}
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
              {Object.entries(message.top_clients).map(ListElement)}
            </Card>
          </Column>
        </Columns>
      </Stack>
    </Card>
  )
}