import axios from 'axios';
import createApi from "./createApi";

const InvitationsApi = {
    ...createApi('/api/invitations'),
    accept: (id) => axios.post(`/api/invitations/${id}`, { type: 'accept' }),
    reject: (id) => axios.post(`/api/invitations/${id}`, { type: 'reject' }),
    getAllForTeam: (teamId) => axios.get(`/api/invitations/team/${teamId}`), // todo implement
};

export default InvitationsApi;
