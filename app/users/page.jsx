import AddUserButton from "@/components/buttons/AddUserButton";
import UserTable from "@/components/sections/users/UserTable";
import FiltersContainer from "@/components/sections/users/FiltersContainer";

const page = () => {
  return (
    <div className="flex w-full flex-col overflow-hidden animate-fade-in">
      {/* Top Area */}
      <div className="flex w-full flex-row flex-wrap justify-between gap-y-5 mb-2">
        <div className="flex flex-row items-center gap-x-3.5">
          <h1 className="text-2xl font-semibold text-headingText tracking-tight">Users</h1>
          <AddUserButton />
        </div>
        <div className="flex flex-row flex-wrap items-center gap-5">
          <FiltersContainer />
        </div>
      </div>

      {/* Table */}
      <UserTable />
    </div>
  );
};

export default page;
