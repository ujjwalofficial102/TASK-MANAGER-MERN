import ProfileMenu from "./ProfileMenu";

export default function Navbar() {
  return (
    <div className="w-full border-b bg-white">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="font-bold text-lg">task manager</h1>
        <ProfileMenu />
      </div>
    </div>
  );
}
