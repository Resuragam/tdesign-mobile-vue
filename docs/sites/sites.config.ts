export default {
  docs: [
    {
      title: '开始',
      type: 'document', // 普通文档
      children: [
        {
          title: '说明',
          name: 'readme',
          path: '/vue-mobile/components/readme',
          component: () => import('@/../README.md'),
        },
        {
          title: '贡献指南',
          name: 'contributing',
          path: '/vue-mobile/components/contributing',
          component: () => import('@/../CONTRIBUTING.md'),
        },
        {
          title: '更新日志',
          name: 'changelog',
          path: '/vue-mobile/components/changelog',
          component: () => import('@/../CHANGELOG.md'),
        },
      ],
    },
    {
      title: '基础组件',
      type: 'component', // 组件文档
      children: [
        {
          title: 'Icon 图标',
          name: 'icon',
          path: '/vue-mobile/components/icon',
          component: () => import('@/icon/icon.md'),
        },
        {
          title: 'Button 按钮',
          name: 'button',
          path: '/vue-mobile/components/button',
          component: () => import('@/button/button.md'),
        },
      ],
    },
    {
      title: '信息展示',
      type: 'component',
      children: [
        {
          title: 'Badge 徽标',
          name: 'badge',
          path: '/vue-mobile/components/badge',
          component: () => import('@/badge/badge.md'),
        },
        {
          title: 'Tag 标签',
          name: 'tag',
          path: '/vue-mobile/components/tag',
          component: () => import('@/tag/tag.md'),
        },
        {
          title: 'DropdownMenu 下拉菜单',
          name: 'dropdown-menu',
          path: '/vue-mobile/components/dropdown-menu',
          component: () => import('@/dropdown-menu/dropdown-menu.md'),
        },
        {
          title: 'Collapse 折叠面板',
          name: 'collapse',
          path: '/vue-mobile/components/collapse',
          component: () => import('@/collapse/collapse.md'),
        },
        {
          title: 'Cell 单元格',
          name: 'cell',
          path: '/vue-mobile/components/cell',
          component: () => import('@/cell/cell.md'),
        },
      ],
    },
    {
      title: '输入类组件',
      type: 'component',
      children: [
        {
          title: 'Stepper 步进器',
          name: 'stepper',
          path: '/vue-mobile/components/stepper',
          component: () => import('@/stepper/stepper.md'),
        },
        {
          title: 'Slider 滑动选择器',
          name: 'slider',
          path: '/vue-mobile/components/slider',
          component: () => import('@/slider/slider.md'),
        },
        {
          title: 'Picker 选择器',
          name: 'picker',
          path: '/vue-mobile/components/picker',
          component: () => import('@/picker/picker.md'),
        },
        {
          title: 'Radio 单选框',
          name: 'radio',
          path: '/vue-mobile/components/radio',
          component: () => import('@/radio/radio.md'),
        },
        {
          title: 'Rate 评分',
          name: 'rate',
          path: '/vue-mobile/components/rate',
          component: () => import('@/rate/rate.md'),
        },
        {
          title: 'Switch 开关',
          name: 'switch',
          path: '/vue-mobile/components/switch',
          component: () => import('@/switch/switch.md'),
        },
        {
          title: 'CheckBox 复选框',
          name: 'checkbox',
          path: '/vue-mobile/components/checkbox',
          component: () => import('@/checkbox/checkbox.md'),
        },
        {
          title: 'Input 输入框',
          name: 'input',
          path: '/vue-mobile/components/input',
          component: () => import('@/input/input.md'),
        },
        {
          title: 'Fab 悬浮按钮',
          name: 'fab',
          path: '/vue-mobile/components/fab',
          component: () => import('@/fab/fab.md'),
        },
        {
          title: 'SearchField 搜索框',
          name: 'search-field',
          path: '/vue-mobile/components/search-field',
          component: () => import('@/search-field/search-field.md'),
        },
      ],
    },
    {
      title: '导航组件',
      type: 'component',
      children: [
        {
          title: 'Steps 步骤条',
          name: 'steps',
          path: '/vue-mobile/components/steps',
          component: () => import('@/steps/steps.md'),
        },
        {
          title: 'TabBar 标签栏',
          name: 'tabbar',
          path: '/vue-mobile/components/tabbar',
          component: () => import('@/tab-bar/tab-bar.md'),
        },
        {
          title: 'SegmentedControl 分段器',
          name: 'segmented-control',
          path: '/vue-mobile/components/segmented-control',
          component: () => import('@/segmented-control/segmented-control.md'),
        },
        {
          title: 'ImageViewer 图片预览',
          name: 'image-viewer',
          path: '/vue-mobile/components/image-viewer',
          component: () => import('@/image-viewer/image-viewer.md'),
        },
        {
          title: 'Drawer 抽屉',
          name: 'drawer',
          path: '/vue-mobile/components/drawer',
          component: () => import('@/drawer/drawer.md'),
        },
        {
          title: 'Tabs 选项卡',
          name: 'tabs',
          path: '/vue-mobile/components/tabs',
          component: () => import('@/tabs/tabs.md'),
        },
        {
          title: 'Navbar 导航条',
          name: 'navbar',
          path: '/vue-mobile/components/navbar',
          component: () => import('@/navbar/navbar.md'),
        },
        {
          title: 'Indexes 索引',
          name: 'indexes',
          path: '/vue-mobile/components/indexes',
          component: () => import('@/indexes/indexes.md'),
        },
      ],
    },
    {
      title: '消息提醒',
      type: 'component', // 组件文档
      children: [
        {
          title: 'Progress 进度条',
          name: 'progress',
          path: '/vue-mobile/components/progress',
          component: () => import('@/progress/progress.md'),
        },
        {
          title: 'ActionSheet 动作面板',
          name: 'actionsheet',
          path: '/vue-mobile/components/actionsheet',
          component: () => import('@/action-sheet/action-sheet.md'),
        },
        {
          title: 'Toast 轻提示',
          name: 'toast',
          path: '/vue-mobile/components/toast',
          component: () => import('@/toast/toast.md'),
        },
        {
          title: 'Message 消息',
          name: 'message',
          path: '/vue-mobile/components/message',
          component: () => import('@/message/message.md'),
        },
        {
          title: 'NoticeBar 公告栏',
          name: 'noticebar',
          path: '/vue-mobile/components/noticebar',
          component: () => import('@/noticebar/noticebar.md'),
        },
        {
          title: 'Dialog 弹出框',
          name: 'dialog',
          path: '/vue-mobile/components/dialog',
          component: () => import('@/dialog/dialog.md'),
        },
        {
          title: 'Popup 弹出层',
          name: 'popup',
          path: '/vue-mobile/components/popup',
          component: () => import('@/popup/popup.md'),
        },
      ],
    },
  ],
};
