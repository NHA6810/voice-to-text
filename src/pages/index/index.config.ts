export default typeof definePageConfig === 'function'
  ? definePageConfig({ navigationBarTitleText: '语音转文字', pageOrientation: 'auto' } as any)
  : { navigationBarTitleText: '语音转文字', pageOrientation: 'auto' }
