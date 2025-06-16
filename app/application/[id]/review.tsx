import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { Application } from "@/types";

interface ReviewProps {
  application: Application;
}

const Review = ({ application }: ReviewProps) => {
  const { termMonths, interestRate, loanAmount } = application.configuration;

  return (
    <div className="space-y-8">
      <div className="text-2xl font-bold">
        We&apos;re reviewing your application
      </div>

      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <div>Loan Amount</div>
          <div className="font-semibold">{formatCurrency(loanAmount)}</div>
        </div>

        <div className="flex items-center gap-2">
          <div>Interest Rate</div>
          <div className="font-semibold">{interestRate}%</div>
        </div>

        <div className="flex items-center gap-2">
          <div>Term Months</div>
          <div className="font-semibold">{termMonths}</div>
        </div>
      </div>

      <div className="text-center">
        <Badge variant="outline">
          We&apos;ll reach out to you with further steps on your registered
          email shortly.
        </Badge>
      </div>
    </div>
  );
};

export default Review;
