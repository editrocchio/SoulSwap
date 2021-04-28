import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

export const insertInscription = payload => api.post(`/inscription`, payload)
export const getAllInscriptions = () => api.get(`/inscriptions`)
export const updateInscriptionById = (id, payload) => api.put(`/inscription/${id}`, payload)
export const deleteInscriptionById = id => api.delete(`/inscription/${id}`)
export const getInscriptionById = id => api.get(`/inscription/${id}`)

const apis = {
    insertInscription,
    getAllInscriptions,
    updateInscriptionById,
    deleteInscriptionById,
    getInscriptionById,
}

export default api