import { NavBar } from "@/components/navBar";
import { UserPortal } from "@/components/userPortal";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <UserPortal />
    </div>
  );
}

/*
Create a kid
choose which kid to show
when kid selected show 
create craft
also show all craft in DB

kids page automatically show kids, 
also create kid button,
when kid selected show crafts,


*/
