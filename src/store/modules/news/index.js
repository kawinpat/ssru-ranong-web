const state = {
    news: null,
    discuss: null,
    lg: null,
};

const getters = {
    getNews(state) {
        return state.news;
    },
    getOneNews(state) {
        return (_id) => {
            return state.news.filter((News) => News._id == _id);
        };
    },
    getTalking(state) {
        return state.discuss;
    },
    getOneDiscuss(state) {
        return (_id) => {
            return state.discuss.filter((DC) => DC._id == _id);
        };
    },
    GetLI(state) {
        return state.lg;
    },
};

const mutations = {
    KeepNews(state, news) {
        if (news) {
            state.news = news;
        } else {
            state.news = [];
        }
        return state.news;
    },
    KeepTalking(state, talking) {
        if (talking) {
            state.discuss = talking;
        } else {
            state.discuss = [];
        }
        return state.discuss;
    },
    KeepLI(state, status) {
        if (status) {
            state.lg = status;
        } else {
            state.lg = null;
        }
        return state.lg;
    },
};

const actions = {
    async OnQueryTalking({ state }, { talking }) {
        let fideTK = state.discuss.find((tk) => {
            return tk._id == talking._id;
        });
        return fideTK;
    },
};

export default {
    state,
    getters,
    mutations,
    actions,
};