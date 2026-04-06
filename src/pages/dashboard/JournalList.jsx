import React, { useState, useEffect } from 'react';
import Layout from '../../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import { getAllJournals } from '../../services/dashboard/JournalServices';
// Menambahkan ChevronRight untuk icon di list
import { RotateCcw, Funnel, ListFilter, ChevronRight } from 'lucide-react';

// Mood mapping
const moodEmojis = { sad: '😢', anxious: '😰', neutral: '😐', happy: '🙂', excited: '😄' };
const moodLabels = { sad: 'Sedih', anxious: 'Cemas', neutral: 'Biasa', happy: 'Senang', excited: 'Sangat Senang' };
const moodColors = {
  sad: 'bg-blue-100 border-blue-300',
  anxious: 'bg-orange-100 border-orange-300',
  neutral: 'bg-gray-100 border-gray-300',
  happy: 'bg-green-100 border-green-300',
  excited: 'bg-yellow-100 border-yellow-300'
};

const monthNames = [
  { value: 1, label: 'Januari' }, { value: 2, label: 'Februari' }, { value: 3, label: 'Maret' },
  { value: 4, label: 'April' }, { value: 5, label: 'Mei' }, { value: 6, label: 'Juni' },
  { value: 7, label: 'Juli' }, { value: 8, label: 'Agustus' }, { value: 9, label: 'September' },
  { value: 10, label: 'Oktober' }, { value: 11, label: 'November' }, { value: 12, label: 'Desember' }
];

export default function JournalList() {
  const navigate = useNavigate();
  const [journals, setJournals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const yearOptions = [];
  for (let year = 2025; year <= currentYear + 2; year++) { yearOptions.push(year); }

  useEffect(() => {
    const fetchJournals = async () => {
      try {
        setIsLoading(true);
        const response = await getAllJournals();
        if (response.status === 'success' && response.data) {
          setJournals(response.data);
        }
      } catch (err) {
        setError('Gagal memuat jurnal.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchJournals();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  };

  const handleResetFilters = () => {
    setSelectedMonth(currentMonth);
    setSelectedYear(currentYear);
    setFilter('all');
  };

  const isDefaultFilters = selectedMonth === currentMonth && selectedYear === currentYear && filter === 'all';

  const filteredJournals = journals.filter(journal => {
    const journalDate = new Date(journal.entry_date.split('T')[0]);
    if (selectedMonth && (journalDate.getMonth() + 1) !== selectedMonth) return false;
    if (selectedYear && journalDate.getFullYear() !== selectedYear) return false;
    if (filter === 'public' && !journal.is_public) return false;
    if (filter === 'private' && journal.is_public) return false;
    return true;
  });

  const sortedJournals = [...filteredJournals].sort((a, b) => new Date(b.entry_date) - new Date(a.entry_date));

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-[#FFFFFF] rounded-[16px] p-6 shadow-[0_6px_20px_rgba(30,41,59,0.06)] border border-[#E2E8F0] mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-[28px] font-semibold text-[#1E293B] mb-2">Daftar Jurnal</h1>
              <p className="text-[16px] text-[#64748B]">{journals.length} jurnal tercatat</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsFilterVisible(!isFilterVisible)}
                className={`p-3 rounded-[10px] border transition-all ${!isDefaultFilters ? 'bg-[#8FD6B4] text-white border-[#8FD6B4]' : 'bg-white text-[#64748B] border-[#E2E8F0]'}`}
              >
                {!isDefaultFilters ? <ListFilter size={24} /> : <Funnel size={24} />}
              </button>
              <button
                onClick={() => navigate('/journal/new')}
                className="px-6 py-3 rounded-[10px] font-semibold bg-[#8FD6B4] text-white hover:bg-[#62957c]"
              >
                + Tulis Jurnal Baru
              </button>
            </div>
          </div>
        </div>

        {/* Filter Dropdown */}
        {isFilterVisible && (
          <div className="bg-[#FFFFFF] rounded-[16px] p-4 shadow-[0_6px_20px_rgba(30,41,59,0.06)] border border-[#E2E8F0] mb-6">
            <div className="flex flex-wrap items-center gap-3">
              <select value={selectedMonth} onChange={(e) => setSelectedMonth(Number(e.target.value))} className="px-4 py-2 rounded-[8px] border border-[#E2E8F0] bg-white">
                {monthNames.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
              </select>
              <select value={selectedYear} onChange={(e) => setSelectedYear(Number(e.target.value))} className="px-4 py-2 rounded-[8px] border border-[#E2E8F0] bg-white">
                {yearOptions.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
              <button onClick={handleResetFilters} disabled={isDefaultFilters} className="flex items-center gap-2 px-4 py-2 rounded-[8px] bg-red-50 text-red-600 disabled:opacity-50">
                <RotateCcw size={16} /> Reset
              </button>
            </div>
          </div>
        )}

        {/* List Content */}
        {isLoading ? (
          <div className="text-center p-12 bg-white rounded-[16px] border border-[#E2E8F0]">Memuat...</div>
        ) : sortedJournals.length === 0 ? (
          <div className="text-center p-12 bg-white rounded-[16px] border border-[#E2E8F0]">Tidak ada jurnal ditemukan.</div>
        ) : (
          <div className="flex flex-col gap-4">
            {sortedJournals.map(journal => (
              <button
                key={journal.id}
                onClick={() => navigate(`/journal/${journal.id}`)}
                className="bg-[#FFFFFF] rounded-[16px] p-6 shadow-[0_6px_20px_rgba(30,41,59,0.06)] border border-[#E2E8F0] hover:border-[#5B8DEF] text-left flex items-center justify-between transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center text-[28px] ${moodColors[journal.mood] || 'bg-gray-100'} border-2`}>
                    {moodEmojis[journal.mood] || '😐'}
                  </div>
                  <div>
                    <h3 className="text-[18px] font-semibold text-[#1E293B]">{formatDate(journal.entry_date)}</h3>
                    <p className="text-[14px] text-[#64748B]">
                        Mood: {moodLabels[journal.mood] || 'Biasa'}
                    </p>
                  </div>
                </div>
                {/* Icon Funnel sudah diganti menjadi ChevronRight (Arrow) */}
                <ChevronRight size={20} className="text-[#64748B]" />
              </button>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}