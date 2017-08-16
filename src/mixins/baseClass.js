((() => {
  const baseHTML = `
    <div class="wrapper" id="baseClass">
      <h1>Base Header</h1>
      <div>
        <h2>Nested</h2>
      </div>
      <p id="TextOverride">I am the base text</p>
      <div @click="say">Method Overide</div>
      <div @click="shout" id="FooterOverride">I am the base footer</div>
    </div>
  `
  const baseClass = {

    mounted() {
      Vue.createTemplate()
    },

    render(createElement) {
      return this.OOtemplate(
        createElement,
        {
          templates: {
            base: this.baseTemplate(), 
            sub: this.subTemplate()
          },
          overrides: ["TextOverride", "FooterOverride"]
        }
      )
    },

    methods: {
      baseTemplate() {
        return baseHTML
      },
      shout() {
        console.log("BASE CLASS!!!")
      },
      say () {
        console.log("hello from the base component")
      },
    }
  }
  window.baseClass = baseClass
}))()