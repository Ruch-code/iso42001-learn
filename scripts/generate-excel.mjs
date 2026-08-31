import XLSX from 'xlsx';

const rows = [
  ['ISO 42001 - 30-45 Day Implementation Checklist'],
  ['Created by Ruchi Kandpal'],
  [],
  ['Week', 'Day Range', 'Task', 'Reference', 'Status'],
  ['Week 1', 'Days 1-7', 'Read ISO 42001 Clauses 4-10', 'Clauses 4-10', ''],
  ['Week 1', 'Days 1-7', 'Read Annex A Controls (A.2-A.9)', 'Annex A', ''],
  ['Week 1', 'Days 1-7', 'Complete Learning Modules 1-2', 'Modules 1-2', ''],
  ['Week 1', 'Days 1-7', 'Conduct Initial Gap Analysis', 'Clause 4, 6.1', ''],
  ['Week 1', 'Days 1-7', 'Review ISO 27001 overlap controls', 'Overlap Page', ''],
  ['Week 1', 'Days 1-7', 'Identify AI systems in scope', 'Clause 4.1, 4.2', ''],
  ['Week 2', 'Days 8-14', 'Draft AI Policy', 'A.2.1', ''],
  ['Week 2', 'Days 8-14', 'Define Roles & Responsibilities', 'A.3.1, A.3.2', ''],
  ['Week 2', 'Days 8-14', 'Complete Learning Module 3', 'Module 3', ''],
  ['Week 2', 'Days 8-14', 'Establish Risk Assessment Process', 'Clause 6.1', ''],
  ['Week 2', 'Days 8-14', 'Create Document Control Process', 'A.7.5', ''],
  ['Week 2', 'Days 8-14', 'Map existing controls to ISO 42001', 'Annex A', ''],
  ['Week 3', 'Days 15-21', 'Complete Learning Module 4', 'Module 4', ''],
  ['Week 3', 'Days 15-21', 'Implement AI Data Governance', 'A.6.1-A.6.3', ''],
  ['Week 3', 'Days 15-21', 'Implement AI Development Controls', 'A.5.1-A.5.5', ''],
  ['Week 3', 'Days 15-21', 'Set Up Monitoring & Logging', 'A.8.3', ''],
  ['Week 3', 'Days 15-21', 'Conduct AI Impact Assessment', 'Clause 8.2', ''],
  ['Week 4+', 'Days 22-45', 'Complete Learning Modules 5-6', 'Modules 5-6', ''],
  ['Week 4+', 'Days 22-45', 'Conduct Internal Audit', 'Clause 9.2', ''],
  ['Week 4+', 'Days 22-45', 'Management Review', 'Clause 9.3, A.3.4', ''],
  ['Week 4+', 'Days 22-45', 'Address Non-Conformities', 'Clause 10.1', ''],
  ['Week 4+', 'Days 22-45', 'Schedule Certification Audit', 'Clause 10.2', ''],
];

const wb = XLSX.utils.book_new();
const ws = XLSX.utils.aoa_to_sheet(rows);

ws['!cols'] = [
  { wch: 10 },
  { wch: 12 },
  { wch: 45 },
  { wch: 18 },
  { wch: 15 },
];

ws['!merges'] = [
  { s: { r: 0, c: 0 }, e: { r: 0, c: 4 } },
  { s: { r: 1, c: 0 }, e: { r: 1, c: 4 } },
];

XLSX.utils.book_append_sheet(wb, ws, 'Checklist');
XLSX.writeFile(wb, 'public/ISO_42001_Roadmap_Checklist.xlsx');
console.log('Excel file generated: public/ISO_42001_Roadmap_Checklist.xlsx');
