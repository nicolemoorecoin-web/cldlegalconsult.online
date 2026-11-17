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
            { label: 'Criminal Defense', href: 'services.html#practices' },
            { label: 'Civil Litigation', href: 'services.html#practices' },
            { label: 'Family Law', href: 'services.html#practices' },
            { label: 'Immigration Law', href: 'services.html#practices' }
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
          { label: 'Drug Offences', href: 'services.html#cases' },
          { label: 'Search and Seizure', href: 'services.html#cases' },
          { label: 'Extradition', href: 'services.html#cases' },
          { label: 'Sentencing & Appeals', href: 'services.html#cases' }
        ]
      },
      columns: [
        {
          heading: 'Our services',
          links: [
            { label: 'Case types', href: 'services.html#cases' },
            { label: 'Practices', href: 'services.html#practices' },
            { label: 'Regions', href: 'services.html#regions' }
          ]
        },
        {
          heading: 'Featured',
          links: [
            { label: 'Drug Offences', href: 'services.html#cases' },
            { label: 'Search and Seizure', href: 'services.html#cases' },
            { label: 'Extradition', href: 'services.html#cases' },
            { label: 'Sentencing & Appeals', href: 'services.html#cases' }
          ]
        },
        {
          heading: 'Key contacts',
          links: [
            { label: 'Criminal Defense', href: 'services.html#practices' },
            { label: 'Civil Litigation', href: 'services.html#practices' },
            { label: 'Family Law', href: 'services.html#practices' },
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
          { label: 'The Defence Outlook', href: 'insights.html#series' },
          { label: 'From the First Hour', href: 'insights.html#series' },
          { label: 'Case Review', href: 'insights.html#series' },
          { label: 'Insights', href: 'insights.html#latest' }
        ]
      },
      columns: [
        {
          heading: 'Our series',
          links: [
            { label: 'The Defence Outlook', href: 'insights.html#series' },
            { label: 'From the First Hour', href: 'insights.html#series' },
            { label: 'Case Review', href: 'insights.html#series' },
            { label: 'Case Files', href: 'insights.html#series' },
            { label: 'Case Files', href: 'insights.html#series' }
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
      practice: 'Criminal Defense',
      industry: 'Litigation',
      office: 'Seattle',
      focus: 'Drug Offences & Airport Cases',
      languages: 'English, Spanish',
      email: 'jeff.hughes@cldlegalconsult.online',
      photo: 'assets/img/photos/tinyjeff.jpg',
      profile: 'jeff-hughes.html'
    }
  ];


  /* --- Insights --------------------------------------------------- */
  var INSIGHTS = [
    { type: 'alerts', title: 'The first hour: what happens before the interview begins', date: '2026-11-04', read: 9, practice: 'Criminal Defense', summary: 'What a lawyer can and cannot do in the first hours after an arrest, and why that window decides more than the trial does.' },
    { type: 'case-studies', title: 'Securing the dismissal of a possession charge at an airport', date: '2026-10-28', read: 12, practice: 'Criminal Defense', summary: 'How an unauthorised search of checked baggage led to the charge being dropped before an information was laid.' },
    { type: 'insights', title: 'Sentencing after the conviction', date: '2026-10-21', read: 7, practice: 'Criminal Defense', summary: 'Four questions that matter at sentencing, and the mitigation that should be prepared long before the verdict.' },
    { type: 'podcasts', title: 'When the search was never authorised', date: '2026-10-15', read: 42, practice: 'Criminal Defense', summary: 'A discussion on the exclusion of evidence obtained where the authority to search was absent or expired.' },
    { type: 'videos', title: 'Cross-examining a cooperating witness', date: '2026-10-09', read: 18, practice: 'Criminal Defense', summary: 'How a defence team puts the prosecution\'s own witness to the parts of their account that do not fit.' },
    { type: 'stories', title: 'Advice to my younger self', date: '2026-10-02', read: 6, practice: 'Criminal Defense', summary: 'Six practitioners on the advice they would give themselves in their first year of practice.' },
    { type: 'events', title: 'Webinar: bail, remands and the first eight weeks', date: '2026-09-25', read: 55, practice: 'Criminal Defense', summary: 'A live discussion on what a defendant can realistically achieve before a trial, and how to plan for it.' },
    { type: 'alerts', title: 'Digital evidence: what a device can give away', date: '2026-09-18', read: 8, practice: 'Cybercrime', summary: 'What is recoverable from a phone or a server, how it is lawfully obtained, and how it is challenged.' },
    { type: 'insights', title: 'The defence outlook: what the next year holds', date: '2026-09-11', read: 15, practice: 'Criminal Defense', summary: 'The shifts in charging, disclosure and sentencing we expect to see across our practice areas.' },
    { type: 'case-studies', title: 'An extradition request that was refused', date: '2026-09-04', read: 10, practice: 'Extradition', summary: 'Why the assurance of a fair trial was not enough, and what the court needed to see before it would surrender a person.' },
    { type: 'podcasts', title: 'Pro bono, and why it still matters', date: '2026-08-28', read: 38, practice: 'Public Law', summary: 'On the case for a duty of care in the ordinary case, and what a defence practice owes the people it cannot charge for.' },
    { type: 'insights', title: 'Money laundering in a domestic case', date: '2026-08-20', read: 13, practice: 'Criminal Defense', summary: 'How the financial layer of a case widens the charges, and how the confiscation proceedings that follow are won.' },
    { type: 'events', title: 'Panel: when the evidence is digital', date: '2026-08-14', read: 48, practice: 'Cybercrime', summary: 'Practitioners compare how digital evidence is admitted, disclosed and challenged across jurisdictions.' },
    { type: 'stories', title: 'The duty line: Seattle', date: '2026-08-06', read: 5, practice: 'Criminal Defense', summary: 'A look inside the team that answers when someone is arrested in the middle of the night.' },
    { type: 'videos', title: 'Preparing a case as though it will be heard by a jury', date: '2026-07-30', read: 21, practice: 'Criminal Defense', summary: 'Why a matter prepared for trial is a matter that settles well, and what that preparation looks like.' },
    { type: 'alerts', title: 'Breach of bail: the consequences and the way back', date: '2026-07-23', read: 7, practice: 'Criminal Defense', summary: 'What a missed hearing does to a case, and the steps that keep a defendant at liberty while it is addressed.' }
  ];

  /* --- Services --------------------------------------------------- */
  /* --- Case types ----------------------------------------------------
     The matters the practice actually acts on. These drive the
     "Case types" panel on the services page. */
  var CASE_TYPES = [
    { name: 'Drug Offences', blurb: 'Trafficking, conspiracy and possession, and the defences that apply at each stage.', count: 64 },
    { name: 'Airport & Border Cases', blurb: 'Interceptions at airports and ports of entry, and the searches that precede them.', count: 41 },
    { name: 'Search and Seizure', blurb: 'Whether the search was lawful, and what follows for the case if it was not.', count: 57 },
    { name: 'White-Collar & Fraud', blurb: 'Fraud, embezzlement and regulatory charges brought against individuals.', count: 39 },
    { name: 'Weapons & Violent Offences', blurb: 'Charges involving firearms and violence, and the mitigation that follows.', count: 33 },
    { name: 'Homicide & Manslaughter', blurb: 'The most serious allegations, and the preparation they require.', count: 18 },
    { name: 'Sexual Offences', blurb: 'Representations where consent, evidence and cross-examination are decisive.', count: 26 },
    { name: 'Cybercrime & Online Fraud', blurb: 'Computer misuse, online fraud, and the evidence held in servers.', count: 31 },
    { name: 'Domestic Violence & Family', blurb: 'Protective orders, residency and matters involving children.', count: 44 },
    { name: 'Driving Offences', blurb: 'Driving without a licence, dangerous driving and drink-driving defences.', count: 52 },
    { name: 'Money Laundering & Proceeds of Crime', blurb: 'The financial layer of a case, and the confiscation proceedings that follow.', count: 22 },
    { name: 'Extradition & Transfer', blurb: 'Requests to surrender a person, and the defences to them.', count: 17 },
    { name: 'Public Law & Inquests', blurb: 'Article 2 investigations and public-interest proceedings.', count: 14 },
    { name: 'Sentencing & Appeals', blurb: 'Mitigation at sentencing, and appeals after a conviction.', count: 47 },
    { name: 'Breach of Bail & Recall', blurb: 'The consequences of a missed hearing, and the way back.', count: 29 }
  ];
  var PRACTICES = [
    { name: 'Corporate and Business Law', blurb: 'Formation, governance, shareholder arrangements and day-to-day business advice.', count: 94 },
    { name: 'International Law', blurb: 'Cross-border transactions, trade, sanctions and foreign investment.', count: 41 },
    { name: 'Civil Litigation', blurb: 'Contract, property and commercial disputes, from demand through trial.', count: 87 },
    { name: 'Criminal Defense', blurb: 'Investigations, arrests, trials, sentencing and appeals.', count: 96 },
    { name: 'Real Estate Law', blurb: 'Purchase, sale, lease, development and finance.', count: 18 },
    { name: 'Immigration Law', blurb: 'Visas, residency, citizenship and deportation defence.', count: 37 },
    { name: 'Banking and Finance Law', blurb: 'Lending, finance, restructurings and financial regulation.', count: 78 },
    { name: 'Contract Law', blurb: 'Drafting, negotiation, variation and enforcement of commercial agreements.', count: 63 },
    { name: 'Intellectual Property Law', blurb: 'Patents, trade marks, licensing and infringement.', count: 33 },
    { name: 'Employment Law', blurb: 'Contracts, dismissals, discrimination and workplace policy.', count: 29 },
    { name: 'Family Law', blurb: 'Separation, children, financial settlements and mediation.', count: 24 },
    { name: 'Estate Planning', blurb: 'Wills, trusts, probate and succession.', count: 21 },
    { name: 'Tax Law', blurb: 'Structuring, compliance, transactions and disputes.', count: 44 },
    { name: 'Securities Law', blurb: 'Capital markets, disclosure and enforcement.', count: 26 },
    { name: 'Personal Injury Law', blurb: 'Road traffic, workplace and medical claims.', count: 35 }
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
    caseTypes: CASE_TYPES,
    practices: PRACTICES,
    regions: REGIONS
  };
})(typeof window !== 'undefined' ? window : globalThis);

/* Allow the build script to require() this file under Node. */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = globalThis.WC_DATA;
}
