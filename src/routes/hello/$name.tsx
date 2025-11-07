import { useQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/hello/$name")({
  component: HelloPage,
});

export function HelloPage() {
  const { name } = Route.useParams();

  const query = useQuery({
    queryKey: ["hello", name],
    queryFn: async () => {
      const res = await fetch(`/api/hello/${encodeURIComponent(name)}`);
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      return (await res.json()) as { message: string };
    },
  });

  return (
    <div className="container mx-auto p-8 text-center">
      <div className="mb-6">
        <Link to="/" className="underline">
          ← Back
        </Link>
      </div>
      {query.isLoading ? (
        <p>Loading…</p>
      ) : query.isError ? (
        <p className="text-red-500">{(query.error as Error).message}</p>
      ) : (
        <pre className="text-left inline-block bg-muted p-4 rounded">
          {JSON.stringify(query.data, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default HelloPage;
