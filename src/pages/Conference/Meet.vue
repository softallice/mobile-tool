<template>
    <page>
        <page-header>
        <template #buttons-left>
            <page-header-btn-back
            label="Home"
            />
        </template>
        <template #title>화상 미팅</template>
        </page-header>
        <page-body>
            <div>
                <vue-jitsi-meet
                class="wrap"
                ref="jitsiRef"
                domain="https://meet.jit.si/"
                :options="jitsiOptions"
                ></vue-jitsi-meet>
            </div>
        </page-body>
    </page>
</template>
<script>
import { ref } from 'vue';
import JitsiMeet from 'src/components/Video/JitsiMeet';
import { useQuasar } from 'quasar';

export default {
    name: 'Meet',
    components: {
        VueJitsiMeet: JitsiMeet,
    },
    setup() {
        const $q = useQuasar();
        let jitsiRef = ref(null);

        const screenWidthSize = (() => {
            let _size = $q.screen.width;

            return _size;
        })
        const screenHeightSize = (() => {
            let _size = $q.screen.height;

            return _size;
        })

        let jitsiOptions = ref({
            roomName: "nds-meeting-20211201",
            width: screenWidthSize(),
            height: screenHeightSize(),
            noSSL: false,
            userInfo: {
            email: "user@email.com",
            displayName: "User",
            },
            configOverwrite: {
            enableNoisyMicDetection: false,
            },
            interfaceConfigOverwrite: {
            SHOW_JITSI_WATERMARK: false,
            SHOW_WATERMARK_FOR_GUESTS: false,
            SHOW_CHROME_EXTENSION_BANNER: false,
            },
            onload: onIFrameLoad(),
        })

        function onIFrameLoad() {
            console.log('onIFrameLoad');
        }

        

        return {
            jitsiRef,
            jitsiOptions
        }
        
    },
}
</script>
<style scoped>
.wrap {
  margin-bottom: -10;
}
</style>

