((() => {
  const subHTML = `
    <div id="subClass">
      <p id="TextOverride"> I am the sub text</p>
      <div v-on:click="shout" id="FooterOverride">I am the sub footer</div>
    </div>
  `

  Vue.component("app", {
    // template: subHTML,
    mixins: [window.baseClass],

    methods: {
      subTemplate() {
        return subHTML
      },

      say() {
        console.log("hello from the sub component")
      }
    }

  })
}))()
