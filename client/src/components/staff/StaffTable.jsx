import {
  Mail,
  Building2,
  Briefcase,
  Sparkles,
} from "lucide-react";

const roleColor = {
  ADMIN: "bg-red-100 text-red-700",
  RECEPTIONIST: "bg-blue-100 text-blue-700",
  STYLIST: "bg-emerald-100 text-emerald-700",
  ASSISTANT: "bg-violet-100 text-violet-700",
};

const StaffTable = ({ staff }) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full">
        <thead className="bg-slate-50">
          <tr className="text-xs uppercase tracking-wider text-slate-500">
            <th className="px-6 py-4 text-left">Staff</th>
            <th className="px-4 py-4 text-left">Role</th>
            <th className="px-4 py-4 text-left">Branch</th>
            <th className="px-6 py-4 text-left">Skills</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {staff.length === 0 ? (
            <tr>
              <td
                colSpan={4}
                className="py-12 text-center text-slate-500"
              >
                No staff members found.
              </td>
            </tr>
          ) : (
            staff.map((member) => (
              <tr
                key={member.id}
                className="hover:bg-slate-50 transition"
              >
                {/* Staff Info */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-100 font-bold text-cyan-700">
                      {member.user.name.charAt(0)}
                    </div>

                    <div>
                      <h3 className="font-semibold text-slate-800">
                        {member.user.name}
                      </h3>

                      <div className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                        <Mail size={13} />
                        {member.user.email}
                      </div>

                      {member.position && (
                        <p className="text-xs text-slate-400">
                          {member.position}
                        </p>
                      )}
                    </div>
                  </div>
                </td>

                {/* Role */}
                <td className="px-4 py-4">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${
                      roleColor[member.user.role.name] ||
                      "bg-slate-100 text-slate-700"
                    }`}
                  >
                    <Briefcase size={12} />
                    {member.user.role.name}
                  </span>
                </td>

                {/* Branch */}
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2 text-slate-700">
                    <Building2
                      size={15}
                      className="text-slate-400"
                    />
                    {member.branch?.name || "Not Assigned"}
                  </div>
                </td>

                {/* Skills */}
                <td className="px-6 py-4">
                  {member.skills?.length ? (
                    <div className="flex flex-wrap gap-2">
                      {member.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-medium text-cyan-700"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-slate-400">
                      <Sparkles size={14} />
                      <span className="text-sm">
                        No skills added
                      </span>
                    </div>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StaffTable;