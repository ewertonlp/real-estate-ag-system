"use client"

import { Tabs, Tab } from "../../components/ui/tabs";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Settings2 } from "lucide-react";

export default function Settings() {

  return (
    <div className="p-6 max-w-screen mx-auto">
        <div className="flex justify-start items-center border-b border-[var(--border)] py-2 gap-2">
        
        <Settings2 size={24} className="text-text"/>
        
      <h1 className="text-2xl font-bold">Settings</h1>
      </div>
      
      <div className="mt-6 p-4 bg-[var(--card)] shadow rounded-sm ">

      <Tabs >
        <Tab title="Company">
          <div className="space-y-4 mt-4">
            <Input  placeholder="Company Name" />

            <div className="grid grid-cols-2 gap-2">
            <Input  type="tel" placeholder="Phone Number" />
            <Input  type="email" placeholder="Email" />
            </div>
            <Input  placeholder="Address" />
            <div className="grid grid-cols-2 gap-2">
            <Input  type="number" placeholder="Number" />
            <Input  type="text" placeholder="City" />
            </div>
            <div className="grid grid-cols-2 gap-2">
            <Input  type="text" placeholder="State" />
            <Input  type="text" placeholder="Postal Code" />
            </div>
            <Button className="px-6 ">Save</Button>
          </div>
        </Tab>
      
        <Tab title="User Management">
          <div className="space-y-4 mt-4">
            <Input placeholder="User Name" />
            <Input type="email" placeholder="email@empresa.com" />
            <Button>Add User</Button>
          </div>
        </Tab>
        <Tab title="Integrations">
          <div className="space-y-4 mt-4">
            <Input placeholder="Your API Key" />
            <Input placeholder="Notifications Url" />
            <Button>Save Configurations</Button>
          </div>
        </Tab>
      </Tabs>
      </div>
    </div>
  );
}
