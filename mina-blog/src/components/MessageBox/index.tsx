// 这是JSX语法 所以 文件夹命名也是 jsx 别忘记了

export const MessageBox = {
  props: {
    message: {
      type: String,
      default: '',
    },
    snackbar: {
      type: Boolean,
      default: true,
    },
    type: {
      type: String,
      default: 'info',
    },
    position: {
      type: String,
      default: 'top',
    },
    timeout: {
      type: Number,
      default: 5000,
    },
    positionStyle: {
      type: String,
      default: 'top: 0px',
    },
    showClose: {
      type: Boolean,
      default: false,
    },
  },
  render(ctx: any) {
    const { $props } = ctx

    const messageType = () => {
      const colorType: any = {
        info: {
          bg: '#FAFAFA',
          color: '#BDBDBD',
          icon: 'mdi-information',
        },
        success: {
          bg: '#E8F5E9',
          color: '#66BB6A',
          icon: 'mdi-check-circle',
        },
        warning: {
          bg: '#FFF3E0',
          color: '#FFA726',
          icon: 'mdi-alert-circle',
        },
        error: {
          bg: '#FFEBEE',
          color: '#EF5350',
          icon: 'mdi-close-circle',
        },
      }
      return colorType[$props.type] || '#e9e9eb'
    }

    return (
      <v-snackbar v-model={$props.snackbar} style={$props.positionStyle} location={$props.position} timeout={$props.timeout} color={messageType().bg}>
        {{
          text: () => (
            <p style={`display: flex; align-items: flex-end; color: ${messageType().color}`}>
              <v-icon icon={messageType().icon} class="mr-2" />
              {$props.message}
            </p>
          ),
          actions: () => ($props.showClose ? <v-icon icon="mdi-close" color="#BDBDBD" /> : ''),
        }}
      </v-snackbar>
    )
  },
}

