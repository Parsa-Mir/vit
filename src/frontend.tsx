/**
 * This file is the entry point for the React app, it sets up the root
 * element and renders the App component to the DOM.
 *
 * It is included in `src/index.html`.
 */

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { routeTree } from "./routeTree.gen";
import "../styles/globals.css";

const elem = document.getElementById("root");
if (!elem) {
	throw new Error("Root element with id 'root' not found");
}
const queryClient = new QueryClient();
const router = createRouter({
	routeTree,
});

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

const app = (
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
			<ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
		</QueryClientProvider>
	</StrictMode>
);

if (import.meta.hot) {
	const existingRoot =
		(import.meta.hot.data.root as ReturnType<typeof createRoot> | undefined) ??
		undefined;
	const root = existingRoot ?? createRoot(elem);
	import.meta.hot.data.root = root;
	root.render(app);
} else {
	createRoot(elem).render(app);
}
