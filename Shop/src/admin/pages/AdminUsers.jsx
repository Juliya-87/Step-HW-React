import {
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} from "../../store/apiSlice.js";
import { useUser } from "../../shared/hooks/useUser.js";
import { useError } from "../../contexts/ErrorContext.jsx";
import Spinner from "../../shared/components/Spinner.jsx";
import UsersList from "../components/UsersList.jsx";

export default function AdminUsers() {
  const { user: currentUser } = useUser();
  const { handleError } = useError();
  const { data: users = [], isLoading } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const handleDelete = async id => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id).unwrap();
      } catch {
        handleError(new Error("Failed to delete user. Please try again."));
      }
    }
  };

  const handleUpdateRole = async (id, newRole) => {
    if (
      window.confirm(
        `Are you sure you want to change this user's role to ${newRole}?`
      )
    ) {
      try {
        await updateUser({ id, role: newRole }).unwrap();
      } catch {
        handleError(new Error("Failed to update user role. Please try again."));
      }
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-black">Users Management</h2>
      </div>

      <UsersList
        users={users}
        onUpdateRole={handleUpdateRole}
        onDelete={handleDelete}
        currentUser={currentUser}
      />
    </div>
  );
}
