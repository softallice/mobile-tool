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
                    ref="jitsiRef"
                    domain="meet.jit.si/"
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
            let _size = $q.screen.height - 135;

            return _size;
        })

        let jitsiOptions = ref({
            roomName: "nds-meeting-20211201",
            width: screenWidthSize(),
            height: screenHeightSize(),
            noSSL: false,
            userInfo: {
                email: "user@email.com",
                displayName: "",
            },
            configOverwrite: {
                enableNoisyMicDetection: false,
                disableKick: true,
            },
            interfaceConfigOverwrite: {
                filmStripOnly: true,
                SHOW_JITSI_WATERMARK: false,
                SHOW_WATERMARK_FOR_GUESTS: false,
                SHOW_CHROME_EXTENSION_BANNER: false,
                TILE_VIEW_MAX_COLUMNS: 2
            },
            onload: onIFrameLoad(),
        })

        function onIFrameLoad() {
            // console.log('onIFrameLoad');
            // jitsiRef.value.executeCommand("toggleFilmStrip");
            console.log('onIFrameLoad >>>>>>>>>>>>>>>>>>>>>>>>>>>> ' , jitsiRef.value)
        }

        

        return {
            jitsiRef,
            jitsiOptions
        }
        
    },
}
</script>


