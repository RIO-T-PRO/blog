import { Outlet } from "react-router-dom";
import { useState } from "react";

import Footer from "@/components/footer";
import SearchModal from "@/components/ui/search-modal";
import NavBar from "@/components/nav-bar";

const PublicLayout = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <NavBar onSearchOpen={() => setSearchOpen(true)} />

      <main>
        <Outlet />
      </main>

      <Footer />

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};

export default PublicLayout;
