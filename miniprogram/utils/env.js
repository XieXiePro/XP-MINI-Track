import env1 from './env1'
let url = 'https://prod.xxx.com/'
if (env1 == 'TEST') {
  url = 'https://test.xxx.com/'
}

export default url