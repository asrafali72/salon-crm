import { useAuth } from "../../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen space-y-6 bg-slate-50 p-1">
      {/* Header */}
      <div className="rounded-3xl bg-linear-to-r from-cyan-600 via-blue-600 to-indigo-600 p-8 text-white shadow-lg">
        <h1 className="text-4xl font-bold">My Profile</h1>
        <p className="mt-3 text-cyan-100 text-lg">
          View your account information.
        </p>
      </div>

      {/* Profile Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-8 flex flex-col items-center gap-4 md:flex-row">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-linear-to-r from-cyan-500 to-blue-600 text-4xl font-bold text-white">
            {user?.name?.charAt(0)?.toUpperCase()}
          </div>

          <div>
            <h2 className="text-3xl font-bold text-slate-800">
              {user?.name}
            </h2>
            <p className="mt-1 text-slate-500">{user?.email}</p>
            <span className="mt-3 inline-block rounded-full bg-cyan-100 px-4 py-1 text-sm font-semibold text-cyan-700">
              {user?.role}
            </span>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-xl bg-slate-50 p-5">
            <p className="text-sm font-medium text-slate-500">Full Name</p>
            <h3 className="mt-2 text-lg font-semibold text-slate-800">
              {user?.name}
            </h3>
          </div>

          <div className="rounded-xl bg-slate-50 p-5">
            <p className="text-sm font-medium text-slate-500">Email Address</p>
            <h3 className="mt-2 text-lg font-semibold text-slate-800">
              {user?.email}
            </h3>
          </div>

          <div className="rounded-xl bg-slate-50 p-5 md:col-span-2">
            <p className="text-sm font-medium text-slate-500">Account Role</p>
            <h3 className="mt-2 text-lg font-semibold text-slate-800">
              {user?.role}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;