<template>
  <em-dialog ref="dialog" class="em-form-dialog" v-bind="dialog" v-on="dialogOn" :visible.sync="visible_">
    <em-form ref="form" v-bind="form" v-on="formOn">
      <slot />
    </em-form>

    <template v-slot:footer-left>
      <slot name="footer-left" />
    </template>

    <template v-if="footer" v-slot:footer>
      <slot name="footer">
        <el-button v-if="btnReset && !disabled" @click="reset" type="warning" :size="fontSize">重置</el-button>
        <el-button v-if="btnOk && !disabled" type="primary" @click="submit" :size="fontSize">{{ btnOkText }}</el-button>
        <slot name="footer-buttons" />
      </slot>
    </template>
  </em-dialog>
</template>
<script>
import visible from '../../mixins/components/visible'
export default {
  name: 'form-dialog',
  mixins: [visible],
  data() {
    return {
      loading_: false,
      dialog: {
        //标题
        title: this.title,
        //头部左侧图标
        icon: this.icon,
        //宽度
        width: this.width,
        //高度
        height: this.height,
        //内边距
        padding: this.padding,
        //显示底部
        footer: this.footer,
        //是否显示全屏按钮
        fullscreen: this.fullscreen,
        //是否可以通过点击 modal 关闭 Dialog
        closeOnClickModal: this.closeOnClickModal,
        //显示loading
        loading: this.showLoading,
        //是否显示底部关闭按钮
        footerCloseButton: this.footerCloseButton
      },
      dialogOn: {
        //窗口打开事件
        open: this.onOpen,
        //窗口打开后事件
        opened: this.onOpened,
        //窗口关闭事件
        close: this.onClose,
        //窗口关闭后事件
        closed: this.onClosed
      },
      form: {
        //不显示动画
        noLoading: true,
        //表单对象
        model: this.model,
        //验证规则
        rules: this.rules,
        //提交请求
        action: this.action,
        //标签的宽度
        labelWidth: this.labelWidth,
        //表单域标签的位置，如果值为 left 或者 right 时，则需要设置 label-width
        labelPosition: this.labelPosition,
        //是否显示成功提示消息
        successMsg: this.successMsg,
        //成功提示消息文本
        successMsgText: this.successMsgText,
        //禁用表单
        disabled: this.disabled,
        //行内表单模式
        inline: this.inline,
        //自定义校验
        customValidate: this.customValidate,
        //额外校验
        extraValidate: this.extraValidate,
        //自定义重置
        customReset: this.customReset,
        //额外重置
        extraReset: this.extraReset
      },
      formOn: {
        //保存成功
        success: this.onSuccess,
        //保存失败
        error: this.onError,
        //重置
        reset: this.onReset,
        //验证失败
        'validate-error': this.onValidateError
      }
    }
  },
  props: {
    //标题
    title: String,
    //图标
    icon: String,
    //宽度
    width: String,
    //Dialog 的高度
    height: [Number, String],
    //内边距（默认8px）
    padding: {
      type: [Number, String],
      default: 8
    },
    //显示尾部
    footer: {
      type: Boolean,
      default: true
    },
    //是否可以通过点击 modal 关闭 Dialog
    closeOnClickModal: {
      type: Boolean,
      default: null
    },
    //是否显示全屏按钮
    fullscreen: Boolean,
    //表单模型
    model: {
      type: Object,
      required: false
    },
    //验证规则
    rules: Object,
    //提交请求
    action: Function,
    //行内表单
    inline: {
      type: Boolean,
      default: false
    },
    //标签的宽度
    labelWidth: String,
    //表单域标签的位置，如果值为 left 或者 right 时，则需要设置 label-width
    labelPosition: String,
    //是否显示成功提示消息
    successMsg: {
      type: Boolean,
      default: true
    },
    //成功提示消息文本
    successMsgText: {
      type: String,
      default: '保存成功'
    },
    //Ok按钮
    btnOk: {
      type: Boolean,
      default: true
    },
    //Ok按钮文本
    btnOkText: {
      type: String,
      default: '保存'
    },
    //reset按钮
    btnReset: {
      type: Boolean,
      default: false
    },
    //保存成功后是否关闭对话框
    closeWhenSuccess: {
      type: Boolean,
      default: true
    },
    //禁用表单
    disabled: Boolean,
    //显示加载动画
    loading: Boolean,
    //不显示加载动画
    noLoading: Boolean,
    //打开时是否清除验证信息
    clearValidateOnOpen: {
      type: Boolean,
      default: true
    },
    //是否显示底部关闭按钮
    footerCloseButton: Boolean,

    //自定义验证
    customValidate: Function,
    // 额外验证
    extraValidate: Function,
    //自定义重置操作
    customReset: Function,
    //额外重置（除el-form自带的重置）
    extraReset: Function
  },
  computed: {
    showLoading() {
      return !this.noLoading && (this.loading_ || this.loading)
    }
  },
  methods: {
    /**
     * @description: 提交表单
     * @param {*}
     * @return {*}
     */
    submit() {
      this.loading_ = true
      this.$refs.form.submit()
    },

    /**
     * @description: 重置表单
     * @param {*}
     * @return {*}
     */
    reset() {
      this.$nextTick(() => {
        this.$refs.form.reset()
      })
    },

    /**
     * @description: 校验
     */
    validate() {
      return this.$refs.form.validate()
    },

    /**
     * @description: 清除验证信息
     */
    clearValidate() {
      this.$refs.form.clearValidate()
    },

    /**
     * @description: 打开loading
     */
    openLoading() {
      this.loading_ = true
    },

    /**
     * @description: 关闭loading
     */
    closeLoading() {
      this.loading = false
    },

    /**
     * @description: 成功
     */
    onSuccess(data) {
      // 关闭对话框
      if (this.closeWhenSuccess) {
        setTimeout(this.hide, 800)
      }
      this.loading_ = false
      this.$emit('success', data)
    },

    /**
     * @description: 重置表单
     */
    onReset() {
      this.$emit('reset')
    },

    /**
     * @description: 失败
     */
    onError() {
      this.loading_ = false
      this.$emit('error')
    },

    /**
     * @description: 验证失败
     */
    onValidateError() {
      this.loading_ = false
      this.$emit('validate-error')
    },

    /**
     * @description:Dialog 打开的回调
     */
    onOpen() {
      if (this.clearValidateOnOpen) {
        this.$nextTick(() => {
          this.$refs.form.clearValidate()
        })
      }
      this.$emit('open')
    },

    /**
     * @description:Dialog 打开动画结束时的回调
     */
    onOpened() {
      this.$emit('opened')
    },

    /**
     * @description:Dialog 关闭的回调
     */
    onClose() {
      this.$emit('close')
    },

    /**
     * @description:Dialog 关闭动画结束时的回调
     */
    onClosed() {
      this.$emit('closed')
    }
  }
}
</script>
