import api from '../../lib/api'

const DashboardService = {
  
  getStats: async () => {
    const res = await api.get('/dashboard/stats');
    return res.data;
  },

  getMainData: async () => {
    const res = await api.get('/dashboard/main');
    return res.data;
  },

  getChartData: async () => {
    const res = await api.get('/dashboard/chart');
    return res.data;
  },

  checkWCAvailability: async () => {
    const res = await api.get('/dashboard/is-wc-available');
    return res.data;
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