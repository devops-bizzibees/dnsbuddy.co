import { DnsLookUpForm } from "@/components/forms/forms";
import { buildMetadata } from "@/components/metadata";

export async function generateMetadata() {
  return buildMetadata({
    title: "DNS Record Lookup | DNSBuddy.co",
    description:
      "Explore information across any domains or IP addresses (IPv4 or IPv6) using our versatile tool. We currently support a wide range of DNS record types, including TXT, CNAME, MX, NS, A, AAAA, PTR, SOA, and more. We will then lookup the designated record across 9 different DNS Providers, and locations.",
    url: "https://DnsBuddy.co/tools/dns-lookup/",
    slogan: "DNS Records for TXT, MX, A, CNAME, NS, and more.",
  });
}

export default function DnsLookup({
  params,
}: { params: { recordType?: string; query?: string } }) {
  return (
    <main className="relative isolate overflow-hidden">
      <div className="mx-auto px-6 pt-24 md:pt-56 text-center lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-black dark:text-white">
          DNS Lookups, made easy.
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
