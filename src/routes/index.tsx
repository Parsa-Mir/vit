import { createFileRoute } from "@tanstack/react-router";
import AnaglyphSpheresAscii from "../components/3d/AnaglyphSpheresAscii";

export const Route = createFileRoute("/")({
  component: App,
});

export function App() {
  return (
    <div className="w-screen" style={{ overscrollBehavior: "none" }}>
      <AnaglyphSpheresAscii className="mx-auto w-full h-screen" />
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <span className="text-white text-2xl font-bold drop-shadow-lg pointer-events-auto">
          Cooking ...
        </span>
      </div>
    </div>
  );
}
