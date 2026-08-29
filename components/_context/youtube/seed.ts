const formatNumber = (value: number) => {
  if (value >= 1000000000) {
    return `${(value / 1000000000).toFixed(1)}B`;
  }

  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }

  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }

  return value.toString();
};

const channelNames = [
  'TechNova Daily',
  'Crestline Studio',
  'North Peak Media',
  'Digital Lens',
  'The Urban Signal',
  'Future Frame',
  'Creator Orbit',
  'Morning Circuit',
  'Bright Harbor',
  'Signal & Story',
  'Mosaic Reviews',
  'Launch Grid',
  'Atlas Creative',
  'City Pulse TV',
  'ScaleWorks',
  'Clever Current',
  'Nest & Nomad',
  'Boardroom Brief',
  'The Insight Hub',
  'Next Level Labs',
  'Horizon Story',
  'Fuel & Focus',
  'Blue Echo Studio',
  'Pixel Foundry',
  'Summit Heights',
  'Trendline Media',
  'Patchwork Voices',
  'Open Road Films',
  'Amber & Co.',
  'Origin Content',
  'Signal Forge',
  'The Creator Ledger',
  'Iron Oak Reviews',
  'Echo Studio',
  'Prime Channel',
  'Northside Learning',
  'Greenhouse Media',
  'Silverline Insights',
  'Velocity Alley',
  'Maple Narrative',
  'Daylight Works',
  'Second Wind TV',
  'Drift & Domain',
  'Trailside Docs',
  'Growth Atlas',
  'Circuit Sense',
  'Story Harbor',
  'Bayside Creative',
  'Frame Theory',
  'Highland Reviews',
  'Young Current',
  'Bridge & Byte',
  'Market Beacon',
  'Countless Ideas',
  'Dynamo Journal',
  'Field Notes TV',
  'The Studio Loom',
  'Vantage Point',
  'Shortform Daily',
  'Keynote Live',
  'Finch & Finch',
  'Culture Circuit',
  'Copper & Pine',
  'Lighthouse Docs',
  'Bright Switch',
  'Common Ground Media',
  'Playbook Nation',
  'The Content Thread',
  'Swift Current',
  'North Ridge Studio',
  'Bluebird Broadcast',
  'Headline Logic',
  'Tea & Trends',
  'Create. Grow.',
  'Studio Meridian',
  'Fine Point Media',
  'Signal Avenue',
  'Harbor House',
  'Evergreen Scene',
  'The Idea Channel',
  'Focus Path',
  'Tidal Reviews',
  'Foundry Voice',
  'Sprout & Spark',
  'Modern Frame',
  'Westwind Stories',
  'Brandline TV',
  'Pivot Point',
  'Echo Trail',
  'Pine Valley Media',
  'Quiet Quarry',
  'Local Lens',
  'Nexa Content',
  'Clearwater Studio',
  'Riverside Review',
  'Flywheel Media',
  'Driftline',
  'The Idea Market',
  'Cultivate Daily',
  'Canvas & Code',
  'Open Channel Labs',
  'Sharp Signal',
  'Bloomfield TV',
  'First Light Crew',
  'Motion & Memo',
  'Insight Current',
  'Gather & Glow',
  'The Learning Loop',
  'Roadmap Stories',
  'Terminus Media',
  'Wild Orchard',
  'Under Current',
  'Digital Creek',
  'Wide Angle Review',
  'Storyline One',
  'Summit & Signal',
  'Rivet Media',
  'The Outer Line',
  'Gridline Notes',
  'Northline TV',
  'Everframe',
  'Blue Lantern',
  'Community Curve',
  'Token & Tone',
  'Fresh Current',
  'Sierra Content',
  'Pilot House',
  'The New Signal',
  'Garden Media',
  'Detail Drive',
  'Cleanframe',
  'Millhouse Studio',
  'Leadline Podcast',
  'Afterglow Labs',
  'Anchor & Angle',
  'The Brief Shelf',
  'Crest & Coast',
  'Night Shift Media',
  'Frontline Reviews',
  'Wildscale',
  'Sector Nine',
  'Golden Hour Studio',
  'Threadline',
  'Dune & Dawn',
  'Case Study TV',
  'Freshpoint Media',
  'Neon Canvas',
  'The Reach Report',
  'Riverstone Labs',
  'Peak Current',
  'The Follow Up',
  'After Dark Docs',
  'Hearth & Home',
  'Avenue Channel',
  'The Intent Wire',
  'Studio Kinetic',
  'Vista Current',
  'Narrow Path',
  'After Hours Media',
  'Calm Signal',
  'Friendly Byte',
  'Fable & Frame',
  'Low Tide Review',
  'Frequent Detail',
  'Project Lantern',
  'Mainline Media',
  'Bluepoint Works',
  'Orbit Media Lab',
  'Filter + Form',
  'The Loop Review',
  'North Creek',
  'Crescent Works',
  'The Real Score',
  'Sparkline Studio',
  'Field Guide TV',
  'Point & Pace'
];

export const seedCategories = [
  'Education',
  'Technology',
  'Business',
  'Lifestyle',
  'Entertainment',
  'Gaming',
  'Travel',
  'News',
  'Comedy',
  'Fitness'
];

export const seedCountries = [
  'United States',
  'Canada',
  'United Kingdom',
  'Germany',
  'India',
  'Australia',
  'Brazil',
  'France',
  'Japan',
  'South Korea'
];

const categories = seedCategories;
const countries = seedCountries;

const buildJoinedDate = (index: number) => {
  const year = 2013 + (index % 11);
  const month = String((index % 12) + 1).padStart(2, '0');
  const day = String((index % 27) + 1).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export const seedChannels = Array.from({ length: 1000 }, (_, index) => {
  const name = channelNames[index % channelNames.length];
  const iteration = Math.floor(index / channelNames.length) + 1;
  const subscribers = 180000 + index * 14780 + iteration * 2120;
  const views = 6200000 + index * 186930 + iteration * 7450;
  const category = categories[index % categories.length];
  const location = countries[index % countries.length];
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  return {
    id: `seed-${String(index + 1).padStart(4, '0')}`,
    channel_name: iteration > 1 ? `${name} ${iteration}` : name,
    joined: buildJoinedDate(index),
    subscribers: formatNumber(subscribers),
    views: formatNumber(views),
    socialblade_category: category,
    location,
    channel_url: `https://www.youtube.com/@${slug}`,
    description: `${name} creates content focused on ${category.toLowerCase()} trends, education, and creator growth for a global audience.`,
    updatedAt: new Date(2024, index % 12, (index % 28) + 1).toISOString()
  };
});

export const findSeedChannel = (channelId: string) =>
  seedChannels.find((channel) => channel.id === channelId) ?? null;
