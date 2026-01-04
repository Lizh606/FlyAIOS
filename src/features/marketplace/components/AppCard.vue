
<script setup lang="ts">
import { computed } from 'vue';
import { ShieldCheck, Download, ChevronRight } from 'lucide-vue-next';
import type { AppPack } from '../types';

const props = defineProps<{
  app: AppPack;
}>();

const emit = defineEmits(['click']);

const isInstalled = computed(() => !!props.app.installedVersion);
const uniqueModes = computed(() => Array.from(new Set(props.app.capabilities.map(c => c.mode))));

const modeLabels: Record<string, string> = {
  edge_realtime: 'EDGE',
  near_real_time_cloud: 'CLOUD',
  offline_batch: 'BATCH'
};
</script>

<template>
  <div 
    @click="emit('click')"
    class="group bg-[rgba(var(--fa-bg-card),1)] border border-[rgba(var(--fa-border),1)] rounded-[12px] p-4 flex flex-col h-[280px] transition-all hover:border-[rgba(var(--fa-brand),0.4)] hover:shadow-[0_1px_3px_rgba(0,0,0,0.06)] cursor-pointer"
  >
    <!-- Header -->
    <div class="flex items-start gap-3 mb-4 shrink-0">
      <div class="w-12 h-12 rounded-xl bg-[rgba(var(--fa-bg-page),1)] border border-[rgba(var(--fa-border),1)] p-2 flex items-center justify-center">
        <img :src="app.icon" class="w-full h-full object-contain" />
      </div>
      <div class="min-w-0 flex-1">
        <div class="flex items-center gap-1.5 mb-0.5">
          <h3 class="text-[14px] font-semibold text-[rgba(var(--fa-text-primary),1)] truncate m-0 group-hover:text-[rgba(var(--fa-brand),1)] transition-colors">
            {{ app.name }}
          </h3>
          <ShieldCheck size="14" class="text-[rgba(var(--fa-success),1)] shrink-0" />
        </div>
        <p class="text-[12px] text-[rgba(var(--fa-text-tertiary),1)] m-0 truncate">{{ app.publisher }}</p>
      </div>
    </div>

    <!-- Body -->
    <div class="flex-1 space-y-3 min-h-0">
      <p class="text-[12px] text-[rgba(var(--fa-text-secondary),1)] line-clamp-2 leading-relaxed m-0">
        {{ app.description }}
      </p>
      
      <div class="space-y-2">
        <div class="flex flex-col gap-1">
          <span class="text-[10px] font-bold text-[rgba(var(--fa-text-tertiary),1)] uppercase tracking-widest">模式</span>
          <div class="flex flex-wrap gap-1.5">
            <span v-for="mode in uniqueModes" :key="mode" class="px-1.5 py-0.5 bg-[rgba(var(--fa-bg-page),1)] border border-[rgba(var(--fa-border),1)] rounded-[4px] text-[10px] font-mono font-bold text-[rgba(var(--fa-text-secondary),1)]">
              {{ modeLabels[mode] }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="mt-auto pt-3 border-t border-[rgba(var(--fa-divider),1)] flex items-center justify-between">
      <span class="text-[11px] font-mono font-bold text-[rgba(var(--fa-text-tertiary),1)]">
        {{ isInstalled ? app.installedVersion : app.version }}
      </span>
      
      <button v-if="!isInstalled" class="h-7 px-3 bg-[rgba(var(--fa-brand),1)] text-white rounded-[6px] text-[11px] font-bold uppercase tracking-widest flex items-center gap-1.5 hover:opacity-90 active:scale-95 transition-all">
        <Download size="12" /> 安装
      </button>
      <button v-else class="text-[11px] font-bold text-[rgba(var(--fa-brand),1)] uppercase flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
        详情 <ChevronRight size="12" />
      </button>
    </div>
  </div>
</template>
