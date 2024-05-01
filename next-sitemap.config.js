/** @type {import('next-sitemap').IConfig} */
// Docs: https://github.com/iamvishnusankar/next-sitemap
const CommonRecordTypes = {
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

const WhoIsTypes = {
  IP: "IP Address",
  DOMAIN: "Domain",
};

module.exports = {
  siteUrl: process.env.SITE_URL || "http://localhost:3000",
  generateRobotsTxt: true,
  changefreq: "daily",
  priority: 0.7,
  additionalPaths: () => {
    const additionalPaths = [];

    for (const recordType of Object.keys(CommonRecordTypes)) {
      additionalPaths.push({
        loc: `/tools/dns-records/${recordType}/`,
        changefreq: "daily",
        priority: 0.7,
        lastmod: new Date().toISOString(),
      });
    }

    for (const types of Object.keys(WhoIsTypes)) {
      additionalPaths.push({
        loc: `/tools/whois/${types}/`,
        changefreq: "daily",
        priority: 0.7,
        lastmod: new Date().toISOString(),
      });
    }

    return additionalPaths;
  },
};
