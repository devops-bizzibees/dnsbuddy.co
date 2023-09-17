// Following the ICANE DNS Record Types: https://www.iana.org/assignments/dns-parameters/dns-parameters.xhtml#dns-parameters-4
// We do not include expermental, depracted nor obselete. Active types only.
enum AllRecordTypes { // TODO: FInish this
  A = 1,
  NS = 2,
  CNAME = 5,
  SOA = 6,
  WKS = 11,
  PTR = 12,
  HINFO = 13,
  MINFO = 14,
  MX = 15,
  TXT = 16,
  RP = 17,
  AFSDB = 18,
  X25 = 19,
  ISDN = 20,
  RT = 21,
  SIG = 24,
  KEY = 25,
  PX = 26,
  GPOS = 27,
  AAAA = 28,
  LOC = 29,
  EID = 31,
  NIMLOC = 32,
  SRV = 33,
  ATMA = 34,
  NAPTR = 35,
  KX = 36,
  CERT = 37,
}

export const CommonRecordTypes = {
  A: 1,
  NS: 2,
  CNAME: 5,
  SOA: 6,
  PTR: 12,
  MX: 15,
  TXT: 16,
  AAAA: 28,
  SRV: 33,
};

export const RecordTypeDescriptions = {
  A: 'Address record - Returns a 32-bit IPv4 address, most commonly used to map hostnames to an IP address of the host.',
  NS: 'Name server record - Delegates a DNS zone to use the given authoritative name servers.',
  CNAME:
    'Canonical name record - Alias of one name to another: the DNS lookup will continue by retrying the lookup with the new name.',
  SOA: 'Start of authority record - Specifies core information about a DNS zone, including the primary name server, the email of the domain administrator, the domain serial number, and several timers relating to refreshing the zone.',
  PTR: 'Pointer record - Pointer to a canonical name. Unlike a CNAME, DNS processing stops and just the name is returned. The most common use is for implementing reverse DNS lookups.',
  MX: 'Mail exchange record - Maps a domain name to a list of message transfer agents for that domain.',
  TXT: 'Text record - Originally for arbitrary human-readable text in a DNS record. Since the early 1990s, however, this record more often carries machine-readable data, such as specified by RFC 1464, opportunistic encryption, Sender Policy Framework, DKIM, DMARC, DNS-SD, etc.',
  AAAA: 'IPv6 address record - Returns a 128-bit IPv6 address, most commonly used to map hostnames to an IP address of the host.',
  SRV: 'Service locator - Generalized service location record, used for newer protocols instead of creating protocol-specific records such as MX.',
};
