import Button from "../../shared/components/Button.jsx";
import { ROLES } from "../../shared/constants/roles.js";

export default function UserItem({
  user,
  onUpdateRole,
  onDelete,
  currentUser,
}) {
  const isCurrentUser = currentUser?.id === user.id;
  const isAdmin = user.role === ROLES.ADMIN;

  const handleRoleToggle = () => {
    const newRole = isAdmin ? ROLES.USER : ROLES.ADMIN;
    onUpdateRole(user.id, newRole);
  };

  return (
    <tr className="hover:bg-[#f7f4f1] transition-colors">
      <td className="px-6 py-4 whitespace-nowrap">
        <div>
          <div className="text-sm font-medium text-gray-900">
            {user.name}
            {isCurrentUser && (
              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                You
              </span>
            )}
          </div>
          <div className="text-sm text-gray-500">ID: {user.id}</div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        @{user.username}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            isAdmin
              ? "bg-purple-100 text-purple-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {isAdmin ? "Admin" : "User"}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <div className="flex space-x-3">
          {!isCurrentUser && (
            <>
              <Button
                onClick={handleRoleToggle}
                className="text-[#2d2e2e] hover:text-[#444545] focus:ring-[#2d2e2e]"
              >
                {isAdmin ? "Make User" : "Make Admin"}
              </Button>
              <Button
                onClick={() => onDelete(user.id)}
                className="text-red-600 hover:text-red-800 focus:ring-red-500"
              >
                Delete
              </Button>
            </>
          )}
          {isCurrentUser && (
            <span className="text-gray-400">Can't modify yourself</span>
          )}
        </div>
      </td>
    </tr>
  );
}
