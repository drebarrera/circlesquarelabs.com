import Airtable from 'airtable';

export async function getAllTeamMembers() {
  const base = new Airtable({ apiKey: process.env.AIRTABLE_PAT }).base(process.env.AIRTABLE_BASE);

  const records = await base('Contractors List').select({
    fields: ["First Name", "Last Name", "Title", "Bio", "Photo", "Skills"],
    filterByFormula: "{Display on Website}",
    sort: [{field: "Years Experience", direction: "desc"}]
  }).firstPage();
  return records.map(record => record.fields);
}