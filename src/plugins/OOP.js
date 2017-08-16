// ------------------------------------------------------
// ------------------------------------------------------
// ------------------------------------------------------
// ------------------------------------------------------
// TODOS: 
//   1. Update overiding to use a special HTML attribute
//   2. Figure out if can add a custom attribute 
//      so that don't have to use a method to return the template string
// ------------------------------------------------------
// ------------------------------------------------------
// ------------------------------------------------------
// ------------------------------------------------------

((() => {

  let setData = (location, data) => {
    // so we don't add useless elements to the dom
    if (data) {
      location = data
    }
  }

  let eventsWhiteList = {
    // Need to create a mapping until
    // a better method is found
    "@click": "click",
    "v-on:click": "click",
  }

  let buildCombinedTemplate = (options) => {
    let tempSubComponentWrapper = document.createElement('div')
    tempSubComponentWrapper.innerHTML = options.templates.sub
    let subComponentWrapper = tempSubComponentWrapper.firstElementChild

    let tempBaseComponentWrapper = document.createElement('div')
    tempBaseComponentWrapper.innerHTML = options.templates.base
    let baseComponentWrapper = tempBaseComponentWrapper.firstElementChild

    options.overrides.forEach(function (selector) {
      $(baseComponentWrapper).find(`#${selector}`)[0]
        .replaceWith($(subComponentWrapper)
        .find(`#${selector}`)[0])
    })
    return baseComponentWrapper
  }

  let extractDomData = function(el, vm) {
    let $el = $(el)[0]
    let domData = {}

    domData["data"] = {
      "class": {},
      on: {},
      attrs: {}
    }

    domData["tag"] = $el.tagName
    setData(domData.data.attrs["id"], $el.id)
    setData(domData.data.attrs["class"], $el.className)
    domData["children"] = []

    domData["events"] = {on: {}}
    let events = el.attributes
    for (var i=0; i < events.length; i++) {
      let event = events[i]

      if (eventsWhiteList[event.nodeName]) {
        domData.data.on[eventsWhiteList[event.nodeName]] = vm[event.nodeValue]
      }
    }

    let children = $el.children
    for (var i=0; i < children.length; i++) {
      let child = children[i]
      domData["children"].push(extractDomData(child, vm))
    }

    domData["innerHTML"] = (children.length === 0) ? $el.innerHTML : ""
    
    return domData
  }

  let buildEls = function(createElement, domEl) {
    var data = domEl.data

    let innerHTML = domEl.innerHTML
    if (domEl.children.length !== 0) {
      innerHTML = domEl.children.map(function(childEl) {
        return buildEls(createElement, childEl)
      })
    }
    return createElement(
      domEl.tag, 
      data, 
      innerHTML
    )
  }

  const OOP = {
    install(Vue, options) {
      Vue.createTemplate = function () {
        // something logic ...
        console.log("dope")
      }
      Vue.prototype.OOtemplate = function(createElement, options) {
        let vm = this
        let combinedTemplate = buildCombinedTemplate(options)
        let domEls = extractDomData(combinedTemplate, vm)
        return buildEls(createElement, domEls)
      }
    }
  }
  if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(OOP)
  }
}))()