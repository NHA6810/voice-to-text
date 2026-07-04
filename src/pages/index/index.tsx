import { View, Text } from '@tarojs/components'
import { Input } from '@/components/ui/input'
import { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { Network } from '@/network'
import './index.css'

const IndexPage = () => {
  const [recognizedText, setRecognizedText] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [recorderManager, setRecorderManager] = useState<Taro.RecorderManager | null>(null)
  const [textInput, setTextInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const isMiniApp = Taro.getEnv() === Taro.ENV_TYPE.WEAPP || Taro.getEnv() === Taro.ENV_TYPE.TT

  useEffect(() => {
    if (isMiniApp) {
      const manager = Taro.getRecorderManager()

      manager.onStart(() => {
        console.log('录音开始')
        setIsRecording(true)
      })

      manager.onStop(async (res) => {
        console.log('录音结束', res.tempFilePath)
        setIsRecording(false)

        try {
          setIsLoading(true)
          const fileSystemManager = Taro.getFileSystemManager()
          const arrayBuffer = fileSystemManager.readFileSync(res.tempFilePath) as ArrayBuffer
          const base64 = Taro.arrayBufferToBase64(arrayBuffer)

          const result = await Network.request({
            url: '/api/asr/recognize',
            method: 'POST',
            data: { audioData: base64 }
          })
          console.log('ASR结果:', result.data)

          if (result.data?.data?.text) {
            setRecognizedText(result.data.data.text)
          }
        } catch (err) {
          console.error('语音识别失败', err)
          Taro.showToast({ title: '识别失败，请重试', icon: 'none' })
        } finally {
          setIsLoading(false)
        }
      })

      manager.onError((err) => {
        console.error('录音错误', err)
        setIsRecording(false)
        Taro.showToast({ title: '录音失败', icon: 'none' })
      })

      setRecorderManager(manager)
    }
  }, [isMiniApp])

  const handleTouchStart = () => {
    if (!isMiniApp) {
      Taro.showToast({ title: '录音仅支持小程序', icon: 'none' })
      return
    }
    recorderManager?.start({
      format: 'wav',
      sampleRate: 16000,
      numberOfChannels: 1,
      frameSize: 50
    })
  }

  const handleTouchEnd = () => {
    if (!isMiniApp) return
    recorderManager?.stop()
  }

  const handleTextSubmit = () => {
    if (!textInput.trim()) return
    setRecognizedText(textInput.trim())
    setTextInput('')
  }

  return (
    <View className="flex flex-col h-screen bg-white">
      {/* 主区域：显示识别结果或初始引导 */}
      <View className="flex-1 flex items-center justify-center px-4">
        {recognizedText ? (
          <Text className="block text-6xl font-bold text-gray-900 text-center leading-relaxed break-all">
            {recognizedText}
          </Text>
        ) : (
          <View className="flex flex-col items-center gap-2">
            <Text className="block text-3xl font-bold text-gray-900">
              语音转文字
            </Text>
            <Text className="block text-sm text-gray-400">
              按住下方按钮开始说话
            </Text>
          </View>
        )}
      </View>

      {/* 底部区域：录音按钮 / H5 降级输入 */}
      {isMiniApp ? (
        <View className="pb-16 pt-4 flex items-center justify-center">
          {isLoading ? (
            <View className="w-24 h-24 rounded-full bg-blue-50 flex items-center justify-center">
              <Text className="block text-sm text-blue-500">识别中...</Text>
            </View>
          ) : (
            <View
              className={`w-24 h-24 rounded-full flex items-center justify-center select-none active:scale-90 transition-transform ${
                isRecording ? 'bg-blue-100' : 'bg-gray-100'
              }`}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <Text
                className={`block text-base font-bold ${
                  isRecording ? 'text-blue-600' : 'text-gray-600'
                }`}
              >
                {isRecording ? '录音中...' : '按住说话'}
              </Text>
            </View>
          )}
        </View>
      ) : (
        <View className="px-6 pb-16">
          <Input
            className="mb-3"
            placeholder="输入你想转成文字的内容..."
            value={textInput}
            onInput={(e) => setTextInput(e.detail.value)}
            confirmType="send"
            onConfirm={handleTextSubmit}
          />
          <View
            className="bg-blue-500 rounded-2xl py-3 flex items-center justify-center"
            onClick={handleTextSubmit}
          >
            <Text className="block text-white font-medium">提交</Text>
          </View>
        </View>
      )}
    </View>
  )
}

export default IndexPage