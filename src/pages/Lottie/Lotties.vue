<template>
    <page>
        <page-header>
            <template #buttons-left>
                <page-header-btn-back
                label="Home"
                />
            </template>
            <template #title>Lottie(로티)</template>
        </page-header>
        <page-body>
            <div>
                <lottie
                    ref="animation"
                    :options="defaultOptions"
                    width="400px"
                    height="400px"
                    @animCreated="handleAnimation"
                />

                <div class="q-pa-md">
                    <q-badge color="secondary">
                        Speed: {{ animationSpeed }} (0 to 3)
                    </q-badge>

                    <q-slider v-model="animationSpeed" :min="0" :max="3" :step="0.5" @change="onSpeedChange" />
                </div>
                <div class="row q-gutter-md justify-center">
                    <q-btn color="primary" label="멈춤" @click="stop" />
                    <q-btn color="secondary" label="일시중지" @click="pause" />
                    <q-btn color="amber" label="재생" @click="play" /> 
                </div>
            </div>
        </page-body>
    </page>
</template>
<script >
import { ref } from 'vue'
import Lottie from 'src/components/Lottie/Lottie.vue'
import ani01 from 'src/assets/pinjump.json'

export default {
    components: {
      lottie: Lottie,
    },
    setup() {
        const animation = ref()
        const animationSpeed = ref(1);
        const defaultOptions = {
            animationData: ani01,
            loop: true,
            autoplay: true,
        }

        const handleAnimation = ((anim) => {
            animation.value = anim
            console.log("animation.value : ", animation.value)
        })

        const stop = (() => {
            animation.value.stop()
        })
        
        const play = (() => {
            animation.value.play()
        })
        
        const pause = (() => {
            animation.value.pause()
        })

        const onSpeedChange = (() => {
            animation.value.setSpeed(animationSpeed.value);
        })


        return {
            handleAnimation,
            defaultOptions,
            stop,
            play,
            pause,
            onSpeedChange,
            animationSpeed
        }
    }
}
</script>


