import { useState } from 'react';
import { Search, ChevronDown, ChevronUp, FileText, Shield } from 'lucide-react';
import { iso42001Clauses } from '../data/isoClauses';
import { annexAControls } from '../data/annexAControls';

type TabType = 'clauses' | 'controls';
type ViewType = 'list' | 'detail';

export default function ReferencePage() {
  const [activeTab, setActiveTab] = useState<TabType>('clauses');
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState('all');

  const categories = [...new Set(annexAControls.map(c => c.category))];

  const filteredClauses = iso42001Clauses.filter(clause => {
    if (search && !clause.title.toLowerCase().includes(search.toLowerCase()) && 
        !clause.clauseNumber.includes(search) &&
        !clause.description.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const filteredControls = annexAControls.filter(control => {
    if (search && !control.title.toLowerCase().includes(search.toLowerCase()) && 
        !control.controlNumber.toLowerCase().includes(search.toLowerCase()) &&
        !control.description.toLowerCase().includes(search.toLowerCase())) return false;
    if (categoryFilter !== 'all' && control.category !== categoryFilter) return false;
    return true;
  });

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search clauses and controls..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex bg-gray-100 rounded-xl p-1">
          <button
            onClick={() => setActiveTab('clauses')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'clauses' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <FileText className="w-4 h-4" />
            Clauses (4-10)
          </button>
          <button
            onClick={() => setActiveTab('controls')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'controls' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Shield className="w-4 h-4" />
            Annex A Controls
          </button>
        </div>
      </div>

      {activeTab === 'controls' && (
        <div className="mb-4">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      )}

      {activeTab === 'clauses' && (
        <div className="space-y-3">
          {filteredClauses.map(clause => {
            const isExpanded = expandedId === clause.id;
            return (
              <div key={clause.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <button
                  onClick={() => setExpandedId(isExpanded ? null : clause.id)}
                  className="w-full text-left p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-mono bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-bold">
                        Clause {clause.clauseNumber}
                      </span>
                      <span className="font-medium text-gray-900">{clause.title}</span>
                    </div>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                  </div>
                </button>
                {isExpanded && (
                  <div className="px-4 pb-4 border-t border-gray-100 pt-4">
                    <p className="text-gray-600 mb-4">{clause.description}</p>
                    <h4 className="font-semibold text-gray-900 text-sm mb-2">Key Requirements:</h4>
                    <ul className="space-y-1 mb-4">
                      {clause.keyRequirements.map((req, i) => (
                        <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                          <span className="text-blue-500 mt-0.5">•</span>
                          {req}
                        </li>
                      ))}
                    </ul>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm mb-2">Related Annex A Controls:</h4>
                      <div className="flex flex-wrap gap-2">
                        {clause.relatedControls.map(ctrl => (
                          <span key={ctrl} className="text-xs font-mono bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                            {ctrl}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'controls' && (
        <div className="space-y-3">
          {filteredControls.map(control => {
            const isExpanded = expandedId === control.id;
            return (
              <div key={control.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <button
                  onClick={() => setExpandedId(isExpanded ? null : control.id)}
                  className="w-full text-left p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-mono bg-purple-100 text-purple-700 px-2 py-0.5 rounded font-bold">
                        {control.controlNumber}
                      </span>
                      <span className="font-medium text-gray-900">{control.title}</span>
                      <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded hidden sm:inline">
                        {control.category}
                      </span>
                    </div>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                  </div>
                </button>
                {isExpanded && (
                  <div className="px-4 pb-4 border-t border-gray-100 pt-4">
                    <p className="text-gray-600 mb-4">{control.description}</p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-blue-50 rounded-lg p-4">
                        <h4 className="font-semibold text-blue-900 text-sm mb-2">Implementation Guidance</h4>
                        <p className="text-sm text-blue-800">{control.implementationGuidance}</p>
                      </div>
                      <div className="bg-green-50 rounded-lg p-4">
                        <h4 className="font-semibold text-green-900 text-sm mb-2">Evidence Examples</h4>
                        <ul className="space-y-1">
                          {control.evidenceExamples.map((example, i) => (
                            <li key={i} className="text-sm text-green-800 flex items-start gap-2">
                              <span className="text-green-500 mt-0.5">✓</span>
                              {example}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {(activeTab === 'clauses' && filteredClauses.length === 0) || 
       (activeTab === 'controls' && filteredControls.length === 0) ? (
        <div className="text-center py-12 text-gray-500">
          No results match your search.
        </div>
      ) : null}
    </div>
  );
}