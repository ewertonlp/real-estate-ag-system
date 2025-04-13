// components/UserProfileCard.tsx
import { Pen } from "lucide-react";
import { Agents } from "../../types";
import Image from "next/image";
import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { ChangePasswordDialog } from "./ui/alert-changePassword";

interface UserProfileCardProps {
  user: Agents;
  className?: string;
  onDelete?: () => void;
}

export default function UserProfileCard({
  user,
  className,
  onDelete,
}: UserProfileCardProps) {
  const handleDelete = () => {
    if (onDelete) {
      onDelete();
    }
  };

  return (
    <div className={`bg-[var(--card)] p-4 rounded-sm shadow ${className}`}>
      {/* Header com condicional para imagem */}
      <div className="gap-4 w-full">
        <div className="flex justify-between items-start max-w-screen">
          <div className="flex items-center gap-4">
            {user.avatar ? (
              <Image
                src={user.avatar[0].url}
                alt="Avatar"
                className="w-25 h-25 rounded-full"
                width={100}
                height={100}
                priority={false}
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">No photo</span>
              </div>
            )}
            <div>
              <h1 className="text-2xl font-bold">{user?.name}</h1>
              <p className="text-text">{user?.email}</p>
            </div>
          </div>
          <div className="bg-[var(--primary)] hover:bg-[var(--secondary)] p-2 rounded-sm transition-colors">
            <Pen size={18} className="text-white cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Seção condicional para admin */}
      {user.role === "ADMIN" && (
        <div className="mt-4 p-4 bg-yellow-100 rounded-sm">
          <h3 className="font-bold text-yellow-800">Admin privileges</h3>
        </div>
      )}

      {/* Listagem dinâmica de informações */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 bg-[var(--card)]">
        <InfoItem label="Phone" value={user.phone} />
        <InfoItem label="Address" value={user.address} />
        <InfoItem label="Role" value={user.role} />
        <InfoItem
          label="Member since"
          value={new Date(user.createdAt ?? "").toLocaleDateString()}
        />
      </div>
      <div className="mt-6 w-full flex-row justify-center items-center">
        <ChangePasswordDialog />

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-center py-2 px-6 text-red-500 hover:bg-[var(--hover)] transition-colors"
            >
              Delete Account
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove all data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-500 hover:bg-red-600 text-white"
                onClick={handleDelete}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

const InfoItem = ({ label, value }: { label: string; value?: string }) => (
  <div className="border-b pb-2">
    <span className="text-text text-sm">{label}:</span>
    <p className="font-medium">{value || "Not provided"}</p>
  </div>
);
