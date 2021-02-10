<template>
    <section class="flex w-full h-screen bg-red-500 justify-center items-center">
        <div id="dosbox" class="flex  bg-green-500" width="461" height="288"></div>
    </section>
</template>

<script>

// Aspect Ratio is 1.6

export default {
    name: "DosGame",
    methods: {
        requestFullScreen() {
            // This will fuck shit up.
            this.dosbox.requestFullScreen();
        }
    },
    props: [
        'path', 'exec'
    ],
    mounted() {
        const context = this;
        this.dosbox = new Dosbox({
            id: "dosbox",
            onload: function (dosbox) {
                dosbox.run(context.path, context.exec)
            },
            onrun: function (dosbox, app) {
                console.log("App '" + app + "' is running");
            }
        });

    }
}
</script>

<style scoped>
#dosbox {
    height: 80vh;
    width: 128vh;
}

#frame {

}
</style>
