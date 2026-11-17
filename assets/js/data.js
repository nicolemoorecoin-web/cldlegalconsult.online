/* ------------------------------------------------------------------
   data.js — all site content lives here.
   No database: every list below is a static array that the front-end
   filters over in the browser. Swap a file-based array for a fetch()
   call and the rest of the code keeps working.
   ------------------------------------------------------------------ */
(function (global) {
  'use strict';

  /* --- Navigation ------------------------------------------------- */
  var NAV = [
    {
      id: 'people',
      label: 'People',
      href: 'people.html',
      lead: 'Our lawyers are recognised for their legal innovation and outstanding service to clients worldwide.',
      cta: { label: 'Find a lawyer', href: 'people.html#find' },
      featured: {
        kicker: 'Featured content',
        items: [
          { label: 'Insights', href: 'insights.html' },
          { label: 'Newsroom', href: 'insights.html#newsroom' },
          { label: 'Our Firm', href: 'about.html' }
        ]
      },
      columns: [
        {
          heading: 'Featured content',
          links: [
            { label: 'Insights', href: 'insights.html' },
            { label: 'Newsroom', href: 'insights.html#newsroom' },
            { label: 'Our Firm', href: 'about.html' }
          ]
        },
        {
          heading: 'By practice',
          links: [
            { label: 'Corporate', href: 'services.html#practices' },
            { label: 'Dispute Resolution', href: 'services.html#practices' },
            { label: 'Finance', href: 'services.html#practices' },
            { label: 'Tax', href: 'services.html#practices' }
          ]
        },
        {
          heading: 'By location',
          links: [
            { label: 'All offices', href: 'locations.html' },
            { label: 'Americas', href: 'locations.html#americas' },
            { label: 'EMEA', href: 'locations.html#emea' },
            { label: 'Asia-Pacific', href: 'locations.html#asia-pacific' }
          ]
        }
      ]
    },
    {
      id: 'services',
      label: 'Services',
      href: 'services.html',
      lead: 'We help clients worldwide resolve their most complex legal challenges.',
      cta: { label: 'Find a service', href: 'services.html' },
      featured: {
        kicker: 'Featured',
        items: [
          { label: 'Energy', href: 'services.html#industries' },
          { label: 'Infrastructure', href: 'services.html#industries' },
          { label: 'Private Capital', href: 'services.html#industries' },
          { label: 'Technology', href: 'services.html#industries' }
        ]
      },
      columns: [
        {
          heading: 'Our services',
          links: [
            { label: 'Industry', href: 'services.html#industries' },
            { label: 'Practice', href: 'services.html#practices' },
            { label: 'Region', href: 'services.html#regions' }
          ]
        },
        {
          heading: 'Featured',
          links: [
            { label: 'Energy', href: 'services.html#industries' },
            { label: 'Infrastructure', href: 'services.html#industries' },
            { label: 'Private Capital', href: 'services.html#industries' },
            { label: 'Technology', href: 'services.html#industries' }
          ]
        },
        {
          heading: 'Key contacts',
          links: [
            { label: 'M&A', href: 'services.html#practices' },
            { label: 'Project Finance', href: 'services.html#practices' },
            { label: 'International Arbitration', href: 'services.html#practices' },
            { label: 'Banking & Finance', href: 'services.html#practices' }
          ]
        }
      ]
    },
    {
      id: 'insights',
      label: 'Insights',
      href: 'insights.html',
      lead: 'Explore market trends, legal analysis, industry knowledge and practice capabilities.',
      cta: { label: 'Explore our Insights', href: 'insights.html' },
      featured: {
        kicker: 'Our series',
        items: [
          { label: 'Global Market Outlook', href: 'insights.html#series' },
          { label: 'Partner Perspectives', href: 'insights.html#series' },
          { label: 'Cross-Sector Briefings', href: 'insights.html#series' },
          { label: 'Insights', href: 'insights.html#latest' }
        ]
      },
      columns: [
        {
          heading: 'Our series',
          links: [
            { label: 'Global Market Outlook', href: 'insights.html#series' },
            { label: 'Partner Perspectives', href: 'insights.html#series' },
            { label: 'Cross-Sector Briefings', href: 'insights.html#series' },
            { label: 'Deal Explorer', href: 'insights.html#series' },
            { label: 'Debt Explorer', href: 'insights.html#series' }
          ]
        },
        {
          heading: 'Formats',
          links: [
            { label: 'Alerts', href: 'insights.html?type=alerts' },
            { label: 'Case Studies', href: 'insights.html?type=case-studies' },
            { label: 'Events & Webinars', href: 'insights.html?type=events' },
            { label: 'Podcasts', href: 'insights.html?type=podcasts' },
            { label: 'Videos', href: 'insights.html?type=videos' },
            { label: 'Stories', href: 'insights.html?type=stories' }
          ]
        },
        {
          heading: 'Resources',
          links: [
            { label: 'Tools & resources', href: 'insights.html#series' },
            { label: 'Subscribe', href: 'insights.html#subscribe' },
            { label: 'Client alerts archive', href: 'insights.html?type=alerts' }
          ]
        }
      ]
    },
    {
      id: 'newsroom',
      label: 'Newsroom',
      href: 'insights.html#newsroom',
      lead: 'We advise on complex cross-border transactions, arbitration and litigation, offering deep US, English and local law capabilities.',
      cta: { label: 'Explore our latest news', href: 'insights.html#newsroom' },
      featured: {
        kicker: 'In the media',
        items: [
          { label: 'Media coverage', href: 'insights.html#newsroom' },
          { label: 'Press releases', href: 'insights.html#newsroom' },
          { label: 'Awards & rankings', href: 'about.html#awards' }
        ]
      },
      columns: [
        {
          heading: 'Media coverage',
          links: [
            { label: 'In the media', href: 'insights.html#newsroom' },
            { label: 'Media contacts', href: 'contact.html#media' },
            { label: 'Press releases', href: 'insights.html#newsroom' }
          ]
        },
        {
          heading: 'Our accolades',
          links: [
            { label: 'Awards', href: 'about.html#awards' },
            { label: 'Rankings', href: 'about.html#awards' }
          ]
        },
        {
          heading: 'Firm news',
          links: [
            { label: 'Announcements', href: 'insights.html#newsroom' },
            { label: 'Annuals', href: 'about.html#annuals' }
          ]
        }
      ]
    },
    {
      id: 'about',
      label: 'About Us',
      href: 'about.html',
      lead: 'We serve clients across 43 offices in 29 countries, delivering innovative legal solutions for complex cross-border matters.',
      cta: { label: 'Learn more about us', href: 'about.html' },
      featured: {
        kicker: 'Annuals',
        items: [
          { label: 'Perspective: 2025', href: 'about.html#annuals' },
          { label: 'Responsible Business Review', href: 'about.html#annuals' }
        ]
      },
      columns: [
        {
          heading: 'About',
          links: [
            { label: 'Our Firm', href: 'about.html' },
            { label: 'Locations', href: 'locations.html' },
            { label: 'Innovation', href: 'about.html#innovation' },
            { label: 'Engagement & Development', href: 'about.html#values' },
            { label: 'Responsible Business', href: 'about.html#responsible' },
            { label: 'Former Partners', href: 'about.html#former-partners' }
          ]
        },
        {
          heading: 'Annuals',
          links: [
            { label: 'Perspective: 2025', href: 'about.html#annuals' },
            { label: 'Responsible Business Review', href: 'about.html#annuals' }
          ]
        },
        {
          heading: 'Recognition',
          links: [
            { label: 'Awards', href: 'about.html#awards' },
            { label: 'Rankings', href: 'about.html#awards' }
          ]
        }
      ]
    },
    {
      id: 'careers',
      label: 'Careers',
      href: 'careers.html',
      lead: 'We will support you, give you responsibility and welcome you as an integral member of our diverse, international team from day one.',
      cta: { label: 'Explore opportunities', href: 'careers.html' },
      featured: {
        kicker: 'Explore',
        items: [
          { label: 'Careers', href: 'careers.html' },
          { label: 'Apply', href: 'careers.html#apply' },
          { label: 'Alumni', href: 'careers.html#alumni' }
        ]
      },
      columns: [
        {
          heading: 'Explore',
          links: [
            { label: 'Careers', href: 'careers.html' },
            { label: 'Apply', href: 'careers.html#apply' },
            { label: 'Alumni', href: 'careers.html#alumni' }
          ]
        },
        {
          heading: 'Roles',
          links: [
            { label: 'Graduate', href: 'careers.html#apply' },
            { label: 'Summer', href: 'careers.html#apply' },
            { label: 'Business support', href: 'careers.html#apply' },
            { label: 'Counsel', href: 'careers.html#apply' }
          ]
        },
        {
          heading: 'Life here',
          links: [
            { label: 'Our values', href: 'careers.html#values' },
            { label: 'Learning & development', href: 'careers.html#history' },
            { label: 'Life at the firm', href: 'careers.html#life' }
          ]
        }
      ]
    }
  ];

  /* --- Offices ---------------------------------------------------- */
  var OFFICES = [
    { region: 'americas', city: 'Chicago', address: '155 North Wacker Drive', postal: 'Chicago, IL 60606', phone: '+1 312 555 0187' },
    { region: 'americas', city: 'Arizona', address: '2 North Central Avenue, Suite 1200', postal: 'Phoenix, AZ 85004', phone: '+1 623 555 0176' },
    { region: 'americas', city: 'Houston', address: '1100 Louisiana Street', postal: 'Houston, TX 77002', phone: '+1 713 555 0163' },
    { region: 'americas', city: 'Los Angeles', address: '633 West 5th Street', postal: 'Los Angeles, CA 90071', phone: '+1 213 555 0119' },
    { region: 'americas', city: 'Mexico City', address: 'Paseo de la Reforma 250', postal: 'Ciudad de México 06600', phone: '+52 55 5550 0174' },
    { region: 'americas', city: 'Miami', address: '200 South Biscayne Boulevard', postal: 'Miami, FL 33131', phone: '+1 305 555 0155' },
    { region: 'americas', city: 'New York', address: '1155 Avenue of the Americas', postal: 'New York, NY 10036', phone: '+1 212 555 0100' },
    { region: 'americas', city: 'São Paulo', address: 'Av. Brigadeiro Faria Lima 3477', postal: 'São Paulo 04538-133', phone: '+55 11 5550 0198' },
    { region: 'americas', city: 'Seattle', address: '1000 2nd Ave, Suite 2530', postal: 'Seattle, WA 98104, USA', phone: '+1 206 555 0142' },
    { region: 'americas', city: 'Silicon Valley', address: '2600 Gateway Boulevard', postal: 'Santa Clara, CA 95054', phone: '+1 650 555 0128' },
    { region: 'americas', city: 'Tampa Global Operations Center', address: 'One Tampa City Center', postal: 'Tampa, FL 33602', phone: '+1 813 555 0171' },

    { region: 'emea', city: 'Abu Dhabi', address: 'Al Danah District, Tower 2', postal: 'Abu Dhabi, UAE', phone: '+971 2 555 0181' },
    { region: 'emea', city: 'Astana', address: '16/7 Altyn Ran Towers', postal: 'Astana 020000, Kazakhstan', phone: '+7 7172 555 014' },
    { region: 'emea', city: 'Berlin', address: 'Kurfürstendamm 190', postal: '10707 Berlin, Germany', phone: '+49 30 555 0129' },
    { region: 'emea', city: 'Brussels', address: 'Avenue Louise 240', postal: '1050 Brussels, Belgium', phone: '+32 2 555 0166' },
    { region: 'emea', city: 'Cairo', address: '28 Nile Street, Zamalek', postal: 'Cairo 11211, Egypt', phone: '+20 2 555 0153' },
    { region: 'emea', city: 'Doha', address: 'Al Bidda Tower, Level 31', postal: 'Doha, Qatar', phone: '+974 4412 5550' },
    { region: 'emea', city: 'Dubai', address: 'Gate Village 8, DIFC', postal: 'Dubai, UAE', phone: '+971 4 555 0177' },
    { region: 'emea', city: 'Düsseldorf', address: 'Königsallee 92a', postal: '40212 Düsseldorf, Germany', phone: '+49 211 555 0139' },
    { region: 'emea', city: 'Frankfurt', address: 'Taunusanlage 8', postal: '60329 Frankfurt, Germany', phone: '+49 69 555 0144' },
    { region: 'emea', city: 'Geneva', address: 'Rue du Rhône 65', postal: '1204 Geneva, Switzerland', phone: '+41 22 555 0188' },
    { region: 'emea', city: 'Hamburg', address: 'Jungfernstieg 24', postal: '20359 Hamburg, Germany', phone: '+49 40 555 0158' },
    { region: 'emea', city: 'Helsinki', address: 'Kaarlenkatu 8', postal: '00100 Helsinki, Finland', phone: '+358 9 555 0122' },
    { region: 'emea', city: 'Istanbul', address: 'Büyükdere Avenue 255', postal: '34357 Istanbul, Türkiye', phone: '+90 212 555 0169' },
    { region: 'emea', city: 'Johannesburg', address: '35 Fox Street', postal: 'Johannesburg 2196, South Africa', phone: '+27 11 555 0134' },
    { region: 'emea', city: 'London', address: '80 Strand', postal: 'London WC2R 0RL, United Kingdom', phone: '+44 20 5550 1100' },
    { region: 'emea', city: 'Luxembourg', address: '19 rue Edward Steichen', postal: 'L-2540 Luxembourg', phone: '+352 2 555 0147' },
    { region: 'emea', city: 'Madrid', address: 'Paseo de la Castellana 259', postal: '28046 Madrid, Spain', phone: '+34 91 555 0183' },
    { region: 'emea', city: 'Milan', address: 'Via della Spiga 26', postal: '20121 Milan, Italy', phone: '+39 02 5550 1170' },
    { region: 'emea', city: 'Muscat', address: 'Al Khuwair, Blocks 234/235', postal: 'Muscat, Oman', phone: '+968 2 555 0191' },
    { region: 'emea', city: 'Paris', address: '19 avenue Franklin Roosevelt', postal: '75008 Paris, France', phone: '+33 1 555 0112' },
    { region: 'emea', city: 'Prague', address: 'Na Příkopě 14', postal: '11000 Prague, Czech Republic', phone: '+420 2 5550 1180' },
    { region: 'emea', city: 'Riyadh', address: 'King Abdullah Financial District', postal: 'Riyadh 12211, Saudi Arabia', phone: '+966 11 555 0164' },
    { region: 'emea', city: 'Stockholm', address: 'Sveavägen 44', postal: '111 34 Stockholm, Sweden', phone: '+46 8 555 0131' },
    { region: 'emea', city: 'Tashkent', address: '8 Amir Timur Street', postal: 'Tashkent 100084, Uzbekistan', phone: '+998 71 555 0157' },
    { region: 'emea', city: 'Warsaw', address: 'Rondo 1', postal: '00-647 Warsaw, Poland', phone: '+48 22 555 0173' },

    { region: 'asia-pacific', city: 'Beijing', address: 'Yintai Centre, Tower C', postal: 'Beijing 100020, China', phone: '+86 10 5550 1101' },
    { region: 'asia-pacific', city: 'Hong Kong SAR', address: '12 Harcourt Road', postal: 'Hong Kong', phone: '+852 2 555 0148' },
    { region: 'asia-pacific', city: 'Manila Global Operations Center', address: '11th Avenue, Bonifacio Global City', postal: 'Taguig 1635, Philippines', phone: '+63 2 5550 1190' },
    { region: 'asia-pacific', city: 'Melbourne', address: '120 Collins Street', postal: 'Melbourne VIC 3000, Australia', phone: '+61 3 5550 1122' },
    { region: 'asia-pacific', city: 'Seoul', address: '50 Sejong-daero', postal: 'Seoul 04524, South Korea', phone: '+82 2 555 0138' },
    { region: 'asia-pacific', city: 'Shanghai', address: 'One Lujiazui, Pudong', postal: 'Shanghai 200120, China', phone: '+86 21 5550 1175' },
    { region: 'asia-pacific', city: 'Singapore', address: '12 Marina Boulevard', postal: 'Singapore 018982', phone: '+65 6 555 0119' },
    { region: 'asia-pacific', city: 'Sydney', address: '1 Martin Place', postal: 'Sydney NSW 2000, Australia', phone: '+61 2 5550 1160' },
    { region: 'asia-pacific', city: 'Tokyo', address: 'Marunouchi Trust Tower North', postal: 'Tokyo 100-0005, Japan', phone: '+81 3 5550 1133' }
  ];

  /* --- Lawyers ----------------------------------------------------
     The searchable directory holds a single principal. The firm-level
     lawyer count shown across the site is a separate, static figure. */
  var LAWYERS = [
    {
      name: 'Jeff Hughes',
      title: 'Principal Consultant',
      practice: 'Corporate & Commercial',
      industry: 'Technology',
      office: 'Seattle',
      focus: 'Mergers & Acquisitions',
      languages: 'English, Spanish',
      email: 'jeff.hughes@cldlegalconsult.online',
      profile: 'jeff-hughes.html'
    }
  ];


  /* --- Insights --------------------------------------------------- */
  var INSIGHTS = [
    { type: 'alerts', title: 'Cross-border data transfers: what the new standard means for in-house teams', date: '2026-11-04', read: 9, practice: 'Technology', summary: 'A practical walkthrough of the revised transfer mechanism, with a checklist for mapping data flows in three weeks.' },
    { type: 'case-studies', title: 'Financing a European space launch platform', date: '2026-10-28', read: 12, practice: 'Finance', summary: 'How a syndicate of lenders structured a multi-jurisdictional financing for a launch services business.' },
    { type: 'insights', title: 'The next chapter of infrastructure finance', date: '2026-10-21', read: 7, practice: 'Finance', summary: 'Four structural shifts we expect to see in project finance over the next eighteen months.' },
    { type: 'podcasts', title: 'Financing the critical minerals race', date: '2026-10-15', read: 42, practice: 'Energy', summary: 'A conversation on how capital is being allocated to securing supply of the minerals the transition depends on.' },
    { type: 'videos', title: 'The global reach of the AI Act', date: '2026-10-09', read: 18, practice: 'Technology', summary: 'Partners from three offices discuss what the Act means for global operating models.' },
    { type: 'stories', title: 'Advice to my younger self', date: '2026-10-02', read: 6, practice: 'Corporate', summary: 'Six partners on the advice they would give themselves at the start of their careers.' },
    { type: 'events', title: 'Webinar: refinancing in a higher-rate world', date: '2026-09-25', read: 55, practice: 'Finance', summary: 'A live discussion on documentation, hedging and lender expectations in the current market.' },
    { type: 'alerts', title: 'Three strikes and three strategies', date: '2026-09-18', read: 8, practice: 'Dispute Resolution', summary: 'What the recent judgment means for enforcement strategy in commercial disputes.' },
    { type: 'insights', title: 'Global market outlook: private capital', date: '2026-09-11', read: 15, practice: 'Private Capital', summary: 'Deal volumes, structures and the terms that are holding up under pressure.' },
    { type: 'case-studies', title: 'A carve-out that stayed on schedule', date: '2026-09-04', read: 10, practice: 'Corporate', summary: 'Lessons from sequencing a complex carve-out across eleven jurisdictions.' },
    { type: 'podcasts', title: 'Building a market for critical minerals', date: '2026-08-28', read: 38, practice: 'Energy', summary: 'Participants on the policy signals that will move or stall the projects in the pipeline.' },
    { type: 'insights', title: 'Taxing digital services: a comparative survey', date: '2026-08-20', read: 13, practice: 'Tax', summary: 'A country-by-country look at the direct and indirect taxes now reaching digital businesses.' },
    { type: 'events', title: 'Panel: arbitration under the new rules', date: '2026-08-14', read: 48, practice: 'Dispute Resolution', summary: 'Practitioners compare how the revised rules changed hearing preparation.' },
    { type: 'stories', title: 'The team behind the deal: New York', date: '2026-08-06', read: 5, practice: 'Corporate', summary: 'A look inside the group that closed the firm\'s largest M&A transaction of the year.' },
    { type: 'videos', title: 'Turning climate commitments into compliance', date: '2026-07-30', read: 21, practice: 'Dispute Resolution', summary: 'What disclosure obligations mean for claims brought against corporate transition plans.' },
    { type: 'alerts', title: 'Supply chain disruption: allocating new risk', date: '2026-07-23', read: 7, practice: 'Corporate', summary: 'How to read the latest force majeure and change-in-law provisions in long-term supply contracts.' }
  ];

  /* --- Services --------------------------------------------------- */
  var INDUSTRIES = [
    { name: 'Energy', blurb: 'Advisory across upstream, power, renewables and the energy transition.', count: 42 },
    { name: 'Infrastructure', blurb: 'Project development, finance and disputes in infrastructure markets.', count: 51 },
    { name: 'Private Capital', blurb: 'Structuring, funding and exit for private equity and credit investors.', count: 63 },
    { name: 'Technology', blurb: 'Counsel for the companies defining the next decade of technology.', count: 38 },
    { name: 'Life Sciences', blurb: 'Regulatory, transactional and IP work across the sector.', count: 26 },
    { name: 'Financial Institutions', blurb: 'Regulatory and transaction work for banks and insurers.', count: 31 },
    { name: 'Consumer & Retail', blurb: 'Brand, supply chain and digital commerce for consumer businesses.', count: 22 },
    { name: 'Real Estate', blurb: 'Acquisition, development, finance and leasing across major markets.', count: 18 }
  ];

  var PRACTICES = [
    { name: 'Corporate', blurb: 'Mergers & acquisitions, joint ventures and corporate governance.', count: 94 },
    { name: 'Banking & Finance', blurb: 'Acquisition finance, syndicated lending, structured finance and capital markets.', count: 78 },
    { name: 'Dispute Resolution', blurb: 'Commercial litigation, international arbitration and investigations.', count: 87 },
    { name: 'Tax', blurb: 'Corporate, transaction and dispute tax work across jurisdictions.', count: 44 },
    { name: 'Competition', blurb: 'Merger control, cartel investigations and state aid.', count: 25 },
    { name: 'Employment, pensions & incentives', blurb: 'Executive arrangements, workforce change and remuneration.', count: 29 },
    { name: 'IP & Data', blurb: 'Patents, trade marks, licensing and data protection.', count: 33 },
    { name: 'Real Estate', blurb: 'Acquisition, development, finance and leasing.', count: 18 }
  ];

  var REGIONS = [
    { name: 'Americas', blurb: 'Eleven offices across North and South America.', count: 11 },
    { name: 'EMEA', blurb: 'Twenty-five offices across Europe, the Middle East and Africa.', count: 23 },
    { name: 'Asia-Pacific', blurb: 'Nine offices across Asia and Australia.', count: 9 }
  ];

  /* --- Site-wide contact details ------------------------------------ */
  var SITE = {
    name: 'CLD Legal Consultant',
    domain: 'cldlegalconsult.online',
    url: 'https://cldlegalconsult.online',
    addressLine1: '1000 2nd Ave Ste 2530',
    addressLine2: 'Seattle, WA 98104',
    addressCountry: 'USA',
    phone: '+1 (904) 397-7052',
    phoneHref: '+19043977052',
    email: 'info@cldlegalconsult.online',
    supportEmail: 'support@cldlegalconsult.online'
  };

  global.WC_DATA = {
    nav: NAV,
    site: SITE,
    offices: OFFICES,
    lawyers: LAWYERS,
    insights: INSIGHTS,
    industries: INDUSTRIES,
    practices: PRACTICES,
    regions: REGIONS
  };
})(typeof window !== 'undefined' ? window : globalThis);

/* Allow the build script to require() this file under Node. */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = globalThis.WC_DATA;
}
