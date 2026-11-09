import { Container } from "@/components/layout/Container";
import { Skeleton } from "@/components/ui/Skeleton";

export default function MarketingLoading() {
  return (
    <Container className="py-24">
      <Skeleton variant="text" className="mx-auto h-8 w-48" />
      <Skeleton variant="text" className="mx-auto mt-4 h-12 w-3/4 max-w-2xl" />
      <Skeleton variant="text" className="mx-auto mt-4 h-4 w-2/3 max-w-xl" />
      <div className="mt-12 grid gap-6 tablet:grid-cols-2 laptop:grid-cols-3">
        <Skeleton variant="card" />
        <Skeleton variant="card" />
        <Skeleton variant="card" />
      </div>
    </Container>
  );
}
