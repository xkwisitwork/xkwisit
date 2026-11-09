import { Container } from "@/components/layout/Container";
import { Skeleton } from "@/components/ui/Skeleton";

export default function RootLoading() {
  return (
    <div className="min-h-screen bg-neutral-100">
      <Container className="py-24">
        <Skeleton variant="text" className="h-10 w-64" />
        <Skeleton variant="text" className="mt-4 h-4 w-96" />
        <Skeleton variant="text" className="mt-2 h-4 w-80" />
        <div className="mt-10 grid gap-6 tablet:grid-cols-2 laptop:grid-cols-3">
          <Skeleton variant="card" />
          <Skeleton variant="card" />
          <Skeleton variant="card" />
        </div>
      </Container>
    </div>
  );
}
