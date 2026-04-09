import api from '../../lib/api'

const DashboardService = {
  // --- Fungsi Individual ---
  
  getStats: async () => {
    return await api.get('/dashboard/stats').data;
  },

  getMainData: async () => {
    return await api.get('/dashboard/main').data;
  },

  getChartData: async () => {
    return await api.get('/dashboard/chart').data;
  },

  checkWCAvailability: async () => {
    return await api.get('/dashboard/is-wc-available').data;
  },

  getAllDashboardData: async () => {
    const [statsRes, mainRes, chartRes, wcRes] = await Promise.all([
      await api.get('/dashboard/stats'),
      await api.get('/dashboard/main'),
      await api.get('/dashboard/chart'),
      await api.get('/dashboard/is-wc-available')
    ]);

    return Promise.all([
      statsRes.data,
      mainRes.data,
      chartRes.data,
      wcRes.data
    ]);
  }
};

export default DashboardService;