<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';
import { message } from 'ant-design-vue';
import type { FormInstance } from 'ant-design-vue';
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined
} from '@ant-design/icons-vue';

interface LinkData {
  key: string;
  logo: string;
  link: string;
  title: string;
  keywords: string[];
}

interface Engine {
  value: string;
  label: string;
  build: (query: string) => string;
}

interface FormState {
  title: string;
  link: string;
  logo: string;
  keywords: string[];
}

const LINK_STORAGE_KEY = '__search_links_v2__';
const ENGINE_STORAGE_KEY = '__search_engine__';
/** 默认搜索引擎：没有命中快捷链接时用它兜底 */
const ENGINES: Engine[] = [
  {
    value: 'google',
    label: 'Google',
    build: query =>
      `https://www.google.com/search?q=${encodeURIComponent(query)}`
  },
  {
    value: 'bing',
    label: 'Bing',
    build: query => `https://www.bing.com/search?q=${encodeURIComponent(query)}`
  },
  {
    value: 'duckduckgo',
    label: 'DuckDuckGo',
    build: query => `https://duckduckgo.com/?q=${encodeURIComponent(query)}`
  },
  {
    value: 'baidu',
    label: '百度',
    build: query => `https://www.baidu.com/s?wd=${encodeURIComponent(query)}`
  }
];

/**
 * 内置快捷链接种子数据
 * 每一项：[名称, 链接, 关键字]
 * 关键字用于「输入关键字 → 直接跳转对应链接」，一般包含名称本身 + 常用别名
 */
type LinkSeed = [title: string, link: string, keywords: string[]];

const LINK_SEEDS: LinkSeed[] = [
  [
    'vwangyi',
    'https://github.com/vwangyi',
    ['vwangyi', 'github', '我的github']
  ],
  ['chatgpt', 'https://github.com/vwangyi', ['chatgpt']],
  [
    'DeepSeek',
    'https://chat.deepseek.com/a/chat/s/e45bfff4-f22f-45af-8654-701964fbbf12',
    ['deepseek', '深度求索', 'ai']
  ],
  ['bilibili', 'https://www.bilibili.com/', ['bilibili', 'b站', '哔哩哔哩']],
  ['百度', 'https://www.baidu.com/', ['baidu', '百度', '搜索']],
  [
    'NestJS',
    'https://docs.nestjs.cn/introduction/',
    ['nestjs', 'nest', '后端框架']
  ],
  [
    'Vue',
    'https://cn.vuejs.org/guide/introduction.html',
    ['vue', 'vuejs', '前端框架']
  ],
  [
    'React',
    'https://zh-hans.react.dev/learn',
    ['react', 'reactjs', '前端框架']
  ],
  ['TypeORM', 'https://www.typeorm.net/', ['typeorm', 'orm', '数据库']],
  ['腾讯视频', 'https://v.qq.com/', ['腾讯视频', 'v.qq', '视频']],
  [
    'Apple',
    'https://www.apple.com.cn/shop/buy-iphone',
    ['apple', '苹果', 'iphone']
  ],
  ['抖音', 'https://www.douyin.com/', ['douyin', '抖音', '短视频']],
  [
    '☁️',
    'https://cloud.tencent.com/',
    ['腾讯云', 'cloud', 'cloud.tencent.com', '☁️']
  ],
  ['Rollup', 'https://cn.rollupjs.org/', ['rollup', '打包工具']],
  ['Webpack', 'https://webpack.docschina.org/', ['webpack', '打包工具']],
  ['Vite', 'https://cn.vite.dev/', ['vite', '构建工具', '打包']],
  ['LeetCode', 'https://leetcode.cn/', ['leetcode', '力扣', '算法']],
  [
    'MDN',
    'https://developer.mozilla.org/zh-CN/',
    ['mdn', 'mozilla', 'web文档']
  ],
  [
    'gitee资料',
    'https://duyiedu.yuque.com/fmi7t1/nwhh7g/xa4c761zgp6pa9ac',
    ['gitee资料', '语雀', '资料']
  ],
  ['掘金', 'https://juejin.cn/', ['掘金', 'juejin', '前端']],
  ['opencv', 'https://opencv.org/', ['opencv', '计算机视觉', 'cv']],
  [
    'opencv.js',
    'https://docs.opencv.org/4.13.0/d5/d10/tutorial_js_root.html',
    ['opencv.js', 'opencv', 'cv', 'javascript']
  ],
  ['npmjs', 'https://www.npmjs.com/', ['npmjs', 'npm', '包管理']],
  ['QQ邮箱', 'https://wx.mail.qq.com/', ['qq邮箱', '邮箱', 'mail']],
  [
    '粤TV专区需求文档',
    'https://docs.qq.com/doc/DVGNNR0Vkd3hUUEtj?_t=1791787087360&nlc=1',
    ['粤tv', '需求文档', '腾讯文档']
  ],
  [
    'Ant Design Vue',
    'https://antdv.com/components/overview-cn',
    ['antdv', 'ant design vue', '组件库']
  ],
  ['iconfont', 'https://www.iconfont.cn/home/index', ['iconfont', '图标']],
  ['爱奇艺', 'https://www.iqiyi.com/', ['爱奇艺', 'iqiyi', '视频']],
  ['优酷', 'https://www.youku.com/ku/webhome', ['优酷', 'youku', '视频']],
  ['微博', 'https://weibo.com/', ['微博', 'weibo', '社交']],
  [
    'markdown',
    'https://markdown.cn/docs/tutorial-basics/basic-syntax',
    ['markdown', 'md', '语法']
  ],
  [
    'TypeScript',
    'https://www.typescriptlang.org/zh/play/?#code/PTAEiJrQ5+MU3NAYlUAqBPADgUwMoGMBOBLFAF1EBR7QYb9AudUBh-gKBFEE34wejNAAOUCo5QTb9ADeUAXjQbPlAaP6BMxSqAwJUDVcoBiVQGbagAzlEqTLgLFAIW6BFf0CbXoCAGGnTCAKg0D3yoFO5E4CDNQNBygSDlAs56BO00Dw+oH95QBSugYO1AWP-79oUAFpQdkBYOUAseUAWD0B5dUBvuUBVeUAcOUB-SNU5BXRsfCJQVUAGdXtdegCgtkBleUAYrLSlTOJAW+jAVZtANz1AODlAaojALrkJXPzfIvZXQDi5QGlbQFXo4MAYFUqMlVABQEXowHxzQHylQF+A1UBMm0BG710aLAB7ADsAZ2IAQ32AUQAPE4BbFAAbNAA1E-wTgCNH0ABeUAAiAASaHu912oAA6rscPcACZ-HYHQ67R4AOlBAHMABRnK63B7PV54D6PACUenopkAnQ6Ab8VAFBy9lUoEAOASALk9ANHygFwCUCANCNmYAG00A36kcqgmQBhcoBjyMAL2aALE1AM6K-RqgAAo1SAQ-lAPYG2nh9G5gFAAwAESoATNIYgGy5QAXNoApxIagBQ5QAA+oBpzTcVEALqZscgUVSANDlADKugF+EwB6Ov0uLo-EA',
    ['typescript', 'ts', '在线playground', '类型']
  ],
  [
    'favicon.io',
    'https://favicon.io/favicon-generator/',
    ['favicon.io', 'favicon', '图标生成']
  ],
  ['VitePress', 'https://vitepress.dev/zh/', ['vitepress', '文档站']],
  [
    'TypeScript',
    'https://www.typescriptlang.org/zh/play/',
    ['typescript', 'ts', '在线playground', '类型']
  ],
  [
    '文心一言',
    'https://wenxin.baidu.com/',
    ['文心一言', 'wenxin', 'ai', '百度']
  ],
  [
    'FSD',
    'https://feature-sliced.design/zh',
    ['fsd', 'feature sliced', '前端架构']
  ],
  [
    'FSD',
    'https://github.com/feature-sliced/documentation',
    ['fsd', 'feature sliced', '架构文档']
  ],
  ['Google', 'https://www.google.com/', ['google', '谷歌', '搜索']],
  [
    'bilibili',
    'https://www.bilibili.com/video/BV1LEtHeEEik/?spm_id_from=333.788.videopod.episodes&vd_source=5e09d0a001ca43a605be940898fb2eef&p=102',
    ['bilibili', 'b站', 'BV1LEtHeEEik', '视频']
  ],
  [
    'Google',
    'https://www.google.com/search?q=%E5%89%8D%E7%AB%AF%E6%9E%B6%E6%9E%84FSD&sca_esv=37bddda42dba7073&sxsrf=APpeQnugr89kAcEP6hvRKAw6rRCG9TZzHA%3A1792250359837&ei=65HTapy7GcLj2roP8fvY4Aw&iflsig=ABILxe8AAAAAatOf-7lB9L1_cbwirTHHq01TU8zspO9E&uact=5&sclient=gws-wiz&fbs=ABfTbFUhNGvvPEUFOvrsPMHwBXgOm8tUDlxvAZfQkoB3YicE1mGPZRYnWQnVfLvJ8o9wFhut1TkSNdyt_xTnG482-m8_jNwwcBkRKHcY9um8NsbEAOFH2PgxCmquuWOC10kDF9F_uuqfidFF4lS8PqJGqgJ0NAF2kD3RnmOTdrbBY54yhG4Agx7o5njF0WEPInAEWtDhpyrGowj_aJvoJcpn3a5W1aPQyA&aep=10&ntc=1&mstk=AUtExfCiEgneyG8YzLCe2i-ZhfoEuh4azn08_qAVm9kNMpLWvnbqYfAFgP120UQd5UsiTHQfy2LW-csC3gpK263UIAOi9ks457rA0ZZdwIcIqboOh5LPs6gTH9_ZWDQeap_JDjWNTM8aMcqs5e8QKtExBkvbMW1Ga_-OOdk&aioh=3&csuir=1&mtid=-ZHTau6CON7g2roPlaXXgQw&udm=50',
    ['前端架构fsd', 'fsd搜索', 'google搜索']
  ],
  [
    '语雀',
    'https://www.yuque.com/dashboard/collections',
    ['语雀', 'yuque', '文档']
  ]
];

/** 内置快捷链接（首次进入时的初始数据） */
const DEFAULT_LINKS: LinkData[] = LINK_SEEDS.map(
  ([title, link, keywords], index) => ({
    key: `default-${index}-${link.slice(0, 24)}`,
    logo: '',
    link,
    title,
    keywords: [...keywords]
  })
);

let seq = 0;
const uid = () => `link-${Date.now().toString(36)}-${(seq++).toString(36)}`;

/** 归一化：去首尾空格 + 转小写，用于关键字比较 */
const normalize = (value: string) => value.trim().toLowerCase();

/** 补全协议，用户可能只填 google.com */
const normalizeUrl = (value: string) => {
  const url = value.trim();
  if (!url) return '';
  if (/^(https?:)?\/\//i.test(url)) {
    return url.startsWith('//') ? `https:${url}` : url;
  }
  return `https://${url}`;
};

/** 没配 logo 时，取站点自己的 favicon；取不到 Avatar 会自动降级为首字母 */
const faviconOf = (link: string) => {
  const url = normalizeUrl(link);
  if (!url) return '';
  try {
    return `${new URL(url).origin}/favicon.ico`;
  } catch {
    return '';
  }
};

const cloneDefaults = (): LinkData[] =>
  DEFAULT_LINKS.map(item => ({ ...item, keywords: [...item.keywords] }));

const loadLinks = (): LinkData[] => {
  try {
    const raw = localStorage.getItem(LINK_STORAGE_KEY);
    if (!raw) return cloneDefaults();
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return cloneDefaults();
    return parsed.map(item => {
      const data = item as Partial<LinkData>;
      return {
        key: data.key ? String(data.key) : uid(),
        logo: data.logo ?? '',
        link: data.link ?? '',
        title: data.title ?? '',
        keywords: Array.isArray(data.keywords)
          ? data.keywords.map(word => String(word))
          : []
      };
    });
  } catch {
    return cloneDefaults();
  }
};

const links = ref<LinkData[]>(loadLinks());
const keyword = ref('');
const engineValue = ref<string>(
  localStorage.getItem(ENGINE_STORAGE_KEY) ?? 'google'
);

watch(
  links,
  value => {
    localStorage.setItem(LINK_STORAGE_KEY, JSON.stringify(value));
  },
  { deep: true }
);

watch(engineValue, value => {
  localStorage.setItem(ENGINE_STORAGE_KEY, value);
});

/** 精确匹配关键字（忽略大小写与首尾空格），找不到再退化为匹配名称 */
const findByKeyword = (word: string): LinkData | undefined => {
  const target = normalize(word);
  if (!target) return undefined;
  const byKeyword = links.value.find(item =>
    item.keywords.some(k => normalize(k) === target)
  );
  if (byKeyword) return byKeyword;
  return links.value.find(item => normalize(item.title) === target);
};

/** 输入时的候选项：关键字或名称包含输入内容即可展示 */
const suggestions = computed(() => {
  const target = normalize(keyword.value);
  if (!target) return [];
  const options: { value: string; label: string; item: LinkData }[] = [];
  links.value.forEach(item => {
    const hit =
      item.keywords.find(k => normalize(k).includes(target)) ??
      (normalize(item.title).includes(target) ? item.title : undefined);
    if (!hit) return;
    options.push({ value: hit, label: `${item.title} · ${item.link}`, item });
  });
  return options;
});

const currentEngine = computed(() =>
  ENGINES.find(engine => engine.value === engineValue.value)
);

const engineOptions = computed(() =>
  ENGINES.map(engine => ({ value: engine.value, label: engine.label }))
);

const openLink = (item: LinkData) => {
  const url = normalizeUrl(item.link);
  if (!url) {
    message.error('链接地址无效');
    return;
  }
  window.open(url, '_blank', 'noopener,noreferrer');
};

/** 命中快捷链接就直接跳转，否则交给默认搜索引擎 */
const handleSearch = () => {
  const query = keyword.value.trim();
  if (!query) {
    message.warning('请输入要搜索的内容');
    return;
  }
  const hit = findByKeyword(query);
  if (hit) {
    openLink(hit);
    message.success(`已跳转到 ${hit.title}`);
    return;
  }
  const engine = currentEngine.value;
  if (!engine) {
    message.error('请先选择搜索引擎');
    return;
  }
  window.open(engine.build(query), '_blank', 'noopener,noreferrer');
  message.info(`未匹配到快捷链接，已使用 ${engine.label} 搜索`);
};

// ===================== 候选项下拉 =====================
const dropdownOpen = ref(false);
const searchBoxRef = ref<HTMLElement | null>(null);

const showDropdown = () => {
  dropdownOpen.value = suggestions.value.length > 0;
};

const hideDropdown = () => {
  dropdownOpen.value = false;
};

/** 焦点真正离开整个搜索区时才收起，避免点击候选项时先触发 blur */
const handleFocusOut = (event: FocusEvent) => {
  const next = event.relatedTarget as Node | null;
  if (next && searchBoxRef.value?.contains(next)) return;
  hideDropdown();
};

/** 点击候选项直接跳转对应链接 */
const handleSelectSuggestion = (item: LinkData) => {
  keyword.value = item.title;
  hideDropdown();
  openLink(item);
  message.success(`已跳转到 ${item.title}`);
};

// ===================== 链接管理（增删改查） =====================
const modalOpen = ref(false);
const editingKey = ref<string | null>(null);
const formRef = ref<FormInstance>();
const formState = reactive<FormState>({
  title: '',
  link: '',
  logo: '',
  keywords: []
});

const rules = {
  title: [{ required: true, message: '请输入名称', trigger: 'blur' }],
  link: [{ required: true, message: '请输入链接地址', trigger: 'blur' }]
};

const resetForm = () => {
  formState.title = '';
  formState.link = '';
  formState.logo = '';
  formState.keywords = [];
};

const openAddModal = () => {
  editingKey.value = null;
  resetForm();
  modalOpen.value = true;
};

const openEditModal = (item: LinkData) => {
  editingKey.value = item.key;
  formState.title = item.title;
  formState.link = item.link;
  formState.logo = item.logo;
  formState.keywords = [...item.keywords];
  modalOpen.value = true;
};

const handleSubmit = async () => {
  try {
    await formRef.value?.validate();
  } catch {
    return;
  }
  const title = formState.title.trim();
  const link = formState.link.trim();
  if (!title || !link) {
    message.warning('名称和链接不能为空');
    return;
  }
  const payload: LinkData = {
    key: editingKey.value ?? uid(),
    title,
    link,
    logo: formState.logo.trim(),
    keywords: formState.keywords.map(word => word.trim()).filter(Boolean)
  };
  const index = links.value.findIndex(item => item.key === payload.key);
  if (index === -1) {
    links.value.unshift(payload);
    message.success('添加成功');
  } else {
    links.value.splice(index, 1, payload);
    message.success('修改成功');
  }
  modalOpen.value = false;
  resetForm();
};

const handleDelete = (key: string) => {
  const index = links.value.findIndex(item => item.key === key);
  if (index === -1) return;
  links.value.splice(index, 1);
  message.success('删除成功');
};

/** 一键把内置链接同步回来（覆盖当前列表） */
const handleRestoreDefaults = () => {
  links.value = cloneDefaults();
  message.success('已恢复内置链接');
};

/** 链接文本可能很长（含 Google 搜索参数），表格里做省略，hover 看全文 */
const displayLink = (link: string) => {
  const url = normalizeUrl(link);
  if (url.length <= 48) return url;
  return `${url.slice(0, 48)}…`;
};

const columns = [
  { title: '名称', dataIndex: 'title', width: '20%' },
  { title: '链接', dataIndex: 'link', width: '34%' },
  { title: '关键字', dataIndex: 'keywords', width: '30%' },
  { title: '操作', dataIndex: 'operation', width: '16%' }
];
</script>

<template>
  <div class="search-page">
    <section class="search-panel">
      <h1 class="search-panel__title">搜索</h1>
      <p class="search-panel__desc">
        输入关键字直接跳转到对应站点，否则使用所选搜索引擎搜索
      </p>

      <div
        ref="searchBoxRef"
        class="search-panel__bar"
        @focusin="showDropdown"
        @focusout="handleFocusOut"
      >
        <div class="search-panel__input">
          <a-input
            v-model:value="keyword"
            allow-clear
            size="large"
            placeholder="输入关键字或搜索内容"
            @press-enter="handleSearch"
          >
            <template #suffix>
              <search-outlined
                class="search-panel__suffix"
                @click="handleSearch"
              />
            </template>
          </a-input>

          <ul
            v-show="dropdownOpen"
            class="search-panel__dropdown"
          >
            <li
              v-for="option in suggestions"
              :key="option.item.key"
              class="search-panel__option"
              @mousedown.prevent="handleSelectSuggestion(option.item)"
            >
              <span class="search-panel__option-title">
                {{ option.item.title }}
              </span>
              <span class="search-panel__option-link">{{
                option.item.link
              }}</span>
            </li>
          </ul>
        </div>

        <a-select
          v-model:value="engineValue"
          class="search-panel__engine"
          size="large"
          popup-class-name="search-select-dropdown"
          :options="engineOptions"
        />
      </div>

      <div class="search-panel__quick">
        <span class="search-panel__quick-label">快捷直达</span>
        <div class="search-panel__quick-list">
          <a-tag
            v-for="item in links"
            :key="item.key"
            class="search-panel__quick-tag"
            color="blue"
            @click="openLink(item)"
          >
            {{ item.title }}
          </a-tag>
        </div>
        <span
          v-if="!links.length"
          class="search-panel__empty"
        >
          还没有快捷链接，先在下方添加
        </span>
      </div>
    </section>

    <section class="search-manage">
      <div class="search-manage__header">
        <h2 class="search-manage__title">快捷链接管理</h2>
        <a-space>
          <a-popconfirm
            title="将覆盖当前列表，恢复为内置链接，确定吗？"
            @confirm="handleRestoreDefaults"
          >
            <a-button style="background-color: black">恢复默认</a-button>
          </a-popconfirm>
          <a-button
            type="primary"
            @click="openAddModal"
          >
            <template #icon><plus-outlined /></template>
            添加链接
          </a-button>
        </a-space>
      </div>

      <a-table
        bordered
        :columns="columns"
        :data-source="links"
        :pagination="{ pageSize: 10, showSizeChanger: false }"
        row-key="key"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'title'">
            <div class="search-manage__name">
              <a-avatar
                :size="28"
                :src="record.logo || faviconOf(record.link) || undefined"
                shape="square"
              >
                {{ record.title.slice(0, 1) }}
              </a-avatar>
              <span :title="record.title">{{ record.title }}</span>
            </div>
          </template>

          <template v-else-if="column.dataIndex === 'link'">
            <a
              class="search-manage__url"
              :href="normalizeUrl(record.link)"
              :title="normalizeUrl(record.link)"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ displayLink(record.link) }}
            </a>
          </template>

          <template v-else-if="column.dataIndex === 'keywords'">
            <a-tag
              v-for="word in record.keywords"
              :key="word"
              color="default"
            >
              {{ word }}
            </a-tag>
            <span
              v-if="!record.keywords.length"
              class="search-manage__muted"
            >
              未设置
            </span>
          </template>

          <template v-else-if="column.dataIndex === 'operation'">
            <a-space :size="4">
              <a-button
                size="small"
                type="link"
                @click="openEditModal(record)"
              >
                <template #icon><edit-outlined /></template>
                编辑
              </a-button>
              <a-popconfirm
                overlay-class-name="search-popconfirm-overlay"
                title="确定要删除该链接吗？"
                @confirm="handleDelete(record.key)"
              >
                <a-button
                  size="small"
                  type="link"
                  danger
                >
                  <template #icon><delete-outlined /></template>
                  删除
                </a-button>
              </a-popconfirm>
            </a-space>
          </template>
        </template>
      </a-table>
    </section>

    <a-modal
      v-model:open="modalOpen"
      wrap-class-name="search-modal-wrap"
      :title="editingKey ? '编辑链接' : '添加链接'"
      ok-text="保存"
      cancel-text="取消"
      @ok="handleSubmit"
    >
      <a-form
        ref="formRef"
        :model="formState"
        :rules="rules"
        layout="vertical"
      >
        <a-form-item
          label="名称"
          name="title"
        >
          <a-input
            v-model:value="formState.title"
            placeholder="例如：Google"
          />
        </a-form-item>

        <a-form-item
          label="链接"
          name="link"
        >
          <a-input
            v-model:value="formState.link"
            placeholder="例如：https://www.google.com"
          />
        </a-form-item>

        <a-form-item label="Logo 地址">
          <a-input
            v-model:value="formState.logo"
            placeholder="可选，站点图标地址"
          />
        </a-form-item>

        <a-form-item label="关键字">
          <a-select
            v-model:value="formState.keywords"
            mode="tags"
            popup-class-name="search-select-dropdown"
            placeholder="输入关键字后回车，可添加多个"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<style lang="scss" scoped>
/**
 * 暗色主题
 * 颜色取自 antd v4 官方 darkAlgorithm 的实际 token 值，
 * 保证页面自绘部分和 antd 组件部分是一套色，不会出现"半黑半白"。
 */
.search-page {
  --sp-bg: #141414;
  --sp-bg-elevated: #1f1f1f;
  --sp-bg-hover: #262626;
  --sp-border: #424242;
  --sp-border-soft: #303030;
  --sp-text: rgba(255, 255, 255, 0.85);
  --sp-text-secondary: rgba(255, 255, 255, 0.65);
  --sp-text-tertiary: rgba(255, 255, 255, 0.45);
  --sp-primary: #4096ff;

  min-height: 100vh;
  padding: 32px 24px 48px;
  background: #0d0d0d;
  color: var(--sp-text);
}

.search-panel {
  max-width: 880px;
  margin: 0 auto 24px;
  padding: 28px 24px;
  border: 1px solid var(--sp-border-soft);
  border-radius: 12px;
  background: var(--sp-bg);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.45);
}

.search-panel__title {
  margin: 0 0 6px;
  font-size: 26px;
}

.search-panel__desc {
  margin: 0 0 18px;
  font-size: 13px;
  color: var(--sp-text-secondary);
}

.search-panel__bar {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.search-panel__input {
  position: relative;
  flex: 1;
  min-width: 0;
}

.search-panel__engine {
  width: 160px;
  flex: none;
}

.search-panel__suffix {
  cursor: pointer;
  color: var(--sp-text-tertiary);
}

.search-panel__suffix:hover {
  color: var(--sp-text);
}

.search-panel__dropdown {
  position: absolute;
  z-index: 20;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  max-height: 280px;
  margin: 0;
  padding: 4px 0;
  overflow-y: auto;
  list-style: none;
  border: 1px solid var(--sp-border);
  border-radius: 8px;
  background: var(--sp-bg-elevated);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.5);
}

.search-panel__option {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 8px 14px;
  cursor: pointer;
}

.search-panel__option:hover {
  background: var(--sp-bg-hover);
}

.search-panel__option-title {
  font-size: 13px;
  font-weight: 600;
}

.search-panel__option-link {
  font-size: 12px;
  color: var(--sp-text-tertiary);
  word-break: break-all;
}

.search-panel__quick {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  margin-top: 18px;
}

.search-panel__quick-label {
  font-size: 12px;
  color: var(--sp-text-secondary);
  flex: none;
}

/* 41 条链接，标签区限高滚动，避免把搜索框顶到屏幕外 */
.search-panel__quick-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  max-height: 108px;
  overflow-y: auto;
  padding-right: 4px;
}

.search-panel__quick-tag {
  cursor: pointer;
}

.search-panel__empty {
  font-size: 12px;
  color: var(--sp-text-secondary);
}

.search-manage {
  max-width: 880px;
  margin: 0 auto;
  padding: 20px 24px 24px;
  border: 1px solid var(--sp-border-soft);
  border-radius: 12px;
  background: var(--sp-bg);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.45);
}

.search-manage__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}

.search-manage__title {
  margin: 0;
  font-size: 16px;
}

.search-manage__name {
  display: flex;
  gap: 8px;
  align-items: center;
}

.search-manage__name > span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.search-manage__url {
  display: block;
  color: var(--sp-primary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.search-manage__muted {
  font-size: 12px;
  color: var(--sp-text-tertiary);
}

/* ===================== antd 组件暗色适配 =====================
 * antd v4 的组件样式是运行时生成的（cssinjs），
 * 只能靠类名覆盖。这里用 :deep() 穿透 scoped 边界。
 */

/* 输入框 / 下拉选择器 */
.search-page :deep(.ant-input),
.search-page :deep(.ant-input-affix-wrapper),
.search-page
  :deep(.ant-select:not(.ant-select-customize-input) .ant-select-selector) {
  border-color: var(--sp-border);
  background-color: var(--sp-bg-elevated);
  color: var(--sp-text);
}

.search-page :deep(.ant-input::placeholder),
.search-page :deep(.ant-select-selection-placeholder) {
  color: var(--sp-text-tertiary);
}

.search-page :deep(.ant-input:hover),
.search-page :deep(.ant-input-affix-wrapper:hover),
.search-page
  :deep(
    .ant-select:not(.ant-select-customize-input) .ant-select-selector:hover
  ) {
  border-color: var(--sp-primary);
}

.search-page :deep(.ant-input:focus),
.search-page :deep(.ant-input-affix-wrapper-focused),
.search-page
  :deep(
    .ant-select-focused:not(.ant-select-customize-input) .ant-select-selector
  ) {
  border-color: var(--sp-primary);
}

.search-page :deep(.ant-input-clear-icon),
.search-page :deep(.ant-select-arrow),
.search-page :deep(.ant-select-selection-item) {
  color: var(--sp-text-secondary);
}

/* 表格 */
.search-page :deep(.ant-table),
.search-page :deep(.ant-table-tbody > tr > td) {
  background: var(--sp-bg);
  color: var(--sp-text);
}

.search-page :deep(.ant-table-thead > tr > th) {
  background: var(--sp-bg-elevated);
  color: var(--sp-text);
  border-bottom-color: var(--sp-border-soft);
}

.search-page :deep(.ant-table-tbody > tr > td) {
  border-bottom-color: var(--sp-border-soft);
}

.search-page :deep(.ant-table-tbody > tr:hover > td),
.search-page :deep(.ant-table-tbody > tr.ant-table-row-selected > td) {
  background: var(--sp-bg-hover);
}

.search-page :deep(.ant-table-placeholder) {
  color: var(--sp-text-tertiary);
}

.search-page :deep(.ant-table-cell-fix-left),
.search-page :deep(.ant-table-cell-fix-right) {
  background: var(--sp-bg);
}

/* 标签 */
.search-page :deep(.ant-tag) {
  border-color: var(--sp-border);
  background: var(--sp-bg-elevated);
  color: var(--sp-text-secondary);
}

.search-page :deep(.ant-tag-blue) {
  border-color: #2b5a9e;
  background: #17223a;
  color: #91caff;
}

/* 按钮 */
.search-page :deep(.ant-btn-default),
.search-page :deep(.ant-btn-link) {
  border-color: var(--sp-border);
  color: var(--sp-text);
}

.search-page :deep(.ant-btn-default:hover),
.search-page :deep(.ant-btn-link:hover) {
  border-color: var(--sp-primary);
  color: var(--sp-primary);
}

.search-page :deep(.ant-btn-dangerous:hover) {
  color: #ff7875;
}

/* 表单 label */
.search-page :deep(.ant-form-item-label > label) {
  color: var(--sp-text-secondary);
}

/* 分页 */
.search-page :deep(.ant-pagination),
.search-page :deep(.ant-pagination-total-text),
.search-page :deep(.ant-pagination-item a) {
  color: var(--sp-text-secondary);
}

.search-page :deep(.ant-pagination-item),
.search-page :deep(.ant-pagination-prev .ant-pagination-item-link),
.search-page :deep(.ant-pagination-next .ant-pagination-item-link) {
  border-color: var(--sp-border);
  background: var(--sp-bg-elevated);
}

.search-page :deep(.ant-pagination-item-active) {
  border-color: var(--sp-primary);
}

.search-page :deep(.ant-pagination-item-active a) {
  color: var(--sp-primary);
}

/* 头像字母兜底 */
.search-page :deep(.ant-avatar) {
  background: var(--sp-bg-hover);
  color: var(--sp-text-secondary);
}
</style>

<!--
  弹层（Select 下拉 / Modal / Popconfirm）会 teleport 到 body，
  拿不到 scoped 的 data-v 属性，所以单独用一个非 scoped 样式块，
  靠上面打的唯一类名精确定位，不会影响其他页面。
-->
<style lang="scss">
/* Select 下拉 */
.search-select-dropdown {
  background: #1f1f1f;

  .ant-select-dropdown {
    background: #1f1f1f;
  }

  .ant-select-item {
    color: rgba(255, 255, 255, 0.85);
  }

  .ant-select-item-option-active:not(.ant-select-item-option-disabled) {
    background: #262626;
  }

  .ant-select-item-option-selected:not(.ant-select-item-option-disabled) {
    background: #111a2c;
    color: #4096ff;
  }

  .ant-select-selection-item {
    border-color: #424242;
    background: #262626;
    color: rgba(255, 255, 255, 0.85);
  }
}

/* Modal */
.search-modal-wrap {
  .ant-modal-content {
    background: #1f1f1f;
  }

  .ant-modal-header {
    background: #1f1f1f;
    border-bottom-color: #303030;
  }

  .ant-modal-title {
    color: rgba(255, 255, 255, 0.85);
  }

  .ant-modal-close {
    color: rgba(255, 255, 255, 0.45);
  }

  .ant-modal-close:hover {
    color: rgba(255, 255, 255, 0.85);
  }

  .ant-modal-footer {
    border-top-color: #303030;
  }

  .ant-modal-body {
    color: rgba(255, 255, 255, 0.85);
  }

  .ant-input,
  .ant-input-affix-wrapper,
  .ant-select:not(.ant-select-customize-input) .ant-select-selector {
    border-color: #424242;
    background-color: #141414;
    color: rgba(255, 255, 255, 0.85);
  }

  .ant-input::placeholder,
  .ant-select-selection-placeholder {
    color: rgba(255, 255, 255, 0.45);
  }

  .ant-form-item-label > label {
    color: rgba(255, 255, 255, 0.65);
  }
}

/* Popconfirm 气泡 */
.search-popconfirm-overlay {
  .ant-popover-inner,
  .ant-popconfirm-inner {
    background: #1f1f1f;
  }

  .ant-popconfirm-title {
    color: rgba(255, 255, 255, 0.85);
  }

  .ant-popconfirm-description {
    color: rgba(255, 255, 255, 0.65);
  }

  .ant-popconfirm-buttons .ant-btn {
    background: transparent;
    border-color: #424242;
    color: rgba(255, 255, 255, 0.85);
  }
}
</style>
