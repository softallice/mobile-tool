<template>
  <page>
    <page-header>
      <template #buttons-left>
        <page-header-btn-back
          label="Home"
        />
      </template>
      <template #title>위치 기반 AR</template>
    </page-header>
    <page-body >
      
      <ARScene/>
    
    </page-body>
  </page>
</template>

<script>
import ARScene from "src/components/Ar/ARScene";
import { onActivated, onDeactivated} from 'vue';

export default {
  name: 'Ar',
  components: {
    ARScene
  },
  setup() {

    onActivated(() =>{
      ableCamera();
    })

    onDeactivated(() =>{
      disableCamera();
    })

    // 카메라 끄기 버튼
    function disableCamera() {
      let video = document.getElementById("arjs-video");
      if (video) {
        video.srcObject.getVideoTracks().forEach(track => {
            track.stop();
        });
      }
    }

    async function ableCamera() {
      let video = document.getElementById("arjs-video");
      if (video) {
        await setupCamera(video);
      }
      
    }

    // 카메라 활성화
    const setupCamera =( async (video) => {
        const stream = await navigator.mediaDevices.getUserMedia({
            'audio': false,
            'video': {
            facingMode: 'user',
            aspectRatio: 1.333,
            // width: {ideal: 375},
            },
        });
        video.srcObject = stream;

        return new Promise((resolve) => {
            video.onloadedmetadata = () => {
                resolve(video);
            };
        });
    })
  }
   

}
</script>
