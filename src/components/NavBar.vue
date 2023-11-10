<template>
    <div class="navbar">
        <div @click="$router.push('/')" class="cursor-pointer">Vue.js</div>
        <div class="navbar__btns">
            <my-button @click="$router.push('/about')" style="margin-left: 10px;">About</my-button>
            <my-button @click="$router.push('/posts')">Vue</my-button>
            <my-button @click="$router.push('/store')" style="margin-left: 10px;">Vuex</my-button>
            <my-button @click="$router.push('/composition')" style="margin-left: 10px;">Composition API</my-button>
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

.cursor-pointer {
    cursor: pointer;
}
    
</style>