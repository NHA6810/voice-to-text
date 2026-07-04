export default typeof definePageConfig === 'function'
  ? definePageConfig({ navigationBarTitleText: '语音转文字' })
  : { navigationBarTitleText: '语音转文字' }
