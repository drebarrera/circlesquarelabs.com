import Airtable from 'airtable';

export async function getTeam() {
  const base = new Airtable({ apiKey: process.env.AIRTABLE_PAT }).base('appt5ugZNETWOTJQG');

  const records = await base('Contractors List').select({
    maxRecords: 8,
    fields: ["First Name", "Last Name", "Title", "Bio", "Photo"],
    filterByFormula: "{Display on Website}",
    sort: [{field: "Years Experience", direction: "desc"}]
  }).firstPage();
  return records.map(record => record.fields);
}
