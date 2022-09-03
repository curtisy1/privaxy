import BlockingEnabled from "./BlockingEnabled";

type Message = {
  proxied_requests?: number,
  blocked_requests?: number,
  modified_responses?: number,
  top_blocked_paths: [string, number][],
  top_clients: [string, number][],
}

type Props = {
  message: Message;
}

function formatNumber(n?: number) {
  return n?.toLocaleString() ?? "Loading";
}

function ListElement([key, count]: [string, number]) {
  return (
    <li key={key} className="relative bg-white py-5 px-4">
      <div className="flex justify-between space-x-3">
        <div className="min-w-0 flex-1">

          <p className="text-sm font-medium text-gray-900 truncate">{key}</p>
        </div>
        <div
          className="flex-shrink-0 whitespace-nowrap text-sm text-gray-500">{count.toLocaleString()}</div>
      </div>
    </li>
  )
}

export default function Dashboard(props: Props) {
  return (
    <>
      <div className="md:flex md:justify-between md:space-x-5">
        <div className="pt-1.5">
          <h1 className="text-2xl font-bold text-gray-900">{"Dashboard"}
            <div
              className=" mt-3 ml-3 inline pulsating-circle"></div>
          </h1>
        </div>
        <div
          className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
          <a href={`/privaxy_ca_certificate.pem"`}
             className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="ml-0.5 mr-2 h-5 w-5" fill="none"
                 viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            {"Download CA certificate"}
          </a>
          <BlockingEnabled/>
        </div>
      </div>

      <dl
        className="mt-5 grid grid-cols-1 rounded-lg bg-white overflow-hidden shadow divide-y divide-gray-200 md:grid-cols-3 md:divide-y-0 md:divide-x">
        <div className="px-4 py-5 sm:p-6">
          <dt className="text-base font-normal text-gray-900">
            {"Proxied requests"}
          </dt>
          <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">
            <div className="flex items-baseline text-2xl font-semibold text-blue-600">
              {formatNumber(props.message.proxied_requests)}
            </div>
          </dd>
        </div>

        <div className="px-4 py-5 sm:p-6">
          <dt className="text-base font-normal text-gray-900">
            {"Blocked requests"}
          </dt>
          <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">
            <div className="flex items-baseline text-2xl font-semibold text-blue-600">
              {formatNumber(props.message.blocked_requests)}
            </div>
          </dd>
        </div>

        <div className="px-4 py-5 sm:p-6">
          <dt className="text-base font-normal text-gray-900">
            {"Modified responses"}
          </dt>
          <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">
            <div className="flex items-baseline text-2xl font-semibold text-blue-600">
              {formatNumber(props.message.modified_responses)}
            </div>
          </dd>
        </div>
      </dl>
      <div className="mt-4 lg:grid lg:gap-y-4 lg:gap-x-8 lg:grid-cols-2">
        <div className="mt-4 bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium">{"Top blocked paths"}</h3>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <ul role="list" className="divide-y divide-gray-200">
              {props.message.top_blocked_paths.map(ListElement)}
            </ul>

          </div>
        </div>
        <div className="mt-4 bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium">{"Top clients"}</h3>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <ul role="list" className="divide-y divide-gray-200">
              {props.message.top_clients.map(ListElement)}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}