<template>
  <div ref="jitsiContainer" style="height: 100%; width: 100%;"></div>
</template>

<script>
import { onMounted , onBeforeUnmount ,ref } from 'vue';

export default {
    props: {
        domain: {
            type: String,
            default: 'meet.jit.si'
        },
        options: {
            type: Object,
            default: () => ({}),
        },
    },
    setup(props) {
        let jitsiContainer = ref(null);
        let jitsiApi = ref(null);

        onMounted(()=> {
            loadScript('https://meet.jit.si/external_api.js', () => {
                if (!window.JitsiMeetExternalAPI) throw new Error('Jitsi Meet API not loaded');
                embedJitsiWidget();
            });
        })

        onBeforeUnmount(() => {
            removeJitsiWidget();
        })

        function loadScript (src, cb) {
            // console.log('loadScript : ', src)
            const scriptEl = document.createElement('script');
            scriptEl.src = src;
            scriptEl.async = 1;
            document.querySelector('head').appendChild(scriptEl);
            scriptEl.addEventListener('load', cb);
        }

        function embedJitsiWidget () {
            const options = {
                ...props.options,
                parentNode: jitsiContainer.value,
            };
            jitsiApi.value = new window.JitsiMeetExternalAPI(props.domain, options);
            
        }

        function executeCommand (command, ...value) {
           jitsiApi.value.executeCommand(command, ...value);
        }

        function addEventListener (event, fn) {
          jitsiApi.value.on(event, fn);
        }
        
        // Misc
        function removeJitsiWidget () {
            if (jitsiApi.value) jitsiApi.value.dispose();
        }

        return {
            jitsiContainer,
            embedJitsiWidget,
            executeCommand,
            addEventListener,
            removeJitsiWidget
        }
    },
}
</script>
