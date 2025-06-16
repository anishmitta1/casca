"use client";

import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { discardApplication } from "@/lib/backend/loan-application";
import { Application } from "@/types";
import { CircleArrowOutUpRight, EllipsisVertical, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ApplicationsTableProps {
  applications: Application[];
}

const ApplicationsTable = ({ applications }: ApplicationsTableProps) => {
  const router = useRouter();

  if (applications.length === 0) {
    return <div>No applications found</div>;
  }

  return (
    <div className="border rounded-lg">
      <table className="flex-1">
        <thead>
          <tr>
            <th className="px-4 py-3 text-left w-[400px] text-sm font-medium leading-normal">
              Application ID
            </th>
            <th className="px-4 py-3 text-left w-60 text-sm font-medium leading-normal">
              Status
            </th>
            <th className="px-4 py-3 text-left w-[400px] text-sm font-medium leading-normal">
              Date Submitted
            </th>
            <th className="px-4 py-3 text-left w-[400px] text-sm font-medium leading-normal">
              Summary
            </th>
            <th className="px-4 py-3 text-left w-60 text-sm font-medium leading-normal">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {applications.map(({ created_at, id, step, description }) => {
            const createdAt = new Date(created_at);

            return (
              <tr key={id} className="border-t">
                <td className="h-[72px] px-4 py-2 w-[400px] text-sm font-normal leading-normal">
                  {`APP-${createdAt.getFullYear()}-${id}`}
                </td>
                <td className="h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                  <Badge variant="outline">{step.toUpperCase()}</Badge>
                </td>
                <td className="h-[72px] px-4 py-2 w-[400px] text-sm font-normal leading-normal">
                  {createdAt.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </td>
                <td className="h-[72px] px-4 py-2 w-[400px] text-sm font-normal leading-normal">
                  {description || "-"}
                </td>
                <td className="h-[72px] px-4 py-2 w-60 text-sm font-bold leading-normal tracking-[0.015em] text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <EllipsisVertical size={16} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      <Link
                        href={`/application/${id}`}
                        className="hover:underline"
                      >
                        <DropdownMenuItem>
                          <div className="flex items-center gap-3">
                            <CircleArrowOutUpRight size={16} />

                            <div>Continue</div>
                          </div>
                        </DropdownMenuItem>
                      </Link>

                      <DropdownMenuItem
                        onClick={() => {
                          discardApplication(id);
                          router.refresh();
                        }}
                        className="cursor-pointer"
                      >
                        <div className="text-destructive flex items-center gap-3">
                          <Trash2 size={16} />
                          <div className="font-bold">Discard</div>
                        </div>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicationsTable;
