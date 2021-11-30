<template>
  <page>
    <page-header>
      <template #buttons-left>
        <page-header-btn-back
          label="질문"
        />
      </template>
      <template #title>문의 답변</template>
    </page-header>
    <page-body>
      <div class="q-pa-lg">
        <div class="text-h5 q-mb-md">여행 지도?</div>
        <p>
          여행 지도는 내가 찍은 사진을 퍼즐 처럼 지도위에 올리는 도구입니다.
        </p>
        <!-- <p v-for="i in 20" :key="i">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate aperiam suscipit blanditiis iusto earum, velit adipisci sequi ex ipsum, aut non. Doloremque iusto eius at quibusdam blanditiis ex vero eaque?</p> -->
      </div>
    </page-body>
  </page>
</template>

<script>
export default {
  name: 'Answer'
}
</script>
