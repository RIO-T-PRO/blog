import { FaBell, FaMagnifyingGlass, FaUser } from "react-icons/fa6";

const AdminTopbar = () => {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border-muted bg-background/80 px-6 backdrop-blur-md">
      <div className="relative w-full max-w-sm">
        <FaMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />

        <input
          type="text"
          placeholder="Search dashboard..."
          className="w-full rounded-full border border-border-muted bg-surface-container-low py-2 pl-11 pr-4 outline-none transition-all focus:border-primary"
        />
      </div>

      <div className="flex items-center gap-3 text-primary">
        <button className="rounded-full p-2 transition-colors hover:bg-primary/10">
          <FaBell />
        </button>

        <button className="rounded-full p-2 transition-colors hover:bg-primary/10">
          <FaUser />
        </button>
      </div>
    </header>
  );
};

export default AdminTopbar;
