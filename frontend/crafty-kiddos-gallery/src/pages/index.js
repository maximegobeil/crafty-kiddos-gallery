import { DisplayCards } from "@/components/displayCards";
import { NavBar } from "@/components/navBar";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <DisplayCards />
    </div>
  );
}
