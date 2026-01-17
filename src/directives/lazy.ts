import type { DirectiveBinding } from 'vue'

interface LazyHTMLElement extends HTMLImageElement {
  __observer__?: IntersectionObserver
}

const lazy = {
  mounted(el: LazyHTMLElement, binding: DirectiveBinding<string>) {
    if (!binding.value) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]

        if (entry) {
            if (entry.isIntersecting) {
                el.src = binding.value
                observer.unobserve(el)
            }
        }
      },
      {
        root: null,
        threshold: 0.1,
      }
    )

    el.__observer__ = observer
    observer.observe(el)
  },

  unmounted(el: LazyHTMLElement) {
    el.__observer__?.disconnect()
    delete el.__observer__
  }
}

export default lazy
