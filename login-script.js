// ===== LOGIN FUNCTIONALITY =====
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form")

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const email = document.getElementById("email").value
      const password = document.getElementById("password").value

      // Limpar mensagens de erro
      document.getElementById("error-email").textContent = ""
      document.getElementById("error-password").textContent = ""

      let isValid = true

      // Validar email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        document.getElementById("error-email").textContent = "Email inválido"
        isValid = false
      }

      // Validar senha
      if (password.length < 3) {
        document.getElementById("error-password").textContent = "Senha deve ter pelo menos 3 caracteres"
        isValid = false
      }

      if (isValid) {
        // Simular loading
        const submitBtn = document.querySelector(".login-btn-submit")
        const originalText = submitBtn.innerHTML
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Entrando...'
        submitBtn.disabled = true

        setTimeout(() => {
          // Redirecionar para o dashboard
          window.location.href = "dashboard.html"
        }, 1500)
      }
    })
  }
})

// ===== TOGGLE PASSWORD VISIBILITY =====
function togglePassword() {
  const passwordInput = document.getElementById("password")
  const eyeIcon = document.getElementById("eye-icon")

  if (passwordInput.type === "password") {
    passwordInput.type = "text"
    eyeIcon.className = "fas fa-eye-slash"
  } else {
    passwordInput.type = "password"
    eyeIcon.className = "fas fa-eye"
  }
}
