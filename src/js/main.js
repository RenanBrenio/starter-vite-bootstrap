import '../scss/frontend.scss'
import { Fancybox } from "@fancyapps/ui"
import * as bootstrap from 'bootstrap'

const svgs = import.meta.globEager('../svg/*.svg')

// Create an example popover
document.querySelectorAll('[data-bs-toggle="popover"]')
  .forEach(popover => {
    new Popover(popover)
  })

Fancybox.bind("[data-fancybox]", {
    // Your options go here
});
