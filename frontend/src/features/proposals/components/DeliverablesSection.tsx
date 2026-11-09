"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export function DeliverablesSection({ items }: { items: string[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-500">Deliverables</CardTitle>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <p className="text-300 text-neutral-600">No deliverables listed.</p>
        ) : (
          <ul className="list-disc space-y-1 pl-5 text-400">
            {items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
