<template>
  <div :class="`${name}__wrapper`" :style="customSize">
    <div :class="`${name}__badge`">
      <t-badge v-bind="customBadgeProps">
        <div :class="avatarClass">
          <t-image
            v-if="image && !hideOnLoadFailed"
            :style="customSize"
            v-bind="customImageProps"
            @error="handleImgLoadError"
          />
          <div v-else-if="iconContent !== undefined" :class="`${name}__icon`">
            <t-node :content="iconContent"></t-node>
          </div>
          <span v-else>
            <t-node :content="avatarContent"></t-node>
          </span>
        </div>
      </t-badge>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, toRefs, defineComponent, getCurrentInstance, inject, ref } from 'vue';
import TBadge from '../badge';
import TImage from '../image';
import config from '../config';
import AvatarProps from './props';
import { TdAvatarGroupProps } from './type';
import CLASSNAMES from '../shared/constants';
import { renderContent, renderTNode, TNode } from '../shared';

const { prefix } = config;
const name = `${prefix}-avatar`;

export default defineComponent({
  name,
  components: { TNode, TBadge, TImage },
  props: AvatarProps,
  emits: ['error'],
  setup(props) {
    const internalInstance = getCurrentInstance();
    const avatarGroupProps = inject('avatarGroup', {}) as TdAvatarGroupProps;
    const hasAvatarGroupProps = Object.keys(avatarGroupProps).length > 0;
    const iconContent = computed(() => renderTNode(internalInstance, 'icon'));
    const avatarContent = computed(() => renderContent(internalInstance, 'default', 'content'));
    const sizeValue = ref(props.size || (avatarGroupProps && avatarGroupProps.size));
    const sizeReValue = ref((avatarGroupProps && avatarGroupProps.size) || props.size);
    const sizeClass = `${sizeReValue.value.indexOf('px') > -1 ? 'medium' : sizeReValue.value}`;
    const avatarClass = computed(() => [
      `${name}`,
      `${name}--${sizeClass}`,
      {
        [`${name}--${props.shape}`]: props.shape,
      },
      hasAvatarGroupProps ? `${name}--border ${name}--border-${sizeClass}` : '',
    ]);

    const isCustomSize = computed(() => sizeValue.value && !CLASSNAMES.SIZE[sizeValue.value]);
    const customSize = computed(() => {
      return isCustomSize.value
        ? {
            height: sizeValue.value,
            width: sizeValue.value,
          }
        : {};
    });

    const handleImgLoadError = (e: any) => {
      props.onError?.(e);
    };

    const customBadgeProps = computed(() => ({
      ...props.badgeProps,
    }));

    const baseImageProps = {
      src: props.image,
      alt: props.alt,
    };
    const customImageProps = computed(() => ({
      ...props.imageProps,
      ...baseImageProps,
    }));

    return {
      name,
      ...toRefs(props),
      iconContent,
      avatarContent,
      avatarClass,
      customSize,
      handleImgLoadError,
      customImageProps,
      customBadgeProps,
    };
  },
});
</script>
