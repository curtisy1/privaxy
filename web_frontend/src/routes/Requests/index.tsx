import useWebSocket from "react-use-websocket";
import {useEffect, useState} from "react";
import {
  Card,
  Inline,
  Stack,
  Heading,
} from "braid-design-system";
import {IconPulsatingCircle} from "../../assets/IconPulsatingCircle";

type Request = {
  now: string,
  method: string,
  url: string,
  is_request_blocked: boolean,
}

const socketUrl = `ws://localhost:8200/events`;

function TableRow({now, url, is_request_blocked, method}: Request) {
  return (
    <tr key={now}>
      <td>
        {now}
      </td>
      <td>
        <span>
            {method}
        </span>
      </td>
      <td>
        {url}
      </td>
    </tr>
  )
}

export default function Requests() {
  const [messages, setMessages] = useState<Request[]>([]);
  const {lastMessage} = useWebSocket(socketUrl);

  useEffect(() => {
    if (lastMessage) {
      setMessages([...messages, lastMessage.data]);
    }
  }, [lastMessage, setMessages]);

  return (
    <Card rounded>
      <Stack space="large">
        <Inline space="gutter">
          <Inline space="small">
            <Heading level="2">Requests Feed</Heading>
            <IconPulsatingCircle/>
          </Inline>
        </Inline>

        <Card>
          <table>
            <thead>
            <tr>
              <th scope="col">
                Timestamp
              </th>
              <th scope="col">
                Method
              </th>
              <th scope="col">
                Path
              </th>
            </tr>
            </thead>
            <tbody>
            {messages.map(TableRow)}
            </tbody>
          </table>
        </Card>
      </Stack>
    </Card>
  )
}