import { View, Text } from '@tarojs/components'
import { Input } from '@/components/ui/input'
import { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { Network } from '@/network'
import { RotateCw, Trash2, ZoomIn, ZoomOut } from 'lucide-react-taro'
import './index.css'

const IndexPage = () => {
  const [recognizedText, setRecognizedText] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [recorderManager, setRecorderManager] = useState<Taro.RecorderManager | null>(null)
  const [textInput, setTextInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isLandscape, setIsLandscape] = useState(false)
  const [serverOk, setServerOk] = useState(true)
  const [fontSizeLevel, setFontSizeLevel] = useState(3)

  const FONT_SIZE_CLASSES = ['text-3xl', 'text-4xl', 'text-5xl', 'text-6xl', 'text-7xl']
  const getFontSizeClass = () => FONT_SIZE_CLASSES[fontSizeLevel - 1] || 'text-5xl'

  const handleIncreaseFont = () => {
    setFontSizeLevel((prev) => Math.min(prev + 1, 5))
  }

  const handleDecreaseFont = () => {
    setFontSizeLevel((prev) => Math.max(prev - 1, 1))
  }

  const isMiniApp = Taro.getEnv() === Taro.ENV_TYPE.WEAPP || Taro.getEnv() === Taro.ENV_TYPE.TT

  // 启动时检查服务器连通性
  useEffect(() => {
    const checkServer = async () => {
      try {
        const res = await Network.request({ url: '/api/health', method: 'GET' })
        console.log('[健康检查] 服务器连接正常:', res.data)
        setServerOk(true)
      } catch (err) {
        console.error('[健康检查] 服务器连接失败:', err)
        setServerOk(false)
      }
    }
    checkServer()
  }, [])

  useEffect(() => {
    if (isMiniApp) {
      const manager = Taro.getRecorderManager()

      manager.onStart(() => {
        console.log('录音开始')
        setIsRecording(true)
      })

      manager.onStop(async (res) => {
        console.log('[录音结束] tempFilePath:', res.tempFilePath)
        setIsRecording(false)

        try {
          setIsLoading(true)
          const fileSystemManager = Taro.getFileSystemManager()
          const arrayBuffer = fileSystemManager.readFileSync(res.tempFilePath) as ArrayBuffer
          console.log('[音频] 原始大小:', arrayBuffer.byteLength, 'bytes')

          if (arrayBuffer.byteLength < 100) {
            throw new Error('录音文件过小，可能未录制到有效声音')
          }

          const base64 = Taro.arrayBufferToBase64(arrayBuffer)
          console.log('[音频] base64长度:', base64.length)

          const result = await Network.request({
            url: '/api/asr/recognize',
            method: 'POST',
            data: { audioData: base64 }
          })

          console.log('[ASR响应] 完整响应:', JSON.stringify(result.data))

          const respBody = result.data

          // 后端返回业务错误（如 ASR 服务异常）
          if (respBody?.statusCode && respBody?.statusCode !== 200) {
            console.error('[ASR] 后端返回错误:', respBody)
            const errMsg = respBody?.message || '识别结果异常'
            Taro.showToast({ title: errMsg, icon: 'none', duration: 3000 })
            return
          }

          // 正常业务响应
          if (respBody?.code === 200 && respBody?.data?.text !== undefined) {
            const text = respBody.data.text
            if (text) {
              setRecognizedText(text)
            } else {
              setRecognizedText('（未识别到语音内容，请靠近麦克风重试）')
            }
          } else {
            console.error('[ASR] 响应格式异常:', respBody)
            Taro.showToast({
              title: respBody?.msg || '识别结果异常',
              icon: 'none'
            })
          }
        } catch (err: any) {
          console.error('[ASR] 识别失败:', err.message || err)
          // 网络错误时提示更明确
          const msg = err.message || ''
          if (msg.includes('timeout') || msg.includes('fail') || msg.includes('network')) {
            setServerOk(false)
            Taro.showToast({ title: '服务连接失败，请返回重新扫码', icon: 'none', duration: 3000 })
          } else if (msg.includes('过小')) {
            Taro.showToast({ title: msg, icon: 'none' })
          } else {
            Taro.showToast({ title: '网络请求失败，请重试', icon: 'none' })
          }
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
    const newIsLandscape = !isLandscape
    const env = Taro.getEnv()

    // 小程序端：调用原生屏幕旋转 API
    try {
      if (env === Taro.ENV_TYPE.WEAPP) {
        const wxApi = (globalThis as any).wx
        if (wxApi?.setScreenOrientation) {
          wxApi.setScreenOrientation({ orientation: newIsLandscape ? 'landscape' : 'portrait' })
        }
      } else if (env === Taro.ENV_TYPE.TT) {
        const ttApi = (globalThis as any).tt
        if (ttApi?.setScreenOrientation) {
          ttApi.setScreenOrientation({ orientation: newIsLandscape ? 'landscape' : 'portrait' })
        }
      }
    } catch (err) {
      console.log('屏幕旋转 API 不可用', err)
    }

    setIsLandscape(newIsLandscape)
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
          {/* 字体缩小 */}
          <View onClick={handleDecreaseFont} className="p-2 rounded-full active:bg-gray-100">
            <ZoomOut size={20} color={fontSizeLevel > 1 ? '#666' : '#ccc'} />
          </View>
          {/* 字体放大 */}
          <View onClick={handleIncreaseFont} className="p-2 rounded-full active:bg-gray-100">
            <ZoomIn size={20} color={fontSizeLevel < 5 ? '#666' : '#ccc'} />
          </View>
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
        {!serverOk ? (
          <View className="flex-1 flex items-center justify-center">
            <View className="flex flex-col items-center gap-2">
              <Text className="block text-2xl font-bold text-red-500 text-center">
                服务连接失败
              </Text>
              <Text className="block text-sm text-gray-500 text-center">
                预览服务已过期，请重新扫码打开小程序
              </Text>
            </View>
          </View>
        ) : recognizedText ? (
          <View className="flex-1 flex items-center justify-center">
            <Text
              className={`block font-bold text-gray-900 leading-relaxed break-all ${
                isLandscape ? `${getFontSizeClass()} text-center` : `${getFontSizeClass()} text-left`
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