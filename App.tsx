
import React, { useState, useCallback, useRef } from 'react';
import { 
  Upload, 
  CheckCircle2, 
  Users, 
  MapPin, 
  Settings, 
  Sparkles, 
  Download, 
  RefreshCw,
  Loader2,
  ChevronRight,
  ChevronLeft,
  X
} from 'lucide-react';
import { MODELS, BACKGROUNDS } from './constants';
import { GenerationSettings, GeneratedResult, AspectRatio } from './types';
import { generateFashionImage } from './services/gemini';

const App: React.FC = () => {
  const [step, setStep] = useState(1);
  const [productImage, setProductImage] = useState<string | null>(null);
  const [settings, setSettings] = useState<GenerationSettings>({
    modelId: MODELS[0].id,
    backgroundId: BACKGROUNDS[0].id,
    aspectRatio: '9:16',
    resultCount: 1,
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResults] = useState<GeneratedResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductImage(reader.result as string);
        setStep(2);
      };
      reader.readAsDataURL(file);
    }
  };

  const startGeneration = async () => {
    if (!productImage) return;
    
    setIsGenerating(true);
    setError(null);
    setResults([]);
    setStep(5);

    try {
      const base64Data = productImage.split(',')[1];
      const newResults: GeneratedResult[] = [];
      
      for (let i = 0; i < settings.resultCount; i++) {
        const url = await generateFashionImage(base64Data, settings);
        newResults.push({ url, timestamp: Date.now() });
      }
      
      setResults(newResults);
    } catch (err) {
      console.error(err);
      setError("Có lỗi xảy ra trong quá trình tạo ảnh. Vui lòng thử lại.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = (url: string, index: number) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `hmc-fashion-result-${index + 1}.png`;
    link.click();
  };

  const resetAll = () => {
    setProductImage(null);
    setResults([]);
    setStep(1);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-neutral-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <Sparkles className="text-white w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
            HMC <span className="text-indigo-600">AI FASHION</span>
          </h1>
        </div>
        
        {step > 1 && (
          <div className="hidden md:flex items-center gap-4 text-sm font-medium">
            {[1, 2, 3, 4, 5].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  step === s ? 'bg-indigo-600 text-white' : 
                  step > s ? 'bg-green-100 text-green-700' : 'bg-neutral-100 text-neutral-400'
                }`}>
                  {step > s ? <CheckCircle2 className="w-4 h-4" /> : s}
                </span>
                <span className={step === s ? 'text-neutral-900' : 'text-neutral-400'}>
                  {s === 1 ? 'Sản phẩm' : s === 2 ? 'Nhân vật' : s === 3 ? 'Bối cảnh' : s === 4 ? 'Cài đặt' : 'Kết quả'}
                </span>
                {s < 5 && <ChevronRight className="w-4 h-4 text-neutral-300" />}
              </div>
            ))}
          </div>
        )}

        <button 
          onClick={resetAll}
          className="p-2 hover:bg-neutral-100 rounded-full transition-colors text-neutral-500"
          title="Bắt đầu lại"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Error State */}
        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700">
            <X className="w-5 h-5" />
            <p>{error}</p>
          </div>
        )}

        {/* STEP 1: UPLOAD PRODUCT */}
        {step === 1 && (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-extrabold mb-4">Tải ảnh sản phẩm của bạn</h2>
              <p className="text-neutral-500 text-lg">Hệ thống AI sẽ nhận diện và đưa sản phẩm lên người mẫu thực tế</p>
            </div>
            
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="group cursor-pointer w-full max-w-2xl aspect-video border-2 border-dashed border-neutral-300 rounded-3xl bg-white hover:border-indigo-500 hover:bg-indigo-50/30 transition-all flex flex-col items-center justify-center p-12"
            >
              <div className="bg-neutral-100 group-hover:bg-indigo-100 p-6 rounded-2xl mb-6 transition-colors">
                <Upload className="w-12 h-12 text-neutral-400 group-hover:text-indigo-600" />
              </div>
              <p className="text-xl font-semibold mb-2">Click để tải lên hình ảnh</p>
              <p className="text-neutral-400">Hỗ trợ định dạng PNG, JPG (Khuyên dùng ảnh chụp sản phẩm rõ ràng)</p>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleFileUpload}
              />
            </div>
          </div>
        )}

        {/* STEP 2: CHOOSE MODEL */}
        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold mb-2">Chọn nhân vật</h2>
                <p className="text-neutral-500">Chọn người mẫu phù hợp nhất với phong cách sản phẩm của bạn</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="px-6 py-2.5 rounded-xl border border-neutral-200 font-medium hover:bg-neutral-50 transition-colors">Quay lại</button>
                <button onClick={() => setStep(3)} className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">Tiếp theo</button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {MODELS.map((model) => (
                <div 
                  key={model.id}
                  onClick={() => setSettings(prev => ({ ...prev, modelId: model.id }))}
                  className={`relative cursor-pointer group rounded-2xl overflow-hidden border-4 transition-all ${
                    settings.modelId === model.id ? 'border-indigo-600 shadow-xl' : 'border-white'
                  }`}
                >
                  <img src={model.thumbnail} alt={model.label} className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <p className="font-bold text-lg">{model.label}</p>
                    <p className="text-xs text-white/70 line-clamp-1">{model.description}</p>
                  </div>
                  {settings.modelId === model.id && (
                    <div className="absolute top-4 right-4 bg-indigo-600 text-white p-1 rounded-full">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: CHOOSE BACKGROUND */}
        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold mb-2">Chọn bối cảnh</h2>
                <p className="text-neutral-500">Bối cảnh giúp tăng sự thu hút và tính thực tế cho bộ ảnh</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(2)} className="px-6 py-2.5 rounded-xl border border-neutral-200 font-medium hover:bg-neutral-50 transition-colors">Quay lại</button>
                <button onClick={() => setStep(4)} className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">Tiếp theo</button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {BACKGROUNDS.map((bg) => (
                <div 
                  key={bg.id}
                  onClick={() => setSettings(prev => ({ ...prev, backgroundId: bg.id }))}
                  className={`relative cursor-pointer group rounded-xl overflow-hidden border-2 transition-all ${
                    settings.backgroundId === bg.id ? 'border-indigo-600 shadow-lg' : 'border-neutral-200'
                  }`}
                >
                  <img src={bg.thumbnail} alt={bg.label} className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="p-3 bg-white">
                    <p className="font-medium text-sm text-center line-clamp-1">{bg.label}</p>
                  </div>
                  {settings.backgroundId === bg.id && (
                    <div className="absolute top-2 right-2 bg-indigo-600 text-white p-1 rounded-full shadow-md">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 4: SETTINGS */}
        {step === 4 && (
          <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold mb-2">Cấu hình đầu ra</h2>
                <p className="text-neutral-500">Tùy chỉnh kích thước và số lượng ảnh kết quả</p>
              </div>
              <button onClick={() => setStep(3)} className="px-6 py-2.5 rounded-xl border border-neutral-200 font-medium hover:bg-neutral-50 transition-colors">Quay lại</button>
            </div>

            <div className="space-y-8 bg-white p-8 rounded-3xl border border-neutral-200 shadow-sm">
              <div>
                <label className="block text-sm font-bold text-neutral-500 uppercase tracking-wider mb-4">Tỉ lệ khung hình</label>
                <div className="grid grid-cols-2 gap-4">
                  {(['9:16', '16:9'] as AspectRatio[]).map((ratio) => (
                    <button
                      key={ratio}
                      onClick={() => setSettings(prev => ({ ...prev, aspectRatio: ratio }))}
                      className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all ${
                        settings.aspectRatio === ratio 
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-700' 
                          : 'border-neutral-100 hover:border-neutral-200'
                      }`}
                    >
                      <div className={`border-2 border-current rounded-md mb-3 ${ratio === '9:16' ? 'w-8 h-12' : 'w-12 h-8'}`} />
                      <span className="font-bold">{ratio === '9:16' ? 'Dọc (9:16)' : 'Ngang (16:9)'}</span>
                      <span className="text-xs opacity-60 mt-1">{ratio === '9:16' ? 'Phù hợp Facebook/TikTok' : 'Phù hợp Website/Landing'}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-neutral-500 uppercase tracking-wider mb-4">Số lượng ảnh kết quả</label>
                <div className="flex gap-4">
                  {[1, 2].map((num) => (
                    <button
                      key={num}
                      onClick={() => setSettings(prev => ({ ...prev, resultCount: num }))}
                      className={`flex-1 py-4 px-6 rounded-2xl border-2 font-bold transition-all ${
                        settings.resultCount === num 
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-700' 
                          : 'border-neutral-100 hover:border-neutral-200'
                      }`}
                    >
                      {num} Ảnh
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-neutral-100">
                <button 
                  onClick={startGeneration}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xl font-bold py-5 rounded-2xl shadow-xl shadow-indigo-200 flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Sparkles className="w-6 h-6" />
                  BẮT ĐẦU TẠO ẢNH
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: RESULTS */}
        {step === 5 && (
          <div className="animate-in fade-in duration-700">
            {isGenerating ? (
              <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                <div className="relative mb-10">
                  <div className="w-24 h-24 border-4 border-indigo-100 rounded-full animate-pulse" />
                  <Loader2 className="w-12 h-12 text-indigo-600 animate-spin absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
                <h2 className="text-3xl font-extrabold mb-4">AI Đang Thiết Kế Bộ Ảnh Cho Bạn</h2>
                <p className="text-neutral-500 text-lg max-w-md mx-auto">
                  Chúng tôi đang xử lý chất liệu vải, ánh sáng và bối cảnh để tạo ra kết quả tự nhiên nhất.
                </p>
                
                <div className="mt-12 w-full max-w-xs bg-neutral-200 rounded-full h-2 overflow-hidden">
                  <div className="bg-indigo-600 h-full animate-progress" style={{ width: '40%' }} />
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-extrabold mb-2 text-green-600 flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-8 h-8" /> Hoàn Thành Kết Quả!
                  </h2>
                  <p className="text-neutral-500">Bạn có thể tải ảnh xuống để sử dụng cho mục đích thương mại</p>
                </div>

                <div className={`grid gap-8 w-full ${results.length === 1 ? 'max-w-2xl' : 'max-w-6xl md:grid-cols-2'}`}>
                  {results.map((res, idx) => (
                    <div key={idx} className="bg-white p-4 rounded-3xl border border-neutral-200 shadow-xl overflow-hidden group">
                      <div className={`relative w-full overflow-hidden rounded-2xl bg-neutral-100 ${settings.aspectRatio === '9:16' ? 'aspect-[9/16]' : 'aspect-video'}`}>
                        <img 
                          src={res.url} 
                          alt={`Generated result ${idx + 1}`} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                        />
                      </div>
                      <div className="mt-6 flex flex-col gap-4">
                        <button 
                          onClick={() => handleDownload(res.url, idx)}
                          className="w-full bg-green-600 hover:bg-green-700 text-white font-black text-2xl py-6 rounded-2xl flex items-center justify-center gap-3 transition-all hover:scale-[1.02] shadow-xl shadow-green-100"
                        >
                          <Download className="w-8 h-8" />
                          TẢI ẢNH XUỐNG
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-16 w-full max-w-lg">
                  <button 
                    onClick={() => setStep(4)}
                    className="w-full bg-white border-4 border-indigo-600 text-indigo-600 font-black text-2xl py-6 rounded-2xl flex items-center justify-center gap-3 transition-all hover:bg-indigo-50 hover:scale-[1.02] shadow-lg"
                  >
                    <RefreshCw className="w-8 h-8" />
                    LÀM THÊM KẾT QUẢ KHÁC
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer Navigation (Mobile Only) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 px-6 py-4 flex items-center justify-around z-50">
         <div className={`p-2 rounded-xl ${step === 1 ? 'text-indigo-600 bg-indigo-50' : 'text-neutral-400'}`}>
            <Upload className="w-6 h-6" />
         </div>
         <div className={`p-2 rounded-xl ${step === 2 ? 'text-indigo-600 bg-indigo-50' : 'text-neutral-400'}`}>
            <Users className="w-6 h-6" />
         </div>
         <div className={`p-2 rounded-xl ${step === 3 ? 'text-indigo-600 bg-indigo-50' : 'text-neutral-400'}`}>
            <MapPin className="w-6 h-6" />
         </div>
         <div className={`p-2 rounded-xl ${step === 4 ? 'text-indigo-600 bg-indigo-50' : 'text-neutral-400'}`}>
            <Settings className="w-6 h-6" />
         </div>
      </div>
      
      <style>{`
        @keyframes progress {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 95%; }
        }
        .animate-progress {
          animation: progress 15s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default App;
