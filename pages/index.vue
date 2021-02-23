<template>
    <section class="flex flex-col justify-center items-center bg-gray-900 min-h-screen">
        <div class="text-center font-bold text-4xl mt-4">ARCADE-X</div>
        <div class="text-center font-thin text-2xl">THE REBUILD</div>
        <nuxt-link to="/games/dos/digger" class="mt-4 py-2 px-4 border border-white rounded-md bg-blue-900 z-20 pointer-events-auto cursor-pointer">PLAY DIGGER</nuxt-link>
        <nuxt-link to="/games/dos/pacman" class="mt-4 py-2 px-4 border border-white rounded-md bg-blue-900 z-20 pointer-events-auto cursor-pointer">PLAY PACMAN</nuxt-link>
        <nuxt-link to="/games/dos/bubble-bobble" class="mt-4 py-2 px-4 border border-white rounded-md bg-blue-900 z-20 pointer-events-auto cursor-pointer">PLAY BUBBLE BOBBLE</nuxt-link>
        <nuxt-link to="/games/dos/alley-cat" class="mt-4 py-2 px-4 border border-white rounded-md bg-blue-900 z-20 pointer-events-auto cursor-pointer">PLAY ALLEY CAT</nuxt-link>
        <nuxt-link to="/games/dos/dangerous-dave" class="mt-4 mb-4 py-2 px-4 border border-white rounded-md bg-blue-900 z-20 pointer-events-auto cursor-pointer">PLAY DANGEROUS DAVE</nuxt-link>
    </section>
</template>
<script>
export default {
    head() {
        return {
            title: 'Arcade X'
        }
    }
}
</script>
