import { Badge } from "@/components/ui/badge";
import { Application } from "@/types";

interface ApplicationsTableProps {
  applications: Application[];
}

const ApplicationsTable = ({ applications }: ApplicationsTableProps) => {
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
                  {createdAt.toLocaleDateString()}
                </td>
                <td className="h-[72px] px-4 py-2 w-[400px] text-sm font-normal leading-normal">
                  {description || "-"}
                </td>
                <td className="h-[72px] px-4 py-2 w-60 text-sm font-bold leading-normal tracking-[0.015em]">
                  View Details
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
