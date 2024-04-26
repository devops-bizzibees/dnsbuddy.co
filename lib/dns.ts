export const getDnsData = async (
  query: string,
  recordType: string,
  dnsUrl: string,
) => {
  try {
    const response = await fetch(`${dnsUrl}?name=${query}&type=${recordType}`, {
      method: "GET",
      headers: {
        accept: "application/dns-json",
      },
    });

    if (!response.ok) {
      console.error(
        `Error! status=${response.status} provider=${dnsUrl} query=${query}`,
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Fetch error: ${error}`);
    return error;
  }
};
