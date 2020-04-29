import {
  ENV
} from './manage'
const api = {
  /*
   *get / getCourses 获取可以浏览的课程
   *（参数 ）
   */
  get_courses: 'xx/getCourses',
}
for (var i in api) {
  api[i] = ENV + api[i]
}
export default api