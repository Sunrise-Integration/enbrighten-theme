class CustomTabs {
  constructor(container) {
    this.container = container
    this.tabTriggers = this.container.querySelectorAll("[data-tab-trigger]")
    this.tabContents = this.container.querySelectorAll(".custom-tabs__tab-content")
    this.bindEvents()
    this.setGridColumns()
  }

  bindEvents() {
    this.tabTriggers.forEach((trigger) => {
      trigger.addEventListener("click", () => this.switchTab(trigger))
    })
    window.addEventListener("resize", () => this.setGridColumns())
  }

  setGridColumns() {
    const grids = this.container.querySelectorAll(".custom-tabs__grid")
    grids.forEach((grid) => {
      const desktopColumns = grid.dataset.columnsDesktop
      const tabletColumns = grid.dataset.columnsTablet
      const mobileColumns = grid.dataset.columnsMobile

      grid.style.setProperty("--columns-desktop", desktopColumns)
      grid.style.setProperty("--columns-tablet", tabletColumns)
      grid.style.setProperty("--columns-mobile", mobileColumns)
    })
  }

  switchTab(selectedTrigger) {
    const targetId = selectedTrigger.getAttribute("aria-controls")
    const targetContent = this.container.querySelector(`#${targetId}`)

    this.tabTriggers.forEach((trigger) => {
      trigger.classList.toggle("is-active", trigger === selectedTrigger)
      trigger.setAttribute("aria-selected", trigger === selectedTrigger)
    })

    this.tabContents.forEach((content) => {
      content.classList.toggle("is-active", content === targetContent)
      content.hidden = content !== targetContent
    })
  }
}

// Initialize all custom tab sections
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".custom-tabs-section").forEach((section) => {
    new CustomTabs(section)
  })
})

