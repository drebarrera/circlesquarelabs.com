import Airtable from 'airtable';

export async function getAndresBarrera() {
  const base = new Airtable({ apiKey: process.env.AIRTABLE_PAT }).base(process.env.AIRTABLE_BASE);

  const records = await base('Contractors List').select({
    maxRecords: 1,
    fields: ["First Name", "Last Name", "Title", "Bio", "Photo", "Skills"],
    filterByFormula: "{Email} = 'drebarrera@yahoo.com'"
  }).firstPage();
  return records.map(record => record.fields)[0];
}
