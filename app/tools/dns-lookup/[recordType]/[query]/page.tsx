import { DnsLookUpForm } from "@/components/forms/forms";
import { buildMetadata } from "@/components/metadata";
import { CommonRecordTypes } from "@/types/record-types";
import { redirect } from "next/navigation";

export async function generateMetadata({
  params,
}: { params: { recordType?: string; query?: string } }) {
  return buildMetadata({
    title: `${params.recordType?.toUpperCase()} Records for ${
      params.query
    } | DNSBuddy.co`,
    description: `Lookup the ${params.recordType?.toUpperCase()} Record for ${
      params.query
    } across a wide range of DNS Providers and locations.`,
    url: `https://DnsBuddy.co/tools/dns-lookup/${params.recordType}/${params.query}`,
    slogan: `Lookup a ${params.recordType?.toUpperCase()} record for ${
      params.query
    }..`,
  });
}

export default function DnsLookup({
  params,
}: { params: { recordType?: string; query?: string } }) {
  if (
    params.recordType &&
    // biome-ignore lint: This isn't an issue.
    !CommonRecordTypes.hasOwnProperty(
      params.recordType.toUpperCase() as keyof typeof CommonRecordTypes,
    )
  ) {
    redirect("/tools/dns-lookup");
  }
  return (
    <main className="relative isolate overflow-hidden">
      <div className="mx-auto px-6 pt-24 md:pt-56 text-center lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-black dark:text-white">
          Lookup a {params.recordType?.toUpperCase()} record for{" "}
          <span className="underline">{params.query}</span>..
        </h1>
        <p className="mt-4 leading-6 text-neutral-600 dark:text-neutral-400">
          Making DNS Lookups, cleaner, easier and faster in one place.
        </p>
        <div className="mt-10">
          <DnsLookUpForm recordType={params.recordType} query={params.query} />
        </div>
      </div>
    </main>
  );
}
