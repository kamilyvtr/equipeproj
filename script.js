// ===== MENU HAMBÚRGUER =====
document.addEventListener("DOMContentLoaded", () => {
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

    // Fechar menu ao clicar fora
    document.addEventListener("click", (event) => {
      if (!hamburger.contains(event.target) && !navMobile.contains(event.target)) {
        hamburger.classList.remove("active")
        navMobile.classList.remove("active")
      }
    })
  }
})

// ===== FAQ ACCORDION =====
document.addEventListener("DOMContentLoaded", () => {
  const faqItems = document.querySelectorAll(".faq-item")

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question")

    if (question) {
      question.addEventListener("click", () => {
        // Fechar outros itens
        faqItems.forEach((otherItem) => {
          if (otherItem !== item) {
            otherItem.classList.remove("active")
          }
        })

        // Toggle item atual
        item.classList.toggle("active")
      })
    }
  })
})

// ===== VALIDAÇÃO DE FORMULÁRIOS =====
function validarFormulario() {
  const form = document.getElementById("form-jovem-aprendiz")
  if (!form) return true

  let isValid = true

  // Limpar mensagens de erro anteriores
  const errorMessages = form.querySelectorAll(".error-message")
  errorMessages.forEach((msg) => (msg.textContent = ""))

  // Validar nome
  const nome = document.getElementById("nome")
  if (nome && nome.value.trim().length < 2) {
    document.getElementById("error-nome").textContent = "Nome deve ter pelo menos 2 caracteres"
    isValid = false
  }

  // Validar email
  const email = document.getElementById("email")
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (email && !emailRegex.test(email.value)) {
    document.getElementById("error-email").textContent = "Email inválido"
    isValid = false
  }

  // Validar idade
  const idade = document.getElementById("idade")
  if (idade && (idade.value < 14 || idade.value > 24)) {
    document.getElementById("error-idade").textContent = "Idade deve estar entre 14 e 24 anos"
    isValid = false
  }

  // Validar cidade
  const cidade = document.getElementById("cidade")
  if (cidade && cidade.value.trim().length < 2) {
    document.getElementById("error-cidade").textContent = "Cidade é obrigatória"
    isValid = false
  }

  // Validar escolaridade
  const escolaridade = document.getElementById("escolaridade")
  if (escolaridade && !escolaridade.value) {
    document.getElementById("error-escolaridade").textContent = "Selecione sua escolaridade"
    isValid = false
  }

  // Validar área
  const area = document.getElementById("area")
  if (area && !area.value) {
    document.getElementById("error-area").textContent = "Selecione uma área de interesse"
    isValid = false
  }

  if (isValid) {
    alert("Formulário enviado com sucesso! Entraremos em contato em breve.")
    form.reset()
  }

  return false // Prevenir envio real do formulário
}

// ===== VALIDAÇÃO FORMULÁRIO DE CONTRATAÇÃO =====
document.addEventListener("DOMContentLoaded", () => {
  const formContratacao = document.getElementById("form-contratacao")

  if (formContratacao) {
    formContratacao.addEventListener("submit", (e) => {
      e.preventDefault()

      // Validações básicas
      const nomeEmpresa = document.getElementById("nome-empresa")
      const nomeContato = document.getElementById("nome-contato")
      const email = document.getElementById("email")
      const telefone = document.getElementById("telefone")
      const funcionarios = document.getElementById("funcionarios")
      const segmento = document.getElementById("segmento")
      const desafios = document.getElementById("desafios")

      let isValid = true
      let errorMessage = ""

      if (!nomeEmpresa.value.trim()) {
        errorMessage += "Nome da empresa é obrigatório.\n"
        isValid = false
      }

      if (!nomeContato.value.trim()) {
        errorMessage += "Nome do responsável é obrigatório.\n"
        isValid = false
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email.value)) {
        errorMessage += "Email inválido.\n"
        isValid = false
      }

      if (!telefone.value.trim()) {
        errorMessage += "Telefone é obrigatório.\n"
        isValid = false
      }

      if (!funcionarios.value) {
        errorMessage += "Selecione o número de funcionários.\n"
        isValid = false
      }

      if (!segmento.value) {
        errorMessage += "Selecione o segmento de atuação.\n"
        isValid = false
      }

      if (!desafios.value.trim()) {
        errorMessage += "Descreva os principais desafios da empresa.\n"
        isValid = false
      }

      if (isValid) {
        alert("Solicitação enviada com sucesso! Nossa equipe entrará em contato em até 24 horas.")
        formContratacao.reset()
      } else {
        alert("Por favor, corrija os seguintes erros:\n\n" + errorMessage)
      }
    })
  }
})

// ===== MÁSCARA PARA CNPJ =====
document.addEventListener("DOMContentLoaded", () => {
  const cnpjInput = document.getElementById("cnpj")

  if (cnpjInput) {
    cnpjInput.addEventListener("input", (e) => {
      let value = e.target.value.replace(/\D/g, "")
      value = value.replace(/^(\d{2})(\d)/, "$1.$2")
      value = value.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      value = value.replace(/\.(\d{3})(\d)/, ".$1/$2")
      value = value.replace(/(\d{4})(\d)/, "$1-$2")
      e.target.value = value
    })
  }
})

// ===== MÁSCARA PARA TELEFONE =====
document.addEventListener("DOMContentLoaded", () => {
  const telefoneInput = document.getElementById("telefone")

  if (telefoneInput) {
    telefoneInput.addEventListener("input", (e) => {
      let value = e.target.value.replace(/\D/g, "")
      value = value.replace(/^(\d{2})(\d)/, "($1) $2")
      value = value.replace(/(\d{5})(\d)/, "$1-$2")
      e.target.value = value
    })
  }
})

// ===== SMOOTH SCROLL PARA LINKS INTERNOS =====
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll('a[href^="#"]')

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
})

// ===== ANIMAÇÃO AO SCROLL =====
document.addEventListener("DOMContentLoaded", () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observar cards e seções
  const elementsToAnimate = document.querySelectorAll(".service-card, .treinamento-card, .avaliacao-card")

  elementsToAnimate.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })
})
