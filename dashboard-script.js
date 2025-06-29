// ===== DASHBOARD FUNCTIONALITY =====
document.addEventListener("DOMContentLoaded", () => {
  // Menu Hambúrguer
  const hamburger = document.getElementById("hamburger")
  const navMobile = document.getElementById("nav-mobile")

  if (hamburger && navMobile) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active")
      navMobile.classList.toggle("active")
    })

    // Fechar menu ao clicar em um link
    const navLinks = navMobile.querySelectorAll(".nav-link-mobile")
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active")
        navMobile.classList.remove("active")
      })
    })
  }

  // Navegação ativa
  const navLinksDesktop = document.querySelectorAll(".nav-link")
  const navLinksMobile = document.querySelectorAll(".nav-link-mobile")

  function setActiveLink(targetId) {
    // Desktop
    navLinksDesktop.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === targetId) {
        link.classList.add("active")
      }
    })

    // Mobile
    navLinksMobile.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === targetId) {
        link.classList.add("active")
      }
    })
  }

  // Scroll spy para navegação
  const sections = document.querySelectorAll(".dashboard-section")
  const observerOptions = {
    threshold: 0.3,
    rootMargin: "-80px 0px -80px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActiveLink(`#${entry.target.id}`)
      }
    })
  }, observerOptions)

  sections.forEach((section) => {
    observer.observe(section)
  })

  // Smooth scroll para links internos
  const allNavLinks = [...navLinksDesktop, ...navLinksMobile]
  allNavLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href")
      if (href.startsWith("#")) {
        e.preventDefault()
        const targetSection = document.querySelector(href)
        if (targetSection) {
          targetSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }
      }
    })
  })

  // Animação dos gráficos ao scroll
  const animateOnScroll = () => {
    const chartBars = document.querySelectorAll(".chart-bar")
    const progressFills = document.querySelectorAll(
      ".progress-fill, .factor-fill, .dept-fill, .performance-fill, .reason-fill",
    )
    const miniBars = document.querySelectorAll(".mini-bar")

    const animateElements = (elements) => {
      elements.forEach((element) => {
        const rect = element.getBoundingClientRect()
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0

        if (isVisible && !element.classList.contains("animated")) {
          element.classList.add("animated")

          // Animar barras de gráfico
          if (element.classList.contains("chart-bar")) {
            const height = element.style.height
            element.style.height = "0"
            setTimeout(() => {
              element.style.height = height
            }, 100)
          }

          // Animar mini barras
          if (element.classList.contains("mini-bar")) {
            const height = element.style.height
            element.style.height = "0"
            setTimeout(
              () => {
                element.style.height = height
              },
              Math.random() * 500 + 200,
            )
          }
        }
      })
    }

    animateElements(chartBars)
    animateElements(progressFills)
    animateElements(miniBars)
  }

  // Executar animação no scroll
  window.addEventListener("scroll", animateOnScroll)
  animateOnScroll() // Executar uma vez no carregamento

  // Interatividade dos botões de período
  const periodBtns = document.querySelectorAll(".period-btn")
  periodBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      periodBtns.forEach((b) => b.classList.remove("active"))
      btn.classList.add("active")

      // Simular atualização do gráfico
      const chartBars = document.querySelectorAll(".chart-bar")
      chartBars.forEach((bar) => {
        const randomHeight = Math.floor(Math.random() * 60) + 40
        bar.style.height = `${randomHeight}%`
        bar.querySelector(".bar-value").textContent = (randomHeight / 10).toFixed(1)
      })
    })
  })

  // Hover effects nos cards
  const cards = document.querySelectorAll(".stat-card, .metric-card, .report-card, .reason-card")
  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-5px)"
    })

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)"
    })
  })

  // Simulação de dados em tempo real
  const updateRealTimeData = () => {
    // Atualizar timestamp
    const lastUpdate = document.querySelector(".last-update")
    if (lastUpdate) {
      const now = new Date()
      const timeString = now.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      })
      lastUpdate.textContent = `Última atualização: Hoje, ${timeString}`
    }

    // Simular pequenas variações nos números
    const statValues = document.querySelectorAll(".stat-value")
    statValues.forEach((value) => {
      const currentValue = Number.parseFloat(value.textContent)
      if (!isNaN(currentValue) && currentValue > 10) {
        const variation = (Math.random() - 0.5) * 2 // -1 a +1
        const newValue = Math.max(0, currentValue + variation)
        value.textContent = Math.round(newValue)
      }
    })
  }

  // Atualizar dados a cada 30 segundos
  setInterval(updateRealTimeData, 30000)

  // Adicionar efeito de loading inicial
  const addLoadingEffect = () => {
    const elements = document.querySelectorAll(".chart-bar, .progress-fill, .mini-bar")
    elements.forEach((element, index) => {
      element.style.opacity = "0"
      element.style.transform = "translateY(20px)"

      setTimeout(() => {
        element.style.transition = "all 0.6s ease"
        element.style.opacity = "1"
        element.style.transform = "translateY(0)"
      }, index * 100)
    })
  }

  // Executar loading effect após um pequeno delay
  setTimeout(addLoadingEffect, 500)
})

// ===== UTILITY FUNCTIONS =====
function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M"
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K"
  }
  return num.toString()
}

function animateValue(element, start, end, duration) {
  const startTime = performance.now()

  function update(currentTime) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)

    const current = start + (end - start) * progress
    element.textContent = Math.round(current)

    if (progress < 1) {
      requestAnimationFrame(update)
    }
  }

  requestAnimationFrame(update)
}
