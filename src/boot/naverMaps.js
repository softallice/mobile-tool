import { boot } from 'quasar/wrappers'
import naver from "vue3-naver-maps";

const clientId = 'hgedwbg9b8'

export default boot(async ({ app }) => {
  app.use(naver, { clientId: clientId })
})