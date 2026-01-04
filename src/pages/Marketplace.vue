
<script setup lang="ts">
import { ref, computed } from 'vue';
import { Search, ShoppingBag, Filter } from 'lucide-vue-next';
import AppCard from '../features/marketplace/components/AppCard.vue';
import type { AppPack } from '../features/marketplace/types';

const searchText = ref('');
const activeTab = ref('All');
const industries = ['All', 'Powerline', 'Solar', 'Security'];

// Mock Data 基于电力巡检文档
const apps = ref<AppPack[]>([
  {
    id: 'p-01',
    name: 'Powerline Inspection Pack',
    publisher: 'FlyAIOS Labs',
    version: 'v1.3.0',
    icon: 'https://p.ipic.vip/vjblew.jpg',
    industry: 'Powerline',
    description: '端到端电力巡检套件，包含缺陷自动检测、云端复核与 AI 报告生成。',
    installedVersion: 'v1.3.0',
    usedWorkflowCount: 3,
    capabilities: [
      { id: 'c1', name: 'Edge Defect Alert', description: '边缘实时识别', mode: 'edge_realtime' },
      { id: 'c2', name: 'Cloud Review', description: '云端复核', mode: 'near_real_time_cloud' }
    ],
    expectedOutputs: ['Alert', 'PDF Report'],
    compatibility: { gpuRequired: true, minOS: 'v2.1.0', nodes: ['Dock-12', 'Dock-17'] }
  },
  {
    id: 'p-02',
    name: 'Solar Thermal Analyzer',
    publisher: 'SunEnergy AI',
    version: 'v2.0.1',
    icon: 'https://picsum.photos/seed/solar/100/100',
    industry: 'Solar',
    description: '光伏电站热成像异常识别，支持热斑自动标定。',
    usedWorkflowCount: 0,
    capabilities: [{ id: 's1', name: 'Thermal Hotspot', description: '热斑检测', mode: 'edge_realtime' }],
    expectedOutputs: ['Thermal Map'],
    compatibility: { gpuRequired: true, minOS: 'v2.0.0', nodes: ['Edge-Box-G2'] }
  }
]);

const filteredApps = computed(() => {
  return apps.value.filter(a => {
    const matchTab = activeTab.value === 'All' || a.industry === activeTab.value;
    const matchSearch = a.name.toLowerCase().includes(searchText.value.toLowerCase());
    return matchTab && matchSearch;
  });
});
</script>

<template>
  <div class="p-6 md:p-8 max-w-[1440px] mx-auto w-full animate-in fade-in duration-500">
    <!-- Page Header (v0.8 3.3) -->
    <div class="mb-8">
      <h1 class="text-[24px] font-semibold text-[rgba(var(--fa-text-primary),1)] mb-2 tracking-tight">
        应用中心
      </h1>
      <p class="text-[14px] text-[rgba(var(--fa-text-secondary),1)] m-0">
        探索并安装行业 AI 能力包，扩展您的工作流自动化。
      </p>
    </div>

    <!-- Toolbar (v0.8 6.2.1) -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 border-b border-[rgba(var(--fa-divider),1)]">
      <div class="flex gap-6 shrink-0 h-11">
        <button 
          v-for="tab in industries" :key="tab"
          @click="activeTab = tab"
          class="relative text-[14px] font-semibold uppercase tracking-wider transition-colors px-1"
          :class="activeTab === tab ? 'text-[rgba(var(--fa-brand),1)]' : 'text-[rgba(var(--fa-text-tertiary),1)] hover:text-[rgba(var(--fa-text-primary),1)]'"
        >
          {{ tab }}
          <div v-if="activeTab === tab" class="absolute bottom-0 inset-x-0 h-[2px] bg-[rgba(var(--fa-brand),1)]" />
        </button>
      </div>
      
      <div class="flex items-center gap-3 pb-3">
        <div class="relative w-full md:w-72">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 text-[rgba(var(--fa-text-tertiary),1)]" size="14" />
          <input 
            v-model="searchText"
            type="text" 
            placeholder="搜索应用..." 
            class="w-full bg-[rgba(var(--fa-bg-card),1)] border border-[rgba(var(--fa-border),1)] rounded-[8px] py-1.5 pl-9 pr-4 text-[14px] outline-none focus:ring-2 focus:ring-[rgba(var(--fa-brand),0.2)] focus:border-[rgba(var(--fa-brand),1)] transition-all"
          />
        </div>
        <button class="h-9 px-3 border border-[rgba(var(--fa-border),1)] rounded-[8px] text-[rgba(var(--fa-text-secondary),1)] hover:bg-[rgba(var(--fa-hover),0.05)] transition-all">
          <Filter size="14" />
        </button>
      </div>
    </div>

    <!-- Content Grid (v0.8 6.5.2) -->
    <div v-if="filteredApps.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <AppCard 
        v-for="app in filteredApps" 
        :key="app.id" 
        :app="app" 
        @click="console.log('Open detail for', app.id)"
      />
    </div>
    
    <div v-else class="py-24 flex flex-col items-center justify-center text-center">
      <div class="w-16 h-16 bg-[rgba(var(--fa-bg-page),1)] rounded-full flex items-center justify-center text-[rgba(var(--fa-text-disabled),1)] mb-4">
        <ShoppingBag size={32} stroke-width="1.5" />
      </div>
      <h3 class="text-[16px] font-semibold text-[rgba(var(--fa-text-primary),1)] mb-1">未发现匹配应用</h3>
      <p class="text-[14px] text-[rgba(var(--fa-text-secondary),1)]">尝试调整您的行业分类或搜索词。</p>
    </div>
  </div>
</template>
