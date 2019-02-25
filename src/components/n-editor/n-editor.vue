<template>
    <script :id="id" type="text/plain"></script>
</template>

<script>
  export default {
    name: "n-editor",
    props: {
      value: {
        type: String,
        required: false,
        default: '',
      },
      config: {
        type: Object,
        required: false,
      },
      jsFileName: {
        type: String,
        required: false,
        default: 'neditor.all.min.js',
      },
      configFileName: {
        type: String,
        required: false,
        default: 'neditor.config.js',
      },
    },
    computed: {
      mixedConfig() {
        return Object.assign({}, this.defaultConfig, this.config)
      }
    },
    data() {
      return {
        id: 'editor' + Math.random().toString().slice(-10),
        editor: null,
        defaultConfig: {
          UEDITOR_HOME_URL: "/static/n-editor/",
          zIndex: 900
        }
      }
    },
    watch: {
      value: {
        handler(value) {
          !!this.editor ? this.setEditorContent(value) : this.init(value)
        },
        immediate: true
      }
    },
    methods: {
      init(value) {
        !!window.UE && !!window.UEDITOR_CONFIG && Object.keys(window.UEDITOR_CONFIG).length !== 0 && !!window.UE.getEditor ? this.onceInit(value) : this.loadEditorJs().then(() => this.onceInit(value))
      },
      onceInit(value) {
        this.$nextTick(() => {
          this.editor = UE.getEditor(this.id, this.mixedConfig);
          this.editor.addListener("ready", () => {
            this.$emit('ready', this.editor);
            this.editor.setContent(value);
            this.editor.addListener("contentChange", () => {
              this.$emit('input', this.editor.getContent())
            });
          });
        })
      },
      loadEditorJs() {
        if (window.loadEnv) {
          return new Promise(reslove => {
            window.addEventListener('loadEditorJs', function () {
              reslove();
            });
          })
        } else {
          window.loadEnv = new Event('loadEditorJs');
          return new Promise(reslove => {
            this.loadConfigJs().then(() => this.loadAllJs()).then(() => {
              window.dispatchEvent(window.loadEnv);
              reslove();
            })
          })
        }
      },
      loadConfigJs() {
        return new Promise(reslove => {
          if (!!window.UE && !!window.UEDITOR_CONFIG && Object.keys(window.UEDITOR_CONFIG).length !== 0) {
            reslove();
            return
          }
          let script = document.createElement('script');
          script.type = 'text/javascript';
          script.src = this.mixedConfig.UEDITOR_HOME_URL + this.configFileName;
          document.getElementsByTagName('head')[0].appendChild(script);
          script.onload = function () {
            if (!!window.UE && !!window.UEDITOR_CONFIG && Object.keys(window.UEDITOR_CONFIG).length !== 0) {
              reslove();
            } else {
              console && console.error('config.js文件路径错误，当前为' + script.src + ',检查配置地址UEDITOR_HOME_URL填写是否正确!');
            }
          };
        })
      },
      loadAllJs() {
        return new Promise(reslove => {
          if (!!window.UE && !!window.UE.getEditor) {
            reslove();
            return
          }
          let script = document.createElement('script');
          script.type = 'text/javascript';
          script.src = this.mixedConfig.UEDITOR_HOME_URL + this.jsFileName;
          document.getElementsByTagName('head')[0].appendChild(script);
          script.onload = function () {
            if (!!window.UE && !!window.UE.getEditor) {
              reslove()
            } else {
              console && console.error('all.js文件路径错误，当前为' + script.src + ',检查配置地址UEDITOR_HOME_URL填写是否正确!')
            }
          };
        })
      },
      setEditorContent(value) {
        let _this = this;
        _this.editor.ready(function () {
          if (value !== _this.editor.getContent()) {
            _this.$nextTick(() => {
              _this.editor.setContent(value);
            })
          }
        });
      },
    }
  }
</script>

