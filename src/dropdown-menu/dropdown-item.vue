<template>
  <div v-if="wrapperVisible" :id="popupId" :class="classes" :style="{ ...expandStyle }">
    <t-popup
      :visible="isShowItems"
      :duration="duration"
      :show-overlay="showOverlay"
      :style="popupStyle"
      :overlay-props="{ style: 'position: absolute' }"
      :class="`${name}__popup-host`"
      :attach="`#${popupId}`"
      @visible-change="onVisibleChange"
    >
      <div :class="styleContent">
        <div :class="`${name}__body`">
          <slot>
            <template v-if="!multiple">
              <!-- 单选列表 -->
              <t-radio-group v-model="radioSelect" placement="right" :class="`${name}__radio-group`">
                <template v-for="option in options" :key="option.value">
                  <t-radio
                    :value="option.value"
                    :label="option.label"
                    :disabled="option.disabled"
                    :class="styleDropRadio(option.value)"
                    :checked="isCheckedRadio(option.value)"
                    icon="line"
                  />
                </template>
              </t-radio-group>
            </template>
            <template v-else>
              <!-- 多选列表 -->
              <t-checkbox-group
                v-model="checkSelect"
                :class="`${name}__checkbox-group`"
                :style="`grid-template-columns: repeat(${$props.optionsColumns}, 1fr)`"
              >
                <template v-for="option in options" :key="option.value">
                  <t-checkbox
                    :class="`${name}__checkbox-item t-checkbox--tag`"
                    :icon="false"
                    borderless
                    :value="option.value"
                    :label="option.label"
                    :disabled="option.disabled"
                  />
                </template>
              </t-checkbox-group>
            </template>
          </slot>
        </div>
        <slot name="footer">
          <div v-if="multiple" :class="`${name}__footer`">
            <t-button
              theme="light"
              :class="`${name}__footer-btn ${name}__reset-btn`"
              :disabled="isBtnDisabled"
              @click="resetSelect"
              >重置</t-button
            >
            <t-button
              theme="primary"
              :class="`${name}__footer-btn ${name}__confirm-btn`"
              :disabled="isBtnDisabled"
              @click="confirmSelect"
              >确定</t-button
            >
          </div>
        </slot>
      </div>
    </t-popup>
  </div>
</template>

<script lang="ts">
import { ref, watch, toRefs, inject, computed, reactive, onBeforeMount, defineComponent, nextTick } from 'vue';
import TRadio, { RadioGroup as TRadioGroup } from '../radio';
import config from '../config';
import TButton from '../button';
import TPopup from '../popup';
import TCheckbox, { CheckboxGroup as TCheckboxGroup } from '../checkbox';
import { useVModel, uniqueFactory } from '../shared';
import DropdownItemProps from './dropdown-item-props';
import { DropdownMenuState, DropdownMenuControl } from './context';
import { TdDropdownMenuProps, DropdownValue } from './type';

const { prefix } = config;
const name = `${prefix}-dropdown-item`;
const getUniqueID = uniqueFactory('dropdown-popup');

export default defineComponent({
  name,
  components: { TRadio, TButton, TPopup, TCheckbox, TRadioGroup, TCheckboxGroup },
  props: DropdownItemProps,
  emits: ['change', 'open', 'opened', 'close', 'closed', 'update:value', 'update:modelValue'],
  setup(props) {
    // 受控 value 属性
    const { value, modelValue } = toRefs(props);
    const [passInValue, setValue] = useVModel(value, modelValue, props.defaultValue);
    // 从父组件取属性、状态和控制函数
    const menuProps = inject('dropdownMenuProps') as TdDropdownMenuProps;
    const menuState = inject('dropdownMenuState') as DropdownMenuState;
    const { expandMenu, collapseMenu, emitEvents } = inject('dropdownMenuControl') as DropdownMenuControl;

    // 组件样式
    const classes = computed(() => [`${name}`]);

    const itemId = ref(0);
    onBeforeMount(() => {
      itemId.value = menuState.childCount;
      menuState.childCount += 1;
    });

    const state = reactive({
      showOverlay: computed(() => menuProps.showOverlay),
      duration: computed(() => menuProps.duration),
      isShowItems: false,
      wrapperVisible: false,
      expandStyle: {} as Object,
      multiple: computed(() => props.multiple),
      options: computed(() => {
        if (props.keys) {
          return props.options?.map((item) => ({
            value: item[props.keys?.value ?? 'value'],
            label: item[props.keys?.label ?? 'label'],
            disabled: item.disabled,
          }));
        }
        return props.options;
      }),
    });

    const isCheckedRadio = (value: DropdownValue) => value === radioSelect.value;
    const styleDropRadio = (value: DropdownValue) => [
      `${name}__radio-item`,
      {
        [`${prefix}-is-tick`]: !props.multiple,
        [`${prefix}-is-checked`]: isCheckedRadio(value),
      },
    ];
    const popupStyle = computed(() => {
      return {
        zIndex: menuProps.zIndex && menuProps.zIndex + 1,
        position: 'absolute',
      };
    });
    const styleContent = computed(() => {
      return [`${name}__content`, `t-popup__content`];
    });
    const popupId = getUniqueID();
    // 设置展开/收起状态
    const setExpand = (val: boolean) => {
      // 菜单定位
      const { bottom } = menuState.barRect;
      state.expandStyle = {
        zIndex: menuProps.zIndex,
        top: `${bottom}px`,
      };
      const { duration } = menuProps;
      props[`on${val ? 'Open' : 'Close'}`]?.();
      // 动画状态控制
      if (val) {
        state.wrapperVisible = true;
      }
      nextTick(() => {
        state.isShowItems = val;
      });
      if (!val) {
        setTimeout(() => {
          state.wrapperVisible = false;
        }, Number(duration));
      }
      setTimeout(() => {
        props[`on${val ? 'Opened' : 'Closed'}`]?.();
      }, Number(duration));
    };

    // 根据父组件状态，判断当前是否展开
    watch(
      () => menuState.activeId === itemId.value,
      (val: boolean) => setExpand(val),
    );

    const radioSelect = ref();
    const checkSelect = ref();
    // 根据传入值更新当前选中
    const updateSelectValue = (val: DropdownValue | DropdownValue[] | null) => {
      if (!props.multiple) {
        const list = state.options;
        const firstChild = list?.[0];
        const newValue = val ?? firstChild?.value ?? null;
        radioSelect.value = newValue as DropdownValue;
      } else if (props.multiple) {
        checkSelect.value = (val ?? []) as DropdownValue[];
      }
    };
    // 初始值更新一次选中项
    updateSelectValue(passInValue.value || null);
    // 跟踪 modelValue 更新选项
    watch(
      () => passInValue.value,
      (val) => {
        if (!val) return;
        updateSelectValue(val);
      },
    );
    // 底部按键是否可用
    const isBtnDisabled = computed(() => {
      return Array.isArray(checkSelect.value) && checkSelect.value.length <= 0;
    });
    // 重置
    const resetSelect = () => {
      checkSelect.value = [];
      let values = checkSelect.value;
      values = JSON.parse(JSON.stringify(values));
      props.onReset?.(values);
    };
    // 确认
    const confirmSelect = () => {
      let values = checkSelect.value;
      values = JSON.parse(JSON.stringify(values));
      props.onConfirm?.(values);
      setValue(values);
      collapseMenu();
      emitEvents('menuClosed', 'confirm');
    };
    // 多选值监控
    watch(checkSelect, (val) => {
      if (!props.multiple) return;
      if (!state.isShowItems) return;
      if (val) {
        const value = JSON.stringify(passInValue.value || []);
        const values = JSON.stringify(val);
        if (value === values) return;
        props.onChange?.(JSON.parse(values));
      }
    });
    // 单选值监控
    watch(radioSelect, (val) => {
      if (menuState.activeId !== null) {
        const target = state.options?.find((item: any) => item.value === val);
        menuState.itemsLabel[menuState.activeId] = target?.label;
      }
      if (props.multiple) return;
      if (!state.isShowItems) return;
      const value = passInValue.value || [];
      if (value[0] === val) return;
      if (val) {
        props.onChange?.(val);
        setValue(val);
      }
      collapseMenu();
      emitEvents('menuClosed', 'content');
    });

    const onVisibleChange = (visible: boolean) => {
      if (menuProps.closeOnClickOverlay && !visible) {
        collapseMenu();
        emitEvents('menuClosed', 'overlay');
      }
    };

    return {
      name: ref(name),
      ...toRefs(props),
      ...toRefs(state),
      classes,
      popupStyle,
      styleContent,
      isBtnDisabled,
      radioSelect,
      checkSelect,
      popupId,
      isCheckedRadio,
      styleDropRadio,
      expandMenu,
      collapseMenu,
      resetSelect,
      confirmSelect,
      onVisibleChange,
    };
  },
});
</script>
