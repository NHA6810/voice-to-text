import { View, Text } from '@tarojs/components'
import { Input } from '@/components/ui/input'
import { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { Network } from '@/network'
import { RotateCw, Trash2 } from 'lucide-react-taro'
import './index.css'

const IndexPage = () => {
  const [recognizedText, setRecognizedText] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [recorderManager, setRecorderManager] = useState<Taro.RecorderManager | null>(null)
  const [textInput, setTextInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isLandscape, setIsLandscape] = useState(false)

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

  const handleToggleRecord = () => {
    if (!isMiniApp) {
      Taro.showToast({ title: '录音仅支持小程序', icon: 'none' })
      return
    }

    if (isRecording) {
      recorderManager?.stop()
    } else {
      recorderManager?.start({
        format: 'wav',
        sampleRate: 16000,
        numberOfChannels: 1,
        frameSize: 50
      })
    }
  }

  const handleClear = () => {
    setRecognizedText('')
  }

  const handleToggleOrientation = () => {
    setIsLandscape((prev) => !prev)
  }

  const handleTextSubmit = () => {
    if (!textInput.trim()) return
    setRecognizedText(textInput.trim())
    setTextInput('')
  }

  return (
    <View className="flex flex-col h-screen bg-white">
      {/* 工具栏 */}
      <View className="flex flex-row items-center justify-between px-4 py-3 border-b border-gray-100 z-10">
        <Text className="block text-sm text-gray-500">
          {recognizedText ? '点击下方按钮开始录音' : '语音转文字'}
        </Text>
        <View className="flex flex-row items-center gap-3">
          {/* 横竖屏切换 */}
          <View onClick={handleToggleOrientation} className="p-2 rounded-full active:bg-gray-100">
            <RotateCw
              size={20}
              color="#666"
              className={isLandscape ? 'rotate-90' : ''}
            />
          </View>
          {/* 清屏按钮 */}
          {recognizedText && (
            <View onClick={handleClear} className="p-2 rounded-full active:bg-gray-100">
              <Trash2 size={20} color="#666" />
            </View>
          )}
        </View>
      </View>

      {/* 主区域：显示识别结果或初始引导 */}
      <View className={`flex-1 flex flex-col ${isLandscape ? 'px-8' : 'px-4'} pt-6`}>
        {recognizedText ? (
          <View className="flex-1 flex items-center justify-center">
            <Text
              className={`block font-bold text-gray-900 leading-relaxed break-all ${
                isLandscape ? 'text-6xl text-center' : 'text-5xl text-left'
              }`}
            >
              {recognizedText}
            </Text>
          </View>
        ) : (
          <View className="flex-1 flex items-center justify-center">
            <View className="flex flex-col items-center gap-2">
              <Text className="block text-3xl font-bold text-gray-900">
                语音转文字
              </Text>
              <Text className="block text-sm text-gray-400">
                点击下方按钮开始录音
              </Text>
            </View>
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
                isRecording ? 'bg-red-100' : 'bg-gray-100'
              }`}
              onClick={handleToggleRecord}
            >
              <Text
                className={`block text-base font-bold ${
                  isRecording ? 'text-red-500' : 'text-gray-600'
                }`}
              >
                {isRecording ? '停止' : '开始录音'}
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