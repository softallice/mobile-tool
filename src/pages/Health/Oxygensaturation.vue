<template>
    <page>
        <page-header>
        <template #buttons-left>
            <page-header-btn-back
            label="Home"
            />
        </template>
        <template #title>활력 징후 체크</template>
        </page-header>
        <page-body>
            <div >
                <div >
                    <video autoplay muted playsinline hidden ref="video" style=" width: auto; height: auto;"></video>
                </div>
                <div class="q-pa-md row justify-center">
                    <canvas ref="facecanvas"></canvas>
                </div>          		
                <div>
                    <h6> 산소포화도 : <span class="text-green"> {{ OxygenSaturation }} </span> </h6>
                    <h6> 심박수: <span class="text-blue"> {{ heartrate }} </span> BPM </h6>
                    <h6> 호흡수 : <span class="text-green"> {{ respiration }} </span> 회/분</h6>
                </div>
            </div>   
        </page-body>
    </page>
            
</template>

<script>

import { ref, onMounted, onActivated, onDeactivated } from 'vue';
import * as facemesh from '@tensorflow-models/facemesh';
// import  '@tensorflow/tfjs-core';
import { useQuasar } from 'quasar';
// import { kiss } from 'src/use/fft';
// import { pixelAverage } from 'src/use/usePixelAverage';

export default {
    name: "Oxygensaturation",
    setup() {
        const $q = useQuasar();

        let heartrate = ref(0);
        let _heartrate = 0 ;
        let respiration = ref(0);
        let OxygenSaturation = ref(0);


        let video = ref(null);
        let curFaces;
        let maxHistLen = 64;

        let facecanvas = ref(null);
        let canvas;
        let ctx;
        let fft;

        let fmesh;
        let videoWidth;
        let videoHeight;

        let bloodHist = Array(maxHistLen).fill(0);
        let timingHist = Array(maxHistLen).fill(0);
        // 산소포화도
        let oxygenRedHist = Array(maxHistLen).fill(0);
        let oxygenBlueHist = Array(maxHistLen).fill(0);
        let oxygenTimingHist = Array(maxHistLen).fill(0);

        let last = performance.now();

        const average = (array) => array.reduce((a, b) => a + b) / array.length;
        const argMax = (array) => array.map((x, i) => [x, i]).reduce((r, a) => (a[0] > r[0] ? a : r))[1];

        onActivated(() => {
            init();
        })

        onDeactivated(() =>{
            disableCamera();
        })

        // 카메라 끄기 버튼
        function disableCamera() {
            video.value.srcObject.getVideoTracks().forEach(track => {
                track.stop();
            });
        }

        const init = ( async () => {
            fmesh = await facemesh.load({maxFaces:1});
            
            await setupCamera();
            videoWidth = video.value.videoWidth;
            videoHeight = video.value.videoHeight;
            video.value.play()

             // Create canvas and drawing context
            canvas = facecanvas.value;
            canvas.width = videoWidth;
            canvas.height = videoHeight;
            ctx = canvas.getContext('2d');

            // Init the FFT objects
            fft = new window.kiss.FFTR(maxHistLen);

            // start prediction loop
            renderPrediction();
        })

        function screenSize() {
            let _size = $q.screen.width - 20;

            return _size;
        }

        // 카메라 활성화
        const setupCamera =( async () => {
            const stream = await navigator.mediaDevices.getUserMedia({
                'audio': false,
                'video': {
                    facingMode: 'user',
                aspectRatio: 1.333,
                width: {ideal: screenSize()},
                },
            });
            video.value.srcObject = stream;

            return new Promise((resolve) => {
                video.value.onloadedmetadata = () => {
                    resolve(video.value);
                };
            });
        })

        // 비디오에서 얼굴 메시를 호출하고 눈과 얼굴 경계 상자를 전역 변수에 출력합니다.
        const renderPrediction = ( async () => {
            const facepred = await fmesh.estimateFaces(canvas);
            ctx.drawImage(video.value, 0, 0, canvas.width,  canvas.height);


            if (facepred.length > 0) { // 얼굴 인식이 된 경우 처리
                curFaces = facepred;
                await drawFaces();
            }            
            requestAnimationFrame(renderPrediction);
        })

        // 비디오 스트림에서 직접 캔버스에 현재 눈을 그립니다.
        const drawFaces =( async () => {
            ctx.strokeStyle = "cyan";
            ctx.lineWidth = 2;
            for (let face of curFaces){
                if (face.faceInViewConfidence > .90) {
                    let mesh = face.scaledMesh;

                    // 얼굴 영역의 경계 
                    let boxLeft = mesh[117][0];
                    let boxTop = mesh[117][1];
                    let boxWidth = mesh[346][0] - boxLeft;
                    let boxHeight = mesh[164][1] - boxTop;

                    // 얼굴 영역의 경계 부분 가져오기(화면에서는 코)
                    ctx.beginPath();
                    const boxsize = 4;
                    ctx.rect(boxLeft-boxsize, boxTop-boxsize, boxWidth+boxsize*2, boxHeight+boxsize*2);
                    ctx.stroke();

                    // 경계를 기준으로 이미지 가져오기
                    let bloodRegion = ctx.getImageData(boxLeft, boxTop, boxWidth, boxHeight);

                    // 이미지 영역을 텐서플로로 가져오고 녹색 채널의 평균을 구함
                    let videoDataSum = bloodRegion.data.reduce((a, b) => a + b, 0);
                    videoDataSum -= boxWidth*boxHeight*255; // remove alpha channel
                    let avgIntensity = videoDataSum/(boxWidth*boxHeight*3);

                    // console.log('avgIntensity ',  avgIntensity);

                    // 루프의 FPS 가져오기
                    timingHist.push(1/((performance.now() - last)*.001));
                    oxygenTimingHist.push(1/((performance.now() - last)*.001));

                    last = performance.now();

                    // 배열에서 강도와 FPS를 추가하고 너무 길면 밖으로 이동
                    bloodHist.push(bloodHist[maxHistLen-1]*.8 + .2*avgIntensity);
                    if (bloodHist.length > maxHistLen){
                        bloodHist.shift();
                        timingHist.shift();
                        
                        // console.log('bloodHist ', bloodHist);

                        let fftData = await calcFFT(bloodHist);
                        updateHeartRate(timingHist,fftData);
                        // updateChart2(bloodHist);
                    }

                    // 산소 포화도 
                    let avgRgb = avgColor(bloodRegion);
                    oxygenRedHist.push(avgRgb.r);
                    oxygenBlueHist.push(avgRgb.b);

                    if (oxygenRedHist.length > maxHistLen){
                        oxygenTimingHist.shift();
                        oxygenRedHist.shift();
                        oxygenBlueHist.shift();

                        updateOxygenSaturation(oxygenTimingHist, oxygenRedHist, oxygenBlueHist );
                    }
                }
            }
        })

        const updateOxygenSaturation = (( times, red, blue ) =>{
            
            let stdr = calStd(red);
            let stdb = calStd(blue);

            let avgTime = average(times);
            let avgRed = average(red);
            let avgBlue = average(blue);

            // console.log('stdr', stdr);
            // console.log('stdb', stdb);

            let varRed = Math.sqrt(stdr/avgTime);
            let varBlue = Math.sqrt(stdb/avgTime);

            let R = (varRed / avgRed) / (varBlue / avgBlue);

            // SpO2(n)=110 - 25*R. SpO2(n)=104 - 28*R., spo2 = 100 - 5 * (R)
            OxygenSaturation.value = Math.round(104 - 28*(R));

        })

        const calStd = ((data) => {
                        
            const avg = average(data);
            data = data.map(elem => (elem-avg) ** 2 );
            
            let result = data.reduce((acc, cur) => { return acc = acc + cur }, 0);

            return result;
        })

        // 이미지 r, g, b 값의 평균
        const avgColor = (( imgData ) => {
            let length = imgData.data.length;
            let rgb = { r: 0, g: 0, b: 0 };
            let count = 0;

            for (var i = 0; i < length; i += 4) {
  
                // Sum all values of red colour
                rgb.r += imgData.data[i];  
                // Sum all values of green colour
                rgb.g += imgData.data[i + 1];  
                // Sum all values of blue colour
                rgb.b += imgData.data[i + 2];  
                // Increment the total number of
                // values of rgb colours
                count++;
            }
            rgb.r = Math.floor(rgb.r / count);  
            // Find the average of green
            rgb.g = Math.floor(rgb.g / count);  
            // Find the average of blue
            rgb.b = Math.floor(rgb.b / count);
  
            return rgb;
            // console.log('rgb : ', rgb);
        })

        const calcFFT = ( async ( data ) => {
            const avg = average(data);
            data = data.map(elem => elem-avg);

            // Calculate FFT
            let tmp = fft.forward(data);
            

            return tmp.slice(1);
        })

        const updateHeartRate = (( times, data )=>{
            //  인덱스에서 bin 주파수를 가져오기
            data = data.map(elem => Math.abs(elem));
            let curPollFreq = average(times.slice(Math.round(maxHistLen/2)));
            let binNumber = Array.from(data).map((elem, index) => index+1);
            let binHz = binNumber.map(elem => elem*curPollFreq/maxHistLen);

            // 최대 심박수를 얻기 위해 최대 주파수 bin 찾기
            let maxVal = 0
            let maxHz = 0;
            let maxInd = 0;

            for (let i = 0; i < binHz.length; i++){
                if (binHz[i] > .66 && binHz[i] < 2){ // 제약사항 : heartrates 40-120 bpm
                    if (data[i] > maxVal){
                        maxVal = data[i];
                        maxHz = binHz[i];
                        maxInd = i;
                    }
                }
            }

            _heartrate += (maxHz-_heartrate)*.03;
            heartrate.value = Math.round(_heartrate*60);
            respiration.value = Math.round(_heartrate*60/4);
        })

        return {
            video,
            facecanvas,
            heartrate,
            respiration,
            OxygenSaturation,
        }
    }
}
</script>


