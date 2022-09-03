import {Route} from "@tanstack/react-location";
import Dashboard from "./Dashboard";

const routes: Route[] = [
    {
        path: '/',
        id: 'privaxy',
        children: [
            {
                path: '/',
                element: <Dashboard/>,
                id: 'dashboard'
            },
            {
                path: 'dashboard',
                element: <Dashboard/>,
                loader: async () => {
                    console.log('Fetching all invoices...')
                    return {
                        invoices: await fetchInvoices(),
                    }
                },
                children: [
                    {path: '/', element: <DashboardHome/>},
                    {
                        path: 'invoices',
                        element: <Invoices/>,
                        children: [
                            {
                                path: '/',
                                element: <InvoicesHome/>,
                                action: async (partialInvoice: Partial<Invoice>, ctx) => {
                                    const invoice = await postInvoice(partialInvoice)

                                    // // Redirect to the new invoice
                                    // ctx.router.navigate({
                                    //   to: invoice.id,
                                    //   // Use the current match for relative paths
                                    //   from: ctx.match.pathname,
                                    // })

                                    return invoice
                                },
                            },
                            {
                                path: ':invoiceId',
                                element: <InvoiceView/>,
                                loader: async ({params: {invoiceId}}) => {
                                    console.log('Fetching invoice...')
                                    return {
                                        invoice: await fetchInvoiceById(invoiceId!),
                                    }
                                },
                                action: patchInvoice,
                            },
                        ],
                    },
                    {
                        path: 'users',
                        element: <Users/>,
                        loader: async () => {
                            return {
                                users: await fetchUsers(),
                            }
                        },
                        preSearchFilters: [
                            // Keep the usersView search param around
                            // while in this route (or it's children!)
                            (search) => ({
                                ...search,
                                usersView: {
                                    ...search.usersView,
                                },
                            }),
                        ],
                        children: [
                            {
                                path: ':userId',
                                element: <UserView/>,
                                loader: async ({params: {userId}}) => {
                                    return {
                                        user: await fetchUserById(userId!),
                                    }
                                },
                            },
                        ],
                    },
                ],
            },
            {
                // Your elements can be asynchronous, which means you can code-split!
                path: 'expensive',
                element: () =>
                    loaderDelayFn(() => import('./Expensive')).then((res) => (
                        <res.Expensive/>
                    )),
            },
            // Obviously, you can put routes in other files, too
            // reallyExpensiveRoute,
            {
                path: 'authenticated/',
                element: <Auth/>,
                children: [
                    {
                        path: '/',
                        element: <Authenticated/>,
                    },
                ],
            },
        ],
    },
];

export default routes;