const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

export const api = {
  auth: {
    login: async (email: string, password: string) => {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      return res.json();
    },

    register: async (data: any) => {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return res.json();
    }
  },

  services: {
    getAll: async () => {
      const res = await fetch(`${API_URL}/api/services`);
      return res.json();
    },

    subscribe: async (serviceId: string) => {
      const res = await fetch(`${API_URL}/api/services/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ serviceId })
      });
      return res.json();
    }
  },

  contact: {
    send: async (data: any) => {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return res.json();
    }
  }
}; 