// components/change-password-dialog.tsx
"use client";
import { Button } from "./button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./alert-dialog";
import { Input } from "./input";
// import { Label } from "./label"
import { useState } from "react";

export function ChangePasswordDialog() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Adicione aqui a lógica de validação e envio
    if (newPassword !== confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }
    console.log("Alterar senha:", { currentPassword, newPassword });
    // Fechar o dialog após o envio
    document.getElementById("closeDialog")?.click();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          id="closeDialog"
          variant="ghost"
          className="w-full justify-center py-2 px-6 text-[var(--primary)] hover:bg-[var(--hover)] transition-colors"
        >
          Change Password
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="sm:max-w-[450px]">
        <AlertDialogHeader className="mb-4">
          <AlertDialogTitle className="text-center">
            Change Password
          </AlertDialogTitle>
        </AlertDialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Input
                placeholder="Current Password"
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Input
                placeholder="New Password"
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>

            <div className="space-y-2">
              <Input
                placeholder="Confirm New Password"
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <AlertDialogCancel >Cancel</AlertDialogCancel>
            <AlertDialogAction type="submit" className="w-full">
              Change Password
            </AlertDialogAction>
          </div>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
