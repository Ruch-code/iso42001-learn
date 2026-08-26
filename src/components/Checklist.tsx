import { useState, useEffect } from 'react';
import { CheckCircle, Circle, Clock, MinusCircle, ChevronDown, ChevronUp, Search } from 'lucide-react';
import type { ChecklistItem } from '../types';
import { defaultChecklist } from '../data/checklistItems';

type FilterCategory = 'all' | 'critical' | 'high' | 'medium' | 'low';
type FilterStatus = 'all' | 'not-started' | 'in-progress' | 'completed' | 'na';

const statusConfig: Record<string, { icon: typeof Circle; color: string; label: string }> = {
  'not-started': { icon: Circle, color: 'text-gray-400', label: 'Not Started' },
  'in-progress': { icon: Clock, color: 'text-amber-500', label: 'In Progress' },
  'completed': { icon: CheckCircle, color: 'text-green-500', label: 'Completed' },
  'na': { icon: MinusCircle, color: 'text-gray-300', label: 'N/A' }
};

const priorityColors: Record<string, string> = {
  critical: 'bg-red-100 text-red-700 border-red-200',
  high: 'bg-orange-100 text-orange-700 border-orange-200',
  medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  low: 'bg-blue-100 text-blue-700 border-blue-200'
};

const STORAGE_KEY = 'iso42001-checklist';

export default function ClientChecklist() {
  const [itemStates, setItemStates] = useState<Record<string, { status: string; notes: string }>>({});
  const [priorityFilter, setPriorityFilter] = useState<FilterCategory>('all');
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('all');
  const [search, setSearch] = useState('');
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try { setItemStates(JSON.parse(saved)); } catch {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(itemStates));
  }, [itemStates]);

  const categories = [...new Set(defaultChecklist.map(item => item.category))];

  const filteredItems = defaultChecklist.filter(item => {
    const itemStatus = itemStates[item.id]?.status || item.status;
    if (priorityFilter !== 'all' && item.priority !== priorityFilter) return false;
    if (statusFilter !== 'all' && itemStatus !== statusFilter) return false;
    if (categoryFilter !== 'all' && item.category !== categoryFilter) return false;
    if (search && !item.requirement.toLowerCase().includes(search.toLowerCase()) &&
        !item.description.toLowerCase().includes(search.toLowerCase()) &&
        !item.clause.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const totalItems = defaultChecklist.length;
  const completedCount = defaultChecklist.filter(item => (itemStates[item.id]?.status || item.status) === 'completed').length;
  const inProgressCount = defaultChecklist.filter(item => (itemStates[item.id]?.status || item.status) === 'in-progress').length;
  const percentage = Math.round((completedCount / totalItems) * 100);

  const handleStatusChange = (itemId: string, newStatus: string) => {
    setItemStates(prev => ({
      ...prev,
      [itemId]: { ...prev[itemId], status: newStatus, notes: prev[itemId]?.notes || '' }
    }));
  };

  const handleNotesChange = (itemId: string, notes: string) => {
    setItemStates(prev => ({
      ...prev,
      [itemId]: { ...prev[itemId], notes, status: prev[itemId]?.status || 'not-started' }
    }));
  };

  return (
    <div>
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Client Readiness Checklist</h2>
          <div className="text-sm text-gray-500">{completedCount}/{totalItems} completed</div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
          <div className="bg-blue-600 h-3 rounded-full transition-all" style={{ width: `${percentage}%` }} />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="p-3 rounded-lg bg-green-50 border border-green-200">
            <div className="text-2xl font-bold text-green-600">{completedCount}</div>
            <div className="text-xs text-green-700">Completed</div>
          </div>
          <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
            <div className="text-2xl font-bold text-amber-600">{inProgressCount}</div>
            <div className="text-xs text-amber-700">In Progress</div>
          </div>
          <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
            <div className="text-2xl font-bold text-gray-600">{totalItems - completedCount - inProgressCount}</div>
            <div className="text-xs text-gray-700">Remaining</div>
          </div>
          <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
            <div className="text-2xl font-bold text-blue-600">{percentage}%</div>
            <div className="text-xs text-blue-700">Ready</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search requirements..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value as FilterCategory)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white">
            <option value="all">All Priorities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as FilterStatus)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white">
            <option value="all">All Statuses</option>
            <option value="not-started">Not Started</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="na">N/A</option>
          </select>
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white">
            <option value="all">All Categories</option>
            {categories.map(cat => (<option key={cat} value={cat}>{cat}</option>))}
          </select>
        </div>
      </div>

      <div className="space-y-3">
        {filteredItems.map(item => {
          const itemStatus = itemStates[item.id]?.status || item.status;
          const isExpanded = expandedItem === item.id;
          const statusCfg = statusConfig[itemStatus] || statusConfig['not-started'];
          const StatusIcon = statusCfg.icon;

          return (
            <div key={item.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                   onClick={() => setExpandedItem(isExpanded ? null : item.id)}>
                <div className="flex items-start gap-3">
                  <StatusIcon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${statusCfg.color}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-mono bg-gray-100 px-2 py-0.5 rounded">{item.clause}</span>
                      <span className={`text-xs px-2 py-0.5 rounded border ${priorityColors[item.priority]}`}>{item.priority}</span>
                      <span className="text-xs text-gray-500">{item.category}</span>
                    </div>
                    <h3 className="font-medium mt-1">{item.requirement}</h3>
                    <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                  </div>
                  {isExpanded ? <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />}
                </div>
              </div>

              {isExpanded && (
                <div className="px-4 pb-4 border-t border-gray-100 pt-4">
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <div className="flex gap-2 flex-wrap">
                        {Object.entries(statusConfig).map(([key, cfg]) => (
                          <button key={key} onClick={() => handleStatusChange(item.id, key)}
                            className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${
                              itemStatus === key ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                            }`}>
                            {cfg.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Evidence / Notes</label>
                      <textarea placeholder="Document evidence of implementation or notes..."
                        value={itemStates[item.id]?.notes || ''}
                        onChange={(e) => handleNotesChange(item.id, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm resize-y" rows={3} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12 text-gray-500">No items match the selected filters.</div>
      )}
    </div>
  );
}