export const postModule = {
    state: () => ({
        posts: [],
        isLoading: true,
        selectedSort: '',
        sortOptions: [
            {value: 'title', name: 'By title'},
            {value: 'body', name: 'By body'},
        ],
        searchQuery: '',
        page: 1,
        limit: 10,
        totalPages: 0,
    }),
    getters: {
        sortedPosts(state) {
            return [...state.posts].sort((post1, post2) => post1[state.selectedSort]?.localeCompare(post2[state.selectedSort]))
        },
        sortedAndSearchedPosts(state, getters) {
            return getters.sortedPosts.filter(post => post.title.toLowerCase().includes(state.searchQuery.toLowerCase()))
        }
    },
    mutations: {
        setPosts(state, posts) {
            state.posts = posts
        },
        setIsLoading(state, isLoading) {
            state.isLoading = isLoading
        },
        setSelectedSort(state, selectedSort) {
            state.selectedSort = selectedSort
        },
        setSearchQuery(state, searchQuery) {
            state.searchQuery = searchQuery
        },
        setPage(state, page) {
            state.page = page
        },
        setTotalPages(state, totalPages) {
            state.totalPages = totalPages
        },
    },
    actions: {
        fetchPosts({state, commit}) {
            commit('setIsLoading', true)
            fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${state.limit}&_page=${state.page}`)
                .then(
                    res => {
                        commit('setTotalPages', Math.ceil(res.headers.get('x-total-count') / state.limit))
                        return res.json()
                    })
                .then(
                    data => {
                        commit('setPosts', data)
                    })
                .catch(error => console.error(error))
                .finally(() => commit('setIsLoading', false))
        },
        fetchMorePosts({state, commit}) {
            commit('setPage', state.page + 1)
            fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${state.limit}&_page=${state.page}`)
                .then(
                    res => {
                        commit('setTotalPages', Math.ceil(res.headers.get('x-total-count') / state.limit))
                        return res.json()
                    })
                .then(
                    data => {
                        commit('setPosts', [...state.posts, ...data])
                    })
                .catch(error => console.error(error))
        },
    },
    namespaced: true
}