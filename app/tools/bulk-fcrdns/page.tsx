import { BulkFCrDNSForm } from "@/components/forms/forms";

export default function BulkFCrDNS() {
  return (
    <main className='relative isolate overflow-hidden'>
      <div className='mx-auto max-w-2xl px-6 pt-56 text-center lg:px-8'>
        <h1 className='text-3xl font-bold tracking-tight text-black dark:text-white sm:text-5xl'>
          Bulk FCrDNS Check
        </h1>
        <p className='mt-6 text-lg leading-8 text-neutral-600 dark:text-neutral-400'>
          This tool allows you to look up to 100 different IP Addresses and
          check to make sure they perform a forward confirmation reverse DNS
          (FCrDNS).
        </p>
      </div>
      <BulkFCrDNSForm />
    </main>
  );
}
