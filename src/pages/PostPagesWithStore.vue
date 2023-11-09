<template>
    <div>
        <h1> {{ $store.getters.doubleLikes }}</h1>
        <h1> {{ $store.state.isAuth ? "Привет, юзер!" : "Залогиньтесь" }}</h1>
        <div>
            <my-button @click="$store.commit('incrementLikes')">Like</my-button>
            <my-button @click="$store.commit('decrementLikes')">Dislike</my-button>
        </div>
        <h1>Страница со всякими штуками</h1>
        <my-input
            v-focus
            v-model="searchQuery"
            placeholder="поискать"
        />
        <div class="app__btns">
            <my-button
                @click="showDialog">
                Вызвать добавлялку
            </my-button>
            <my-select
                v-model="selectedSort"
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
        <div v-else>Посты загружаются, ждём</div>
<!--    <div class="page__wrapper">
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
<!--    <div ref="observer" class="observer"></div> -->
        <div v-intersection="fetchMorePosts" :totalPages="totalPages" :page="page" class="observer"></div>

    </div>
</template>

<script>

    import PostForm from '@/components/PostForm.vue'
    import PostList from '@/components/PostList.vue'

    export default {
        components: {
            PostList, PostForm
        },
        data() {
            return {
                posts: [],
                dialogVisible: false,
                isLoading: true,
                selectedSort: '',
                sortOptions: [
                    {value: 'title', name: 'По названию'},
                    {value: 'body', name: 'По содержимому'},
                ],
                searchQuery: '',
                page: 1,
                limit: 10,
                totalPages: 0,
            }
        },
        methods: {
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
            fetchPosts() {
                this.isLoading = true
                fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${this.limit}&_page=${this.page}`)
                    .then(
                        res => {
                            this.totalPages = Math.ceil(res.headers.get('x-total-count') / this.limit)
                            return res.json()
                        })
                    .then(
                        data => {
                            this.posts = data
                        })
                    .catch(error => console.error(error))
                    .finally(() => this.isLoading = false)
            },
            fetchMorePosts() {
                this.page++
                fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${this.limit}&_page=${this.page}`)
                    .then(
                        res => {
                            this.totalPages = Math.ceil(res.headers.get('x-total-count') / this.limit)
                            return res.json()
                        })
                    .then(
                        data => {
                            this.posts = [...this.posts, ...data]
                        })
                    .catch(error => console.error(error))
            },
/*
            changePage(pageNumber) {
                this.page = pageNumber
            }
*/
        },
        mounted() {
            this.fetchPosts()
        },
        computed: {
            sortedPosts() {
                return [...this.posts].sort((post1, post2) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
            },
            sortedAndSearchedPosts() {
                return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
            }
        },
        watch: {
            /*
            page(newValue) {
                this.fetchPosts()
            }
            selectedSort(newValue) { //у функции наблюдения должно быть то же имя
                this.posts.sort((post1, post2) => post1[newValue]?.localeCompare(post2[newValue]))
            },
            dialogVisible(newValue) {
                console.log(newValue)
            }
            */
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