import { onMounted, ref } from "vue"

export default function usePosts(limit) {

    const page = ref(1)
    const posts = ref([])
    const totalPages = ref(0)
    const isLoading = ref(true)

    const fetching = async () =>
        await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page.value}`)
            .then(
                res => {
                    totalPages.value = Math.ceil(res.headers.get('x-total-count') / limit)
                    return res.json()
                })
            .then(
                data => {
                    posts.value = data
                })
            .catch(error => console.error(error))
            .finally(() => isLoading.value = false)

    onMounted(fetching)

    const fetchMorePosts = () => {
        page.value++
        fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${2}`)
            .then(
                res => {
                    totalPages.value = Math.ceil(res.headers.get('x-total-count') / limit)
                    return res.json()
                })
            .then(
                data => {
                    posts.value = [...posts.value, ...data]
                })
            .catch(error => console.error(error))
    }

    const createPost = (post) => {
        posts.value.push(post)
    }

    const removePost = (post) => {
        posts.value = posts.value.filter(p => p.id != post.id)
    }

    return {
        posts, totalPages, isLoading, createPost, removePost, fetchMorePosts
    }
}