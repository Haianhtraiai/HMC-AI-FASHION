
import { ModelOption, BackgroundOption } from './types';

export const MODELS: ModelOption[] = [
  { 
    id: 'nu_tre', 
    label: 'Nữ Trẻ', 
    description: 'Người mẫu nữ Việt Nam trẻ trung', 
    thumbnail: 'https://picsum.photos/seed/female_young/400/500', 
    prompt: 'a young beautiful Vietnamese female fashion model' 
  },
  { 
    id: 'nu_trung_nien', 
    label: 'Nữ Trung Niên', 
    description: 'Người mẫu nữ Việt Nam trung niên', 
    thumbnail: 'https://picsum.photos/seed/female_middle/400/500', 
    prompt: 'a sophisticated middle-aged Vietnamese female fashion model' 
  },
  { 
    id: 'nam_tre', 
    label: 'Nam Trẻ', 
    description: 'Người mẫu nam Việt Nam trẻ trung', 
    thumbnail: 'https://picsum.photos/seed/male_young/400/500', 
    prompt: 'a handsome young Vietnamese male fashion model' 
  },
  { 
    id: 'nam_trung_nien', 
    label: 'Nam Trung Niên', 
    description: 'Người mẫu nam Việt Nam trung niên', 
    thumbnail: 'https://picsum.photos/seed/male_middle/400/500', 
    prompt: 'a mature middle-aged Vietnamese male fashion model' 
  },
  { 
    id: 'be_trai', 
    label: 'Bé Trai', 
    description: 'Người mẫu nhí nam', 
    thumbnail: 'https://picsum.photos/seed/boy/400/500', 
    prompt: 'a cute Vietnamese young boy model' 
  },
  { 
    id: 'be_gai', 
    label: 'Bé Gái', 
    description: 'Người mẫu nhí nữ', 
    thumbnail: 'https://picsum.photos/seed/girl/400/500', 
    prompt: 'a cute Vietnamese young girl model' 
  },
  { 
    id: 'ba_lao', 
    label: 'Bà Lão 60', 
    description: 'Người mẫu nữ cao tuổi', 
    thumbnail: 'https://picsum.photos/seed/elder_woman/400/500', 
    prompt: 'a graceful 60-year-old Vietnamese elderly woman model' 
  },
  { 
    id: 'ong_lao', 
    label: 'Ông Lão 60', 
    description: 'Người mẫu nam cao tuổi', 
    thumbnail: 'https://picsum.photos/seed/elder_man/400/500', 
    prompt: 'a dignified 60-year-old Vietnamese elderly man model' 
  }
];

export const BACKGROUNDS: BackgroundOption[] = [
  { id: 'street', label: 'Ngoài Phố Việt Nam', thumbnail: 'https://picsum.photos/seed/vn_street/500/300', prompt: 'busy vibrant Vietnamese street scene with motorbikes and urban architecture' },
  { id: 'studio', label: 'Studio Chuyên Nghiệp', thumbnail: 'https://picsum.photos/seed/studio/500/300', prompt: 'minimalist professional fashion photography studio with soft lighting' },
  { id: 'live_nam', label: 'Phòng Live Stream Nam', thumbnail: 'https://picsum.photos/seed/live_male/500/300', prompt: 'modern brightly lit fashion livestream room for men with professional equipment' },
  { id: 'live_nu', label: 'Phòng Live Stream Nữ', thumbnail: 'https://picsum.photos/seed/live_female/500/300', prompt: 'aesthetic fashion livestream room for women with ring lights and decor' },
  { id: 'store_nam', label: 'Cửa Hàng Thời Trang Nam', thumbnail: 'https://picsum.photos/seed/store_male/500/300', prompt: 'high-end luxury men clothing store interior' },
  { id: 'store_nu', label: 'Cửa Hàng Thời Trang Nữ', thumbnail: 'https://picsum.photos/seed/store_female/500/300', prompt: 'elegant boutique women fashion store interior' },
  { id: 'living', label: 'Phòng Khách', thumbnail: 'https://picsum.photos/seed/living_room/500/300', prompt: 'stylish modern Vietnamese apartment living room' },
  { id: 'kitchen', label: 'Nhà Bếp', thumbnail: 'https://picsum.photos/seed/kitchen/500/300', prompt: 'contemporary luxury kitchen interior' },
  { id: 'bedroom', label: 'Phòng Ngủ', thumbnail: 'https://picsum.photos/seed/bedroom/500/300', prompt: 'cozy elegant modern bedroom interior with soft bedding and warm natural lighting' },
  { id: 'mall', label: 'Trung Tâm Mua Sắm', thumbnail: 'https://picsum.photos/seed/mall/500/300', prompt: 'luxurious shopping mall with glass and light' },
  { id: 'cafe', label: 'Quán Cà Phê', thumbnail: 'https://picsum.photos/seed/cafe/500/300', prompt: 'trendy aesthetic Vietnamese coffee shop with wooden decor' },
  { id: 'school', label: 'Trường Học', thumbnail: 'https://picsum.photos/seed/school/500/300', prompt: 'modern university campus background' },
  { id: 'office', label: 'Văn Phòng', thumbnail: 'https://picsum.photos/seed/office/500/300', prompt: 'professional sleek modern office background' },
  { id: 'lotus', label: 'Đầm Sen', thumbnail: 'https://picsum.photos/seed/lotus/500/300', prompt: 'traditional Vietnamese lotus pond with pink flowers and green leaves' },
  { id: 'field', label: 'Cánh Đồng', thumbnail: 'https://picsum.photos/seed/field/500/300', prompt: 'serene Vietnamese rice field at sunset' },
  { id: 'market', label: 'Ngoài Chợ', thumbnail: 'https://picsum.photos/seed/market/500/300', prompt: 'bustling traditional Vietnamese local market' }
];
