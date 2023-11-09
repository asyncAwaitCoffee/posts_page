<template>
    <div class="navbar">
        <div @click="$router.push('/')">whaaaa?</div>
        <div class="navbar__btns">
            <my-button @click="$router.push('/posts')">Посты тут</my-button>
            <my-button @click="$router.push('/about')" style="margin-left: 10px;">О чём-то тут</my-button>
            <my-button @click="$router.push('/store')" style="margin-left: 10px;">Это store</my-button>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style>
.navbar {
    height: 50px;
    background-color: gainsboro;
    box-shadow: 2px 2px 4px grey;
    display: flex;
    align-items: center;
    padding: 0 10px;
}

.navbar__btns {
    margin-left: auto;
}
    
</style>