<template>
    <div>
        <h1>Page with posts (Vuex)</h1>
        <my-input
            v-focus
            :model-value="searchQuery"
            @update:model-value="setSearchQuery"
            placeholder="Search"
        />
        <div class="app__btns">
            <my-button
                @click="showDialog">
                Add post
            </my-button>
            <my-select
                :model-value="selectedSort"
                @update:model-value="setSelectedSort"
                :options="sortOptions"
            />
        </div>
        <my-dialog v-model:show="dialogVisible">
            <post-form
                @create="createPost"
            />
        </my-dialog>
        <post-list
            :posts="sortedAndSearchedPosts"
            @remove="removePost"
            v-if="!isLoading"
        />
        <div v-else>Loading...</div>
    <!-- <div class="page__wrapper"> 
            <div
                v-for="pageNumber in totalPages"
                :key="pageNumber"
                class="page"
                :class = "{
                    'current-page': page === pageNumber
                }"
                @click="changePage(pageNumber)"
                >
                {{ pageNumber }}
            </div>
        </div> -->
    <div v-intersection="fetchMorePosts" class="observer"></div>
    
    </div>
</template>

<script>

    import PostForm from '@/components/PostForm.vue'
    import PostList from '@/components/PostList.vue'
    import {mapActions, mapGetters, mapMutations, mapState} from 'vuex'

    export default {
        components: {
            PostList, PostForm
        },
        data() {
            return {
                dialogVisible: false,
            }
        },
        methods: {
            ...mapMutations({
                setPage: 'post/setPage',
                setSearchQuery: 'post/setSearchQuery',
                setSelectedSort: 'post/setSelectedSort'
            }),
            ...mapActions({
                fetchPosts: 'post/fetchPosts',
                fetchMorePosts: 'post/fetchMorePosts'
            }),
            createPost(post) {
                this.posts.push(post)
                this.dialogVisible = false
            },
            removePost(post) {
                this.posts = this.posts.filter(p => p.id != post.id)
            },
            showDialog() {
                this.dialogVisible = true
            },
        },
        mounted() {
            this.fetchPosts()
        },
        computed: {
            ...mapState({
                posts: state => state.post.posts,
                isLoading: state => state.post.isLoading,
                selectedSort: state => state.post.selectedSort,
                sortOptions: state => state.post.sortOptions,
                searchQuery: state => state.post.searchQuery,
                page: state => state.post.page,
                limit: state => state.post.limit,
                totalPages: state => state.post.totalPages,
            }),
            ...mapGetters({
                sortedPosts: 'post/sortedPosts',
                sortedAndSearchedPosts: 'post/sortedAndSearchedPosts'
            })
        },
        watch: {
        }
    }

</script>

<style>

.app__btns {
    margin: 15px 0;
    display: flex;
    justify-content: space-between;
}

.page__wrapper {
    margin-top: 10px;
    width: 50%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}

.page {
    padding: 10px;
    border: 1px solid black;
    cursor: pointer;
}

.current-page {
    border: 1px solid teal;
    background-color: aquamarine;
}

.observer {
    height: 20px;
    background-color: green;
}

</style>