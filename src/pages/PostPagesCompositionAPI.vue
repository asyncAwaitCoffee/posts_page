<template>
    <div>
        <h1>Page with posts (API)</h1>
        <my-input
            v-focus
            v-model="searchQuery"
            placeholder="Search"
        />
        <div class="app__btns">
            <my-button
                @click="showDialog(true)">
                Add post
            </my-button>
            <my-select
                v-model="selectedSort"
                :options="sortOptions"
            />
        </div>
        <my-dialog v-model:show="dialogVisible">
            <post-form
                @create="createPost($event); showDialog(false)"
            />
        </my-dialog>
        <post-list
            :posts="sortedAndSearchedPosts"            
            v-if="!isLoading"
            @remove="removePost"
        />
        <div v-else>Loading...</div>
        <div v-intersection="fetchMorePosts" class="observer"></div>

    </div>
</template>

<script>

    import PostForm from '@/components/PostForm.vue'
    import PostList from '@/components/PostList.vue'

    import usePosts from '@/hooks/usePosts.js'
    import useSortedPosts from '@/hooks/useSortedPosts.js'
    import useSortedAndSearchedPosts from '@/hooks/useSortedAndSearchedPosts.js'
    import useShowDialog from '@/hooks/useShowDialog.js'

    export default {
        components: {
            PostList, PostForm
        },
        data() {
            return {
                sortOptions: [
                    {value: 'title', name: 'By title'},
                    {value: 'body', name: 'By body'},
                ],
            }
        },
        setup(props) {
            const {posts, totalPages, isLoading, createPost, removePost, fetchMorePosts} = usePosts(10)
            const {selectedSort, sortedPosts} = useSortedPosts(posts)
            const {searchQuery, sortedAndSearchedPosts} = useSortedAndSearchedPosts(sortedPosts)
            const {dialogVisible, showDialog} = useShowDialog()

            return {
                posts,
                totalPages,
                isLoading,
                selectedSort,
                sortedPosts,
                searchQuery,
                sortedAndSearchedPosts,
                dialogVisible,
                showDialog,
                createPost,
                removePost,
                fetchMorePosts
            }
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