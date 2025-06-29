import UserItem from "./UserItem.jsx";

export default function UsersList({
  users,
  onUpdateRole,
  onDelete,
  currentUser,
}) {
  if (users.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No users found
        </h3>
        <p className="text-gray-600 mb-4">
          There are no users in the system yet.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#f1ede9]">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-black uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-black uppercase tracking-wider">
                Username
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-black uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-black uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map(user => (
              <UserItem
                key={user.id}
                user={user}
                onUpdateRole={onUpdateRole}
                onDelete={onDelete}
                currentUser={currentUser}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
