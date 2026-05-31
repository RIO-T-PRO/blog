import StatCard from "../card/admin-stats";

const DashboardPage = () => {
  return (
    <section>
      <div className="mb-10">
        <h2 className="font-headline-md text-4xl text-on-background">
          Admin Dashboard
        </h2>

        <p className="mt-2 text-text-secondary">
          Overview of Chronicle editorial management.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Published Posts" value="1,248" />
        <StatCard label="Pending Comments" value="12" />
        <StatCard label="Active Writers" value="84" />
        <StatCard label="Spam Blocked" value="1,402" />
      </div>
    </section>
  );
};

export default DashboardPage;
